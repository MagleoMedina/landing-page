package com.backend.landing.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
		@NotBlank(message = "El nombre es obligatorio") String name,
		@NotBlank(message = "El email es obligatorio") @Email(message = "El email no tiene un formato válido") String email,
		@NotBlank(message = "El mensaje es obligatorio") @Size(max = 5000, message = "El mensaje no puede superar los 5000 caracteres") String message) {
}