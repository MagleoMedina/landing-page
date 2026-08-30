package com.backend.landing.contact;

import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
		String message = ex.getBindingResult().getFieldErrors().stream()
				.map(FieldError::getDefaultMessage)
				.collect(Collectors.joining(", "));
		return new ErrorResponse(message);
	}

	@ExceptionHandler(EmailSendException.class)
	@ResponseStatus(HttpStatus.BAD_GATEWAY)
	public ErrorResponse handleEmailSend(EmailSendException ex) {
		log.error("Fallo al enviar el correo de contacto. Revisa la configuración SMTP (MAIL_USERNAME/MAIL_PASSWORD/CONTACT_TO)", ex);
		return new ErrorResponse("No se pudo enviar el mensaje. Verifica la configuración del correo del servidor.");
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponse handleGeneric(Exception ex) {
		log.error("Error no controlado", ex);
		return new ErrorResponse("No se pudo procesar la solicitud");
	}

	public record ErrorResponse(String message) {
	}
}