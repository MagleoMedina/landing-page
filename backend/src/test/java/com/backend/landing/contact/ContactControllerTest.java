package com.backend.landing.contact;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ContactEmailService contactEmailService;

	@MockitoBean
	private MailConfig mailConfig;

	@Test
	void sendValidContactReturnsOk() throws Exception {
		String body = """
				{"name":"Ana","email":"ana@example.com","message":"Hola"}\
				""";

		mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value("ok"));

		verify(contactEmailService).send(new ContactRequest("Ana", "ana@example.com", "Hola"));
	}

	@Test
	void sendInvalidContactReturnsBadRequest() throws Exception {
		String body = """
				{"name":"","email":"no-valido","message":""}\
				""";

		mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.message").value(Matchers.containsString("obligatorio")));
	}

	@Test
	void statusReturnsMailConfigState() throws Exception {
		MailConfig.Status status = new MailConfig.Status(true, "dev@example.com", true, "to@example.com",
				"https://api.resend.com/emails", "Envío por Resend listo");
		when(mailConfig.status()).thenReturn(status);

		mockMvc.perform(get("/api/contact/status"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.configuredMail").value(true))
				.andExpect(jsonPath("$.hasCredential").value(true))
				.andExpect(jsonPath("$.recipient").value("to@example.com"));
	}

	@Test
	void statusReflectsMissingConfig() throws Exception {
		MailConfig.Status status = new MailConfig.Status(false, "", false, "", "",
				"Faltan RESEND_API_KEY / CONTACT_TO en el entorno del backend");
		when(mailConfig.status()).thenReturn(status);

		mockMvc.perform(get("/api/contact/status"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.configuredMail").value(false))
				.andExpect(jsonPath("$.hasCredential").value(false));
	}

	@Test
	void unknownRouteReturnsNotFound() throws Exception {
		mockMvc.perform(get("/api/contact/unknown"))
				.andExpect(status().isNotFound());
	}
}