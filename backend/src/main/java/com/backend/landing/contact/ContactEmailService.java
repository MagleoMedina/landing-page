package com.backend.landing.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ContactEmailService {

	private final JavaMailSender mailSender;
	private final String to;
	private final String from;

	public ContactEmailService(JavaMailSender mailSender,
			@Value("${app.contact.to:}") String to,
			@Value("${app.contact.from:}") String from) {
		this.mailSender = mailSender;
		this.to = to;
		this.from = from;
	}

	public void send(ContactRequest request) {
		try {
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
			helper.setFrom(from.isBlank() ? "no-reply@localhost" : from);
			helper.setTo(to);
			helper.setSubject("Nuevo mensaje desde el portfolio");
			helper.setReplyTo(request.email());
			helper.setText(buildHtml(request), true);
			mailSender.send(mimeMessage);
		} catch (MessagingException | MailException e) {
			throw new EmailSendException("No se pudo enviar el correo", e);
		}
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