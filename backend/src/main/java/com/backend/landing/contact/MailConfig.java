package com.backend.landing.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MailConfig {

	private final String username;
	private final String password;
	private final String to;
	private final String from;
	private final String host;
	private final int port;

	public MailConfig(
			@Value("${spring.mail.username:}") String username,
			@Value("${spring.mail.password:}") String password,
			@Value("${app.contact.to:}") String to,
			@Value("${app.contact.from:}") String from,
			@Value("${spring.mail.host:smtp.gmail.com}") String host,
			@Value("${spring.mail.port:587}") int port) {
		this.username = username;
		this.password = password;
		this.to = to;
		this.from = from;
		this.host = host;
		this.port = port;
	}

	public String getUsername() {
		return username;
	}

	public boolean hasPassword() {
		return !password.isBlank();
	}

	public boolean isConfigured() {
		return !username.isBlank() && !password.isBlank() && !to.isBlank();
	}

	public String getTo() {
		return to;
	}

	public String getFrom() {
		return from;
	}

	public String smtp() {
		if (!host.isBlank() && port > 0) {
			return host + ":" + port;
		}
		return "no configurado";
	}

	public Status status() {
		boolean configured = isConfigured();
		return new Status(configured, username, hasPassword(), to, smtp(),
				configured ? "SMTP listo"
						: "Faltan MAIL_USERNAME / MAIL_PASSWORD / CONTACT_TO en el entorno del backend");
	}

	public record Status(boolean configuredMail, String mailUser, boolean hasPassword, String recipient, String smtp,
			String message) {
	}
}