package com.backend.landing.contact;

public class EmailSendException extends RuntimeException {

	public EmailSendException(String message, Throwable cause) {
		super(message, cause);
	}
}