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
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
		String message = ex.getBindingResult().getFieldErrors().stream()
				.map(FieldError::getDefaultMessage)
				.collect(Collectors.joining(", "));
		return new ErrorResponse(message, null);
	}

	@ExceptionHandler(EmailSendException.class)
	@ResponseStatus(HttpStatus.BAD_GATEWAY)
	public ErrorResponse handleEmailSend(EmailSendException ex) {
		String cause = rootCauseMessage(ex);
		log.error("Fallo al enviar el correo de contacto. Revisa la configuración del envío "
				+ "(RESEND_API_KEY/CONTACT_TO). Causa: {}", cause, ex);
		return new ErrorResponse("No se pudo enviar el mensaje. Verifica la configuración del correo del servidor.",
				cause);
	}

	private static String rootCauseMessage(Throwable ex) {
		Throwable root = ex;
		while (root.getCause() != null && root.getCause() != root) {
			root = root.getCause();
		}
		String message = root.getMessage();
		return root.getClass().getSimpleName() + (message == null ? "" : ": " + message);
	}

	@ExceptionHandler(NoResourceFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorResponse handleNotFound(NoResourceFoundException ex) {
		log.debug("Recurso no encontrado: {}", ex.getResourcePath());
		return new ErrorResponse("Recurso no encontrado", null);
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponse handleGeneric(Exception ex) {
		log.error("Error no controlado", ex);
		return new ErrorResponse("No se pudo procesar la solicitud", null);
	}

	public record ErrorResponse(String message, String cause) {
	}
}