package com.backend.landing.projects;

import java.util.List;

public record Project(
		LocalizedText title,
		LocalizedText description,
		List<String> tags,
		String repo,
		String demo,
		String image) {
}