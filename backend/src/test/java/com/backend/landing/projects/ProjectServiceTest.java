package com.backend.landing.projects;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;

import tools.jackson.databind.ObjectMapper;

class ProjectServiceTest {

	private final ProjectService service;

	ProjectServiceTest() throws Exception {
		service = new ProjectService(new ObjectMapper());
	}

	@Test
	void parsesAllCategoriesAndProjects() {
		List<ProjectCategory> categories = service.getProjects();

		assertThat(categories).hasSize(4);
		assertThat(categories).extracting(ProjectCategory::id)
				.containsExactly("web", "mobile", "games", "tools");

		long total = categories.stream().mapToLong(c -> c.projects().size()).sum();
		assertThat(total).isEqualTo(22);

		categories.forEach(category -> {
			assertThat(category.title().es()).isNotBlank();
			assertThat(category.title().en()).isNotBlank();
			assertThat(category.color()).startsWith("#");

			category.projects().forEach(project -> {
				assertThat(project.title().es()).isNotBlank();
				assertThat(project.title().en()).isNotBlank();
				assertThat(project.description().es()).isNotBlank();
				assertThat(project.description().en()).isNotBlank();
				assertThat(project.tags()).isNotEmpty();
				assertThat(project.image()).startsWith("/assets/projects/").endsWith(".svg");
				if (project.repo().isBlank()) {
					assertThat(project.demo()).isBlank();
				} else {
					assertThat(project.repo()).startsWith("https://github.com/MagleoMedina");
					assertThat(project.demo()).startsWith("https://");
				}
			});
		});
	}
}