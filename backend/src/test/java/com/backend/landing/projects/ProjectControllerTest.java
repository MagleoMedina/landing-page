package com.backend.landing.projects;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProjectController.class)
class ProjectControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private ProjectService projectService;

	@Test
	void getAllReturnsProjects() throws Exception {
		when(projectService.getProjects()).thenReturn(List.of(
				new ProjectCategory("web", new LocalizedText("Proyectos Web", "Web Projects"), "#5227FF",
						List.of(new Project(
								new LocalizedText("Dashboard Web", "Dashboard Web"),
								new LocalizedText("Panel de administración", "Admin dashboard"),
								List.of("React", "TypeScript"),
								"https://github.com/MagleoMedina",
								"https://github.com/MagleoMedina")))));

		mockMvc.perform(get("/api/projects"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id").value("web"))
				.andExpect(jsonPath("$[0].color").value("#5227FF"))
				.andExpect(jsonPath("$[0].title.es").value("Proyectos Web"))
				.andExpect(jsonPath("$[0].projects[0].title.en").value("Dashboard Web"))
				.andExpect(jsonPath("$[0].projects[0].tags[1]").value("TypeScript"));
	}
}