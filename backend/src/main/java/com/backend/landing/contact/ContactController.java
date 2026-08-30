package com.backend.landing.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

	private final ContactEmailService contactEmailService;
	private final MailConfig mailConfig;

	public ContactController(ContactEmailService contactEmailService, MailConfig mailConfig) {
		this.contactEmailService = contactEmailService;
		this.mailConfig = mailConfig;
	}

	@PostMapping
	public ResponseEntity<ContactResponse> send(@Valid @RequestBody ContactRequest request) {
		contactEmailService.send(request);
		return ResponseEntity.ok(new ContactResponse("ok"));
	}

	@GetMapping("/status")
	public MailConfig.Status healthCheck() {
		return mailConfig.status();
	}

	public record ContactResponse(String status) {
	}
}