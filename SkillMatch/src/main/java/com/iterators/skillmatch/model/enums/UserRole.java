package com.iterators.skillmatch.model.enums;

public enum UserRole {
    RECRUITER("RECRUITER"),
    ADMIN("ADMIN");

    private final String role;

    UserRole(String department) {
        this.role = department;
    }

    public String getRole() {
        return role;
    }
}
