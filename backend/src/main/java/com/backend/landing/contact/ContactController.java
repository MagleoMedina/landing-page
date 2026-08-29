package com.backend.landing.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

	private final ContactEmailService contactEmailService;

	public ContactController(ContactEmailService contactEmailService) {
		this.contactEmailService = contactEmailService;
	}

	@PostMapping
	public ResponseEntity<ContactResponse> send(@Valid @RequestBody ContactRequest request) {
		contactEmailService.send(request);
		return ResponseEntity.ok(new ContactResponse("ok"));
	}

	public record ContactResponse(String status) {
	}
}