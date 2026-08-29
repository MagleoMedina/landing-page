package com.backend.landing.contact;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
				.andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("obligatorio")));
	}
}