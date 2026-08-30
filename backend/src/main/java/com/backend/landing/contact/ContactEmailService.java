package com.backend.landing.contact;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class ContactEmailService {

	private static final Logger log = LoggerFactory.getLogger(ContactEmailService.class);
	private static final URI RESEND_URL = URI.create("https://api.resend.com/emails");

	private final HttpClient httpClient = HttpClient.newBuilder()
			.connectTimeout(Duration.ofSeconds(15))
			.build();
	private final String apiKey;
	private final String from;
	private final String to;
	private final MailConfig mailConfig;

	public ContactEmailService(
			@Value("${resend.api-key:}") String apiKey,
			@Value("${resend.from:}") String from,
			@Value("${app.contact.to:}") String to,
			MailConfig mailConfig) {
		this.apiKey = apiKey;
		this.from = from;
		this.to = to;
		this.mailConfig = mailConfig;
	}

	@PostConstruct
	void logConfig() {
		if (mailConfig.isConfigured()) {
			log.info("Envío de correo configurado con Resend: {} -> {} ({})", from, to, mailConfig.endpoint());
		} else {
			log.warn("Correo NO configurado: falta definir RESEND_API_KEY / CONTACT_TO "
					+ "en el entorno (Render -> Environment). Ver GET /api/contact/status");
		}
	}

	public void send(ContactRequest request) {
		if (apiKey.isBlank()) {
			throw new EmailSendException("Falta RESEND_API_KEY en el entorno del backend", null);
		}
		if (to.isBlank()) {
			throw new EmailSendException("Falta CONTACT_TO en el entorno del backend", null);
		}
		try {
			String payload = """
					{"from":%s,"to":[%s],"subject":"Nuevo mensaje desde el portfolio","html":%s}\
					""".formatted(json(from), json(to), json(buildHtml(request)));

			HttpRequest httpRequest = HttpRequest.newBuilder(RESEND_URL)
					.timeout(Duration.ofSeconds(20))
					.header("Authorization", "Bearer " + apiKey)
					.header("Content-Type", "application/json")
					.POST(HttpRequest.BodyPublishers.ofString(payload, StandardCharsets.UTF_8))
					.build();

			HttpResponse<String> response = httpClient.send(httpRequest,
					HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

			if (response.statusCode() != 200) {
				throw new EmailSendException(
						"Resend respondió " + response.statusCode() + ": " + truncate(response.body(), 200), null);
			}
		} catch (IOException e) {
			throw new EmailSendException("No se pudo conectar con el servicio de correo (Resend)", e);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			throw new EmailSendException("Envío de correo interrumpido", e);
		}
	}

	private static String truncate(String value, int max) {
		if (value == null || value.length() <= max) {
			return value == null ? "" : value;
		}
		return value.substring(0, max) + "...";
	}

	private static String json(String value) {
		StringBuilder sb = new StringBuilder("\"");
		for (int i = 0; i < value.length(); i++) {
			char c = value.charAt(i);
			switch (c) {
				case '"' -> sb.append("\\\"");
				case '\\' -> sb.append("\\\\");
				case '\n' -> sb.append("\\n");
				case '\r' -> sb.append("\\r");
				case '\t' -> sb.append("\\t");
				default -> {
					if (c < 0x20) {
						sb.append(String.format("\\u%04x", (int) c));
					} else {
						sb.append(c);
					}
				}
			}
		}
		return sb.append('"').toString();
	}

	private String buildHtml(ContactRequest request) {
		return """
				<!DOCTYPE html>
				<html>
				<body style="font-family: Arial, Helvetica, sans-serif; color: #3a3641; line-height: 1.5;">
				  <h2 style="margin-bottom: 18px;">Nuevo mensaje de contacto</h2>
				  <table style="border-collapse: collapse; width: 100%%; max-width: 520px;" cellpadding="8">
				    <tr>
				      <td style="font-weight: bold; width: 120px;">Nombre</td>
				      <td>%s</td>
				    </tr>
				    <tr>
				      <td style="font-weight: bold;">Email</td>
				      <td>%s</td>
				    </tr>
				    <tr>
				      <td style="font-weight: bold; vertical-align: top;">Mensaje</td>
				      <td style="white-space: pre-wrap;">%s</td>
				    </tr>
				  </table>
				</body>
				</html>
				""".formatted(escapeHtml(request.name()), escapeHtml(request.email()), escapeHtml(request.message()));
	}

	private String escapeHtml(String value) {
		return value.replace("&", "&amp;")
				.replace("<", "&lt;")
				.replace(">", "&gt;")
				.replace("\n", "<br/>");
	}
}