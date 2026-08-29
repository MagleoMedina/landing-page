package com.backend.landing.projects;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Service
public class ProjectService {

	private final List<ProjectCategory> categories;

	public ProjectService(ObjectMapper objectMapper) throws IOException {
		ClassPathResource resource = new ClassPathResource("projects.json");
		try (InputStream inputStream = resource.getInputStream()) {
			this.categories = objectMapper.readValue(inputStream, new TypeReference<List<ProjectCategory>>() {
			});
		}
	}

	public List<ProjectCategory> getProjects() {
		return categories;
	}
}