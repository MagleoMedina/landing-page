package com.backend.landing.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MailConfig {

	private final String apiKey;
	private final String from;
	private final String to;

	public MailConfig(
			@Value("${resend.api-key:}") String apiKey,
			@Value("${resend.from:}") String from,
			@Value("${app.contact.to:}") String to) {
		this.apiKey = apiKey;
		this.from = from;
		this.to = to;
	}

	public String getFrom() {
		return from;
	}

	public String getTo() {
		return to;
	}

	public boolean hasCredential() {
		return !apiKey.isBlank();
	}

	public boolean isConfigured() {
		return hasCredential() && !to.isBlank();
	}

	public String endpoint() {
		return "https://api.resend.com/emails";
	}

	public Status status() {
		boolean configured = isConfigured();
		return new Status(configured, from, hasCredential(), to, endpoint(),
				configured ? "Envío por Resend listo"
						: "Faltan RESEND_API_KEY / CONTACT_TO en el entorno del backend");
	}

	public record Status(boolean configuredMail, String mailUser, boolean hasCredential, String recipient,
			String transport, String message) {
	}
}