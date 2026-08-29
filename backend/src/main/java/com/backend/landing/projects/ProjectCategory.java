package com.backend.landing.projects;

import java.util.List;

public record ProjectCategory(
		String id,
		LocalizedText title,
		String color,
		List<Project> projects) {
}