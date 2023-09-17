package com.iterators.skillmatch.model;

import java.util.List;
import java.util.Date;

public class Job {

    private String jobId;
    private String tag;
    private String title;
    private Date datePosted;
    private Date deadline;
    private String description;
    private List<String> skillsRequired;
    private double salary;
    private String location;
    private String requiredQualifications;
    private String hiringTeamInfo;
    private List<String> requiredDocuments;

    // Constructors, getters, and setters for the above attributes

    public void create() {
        // Logic to create a job listing
    }

    public void edit() {
        // Logic to edit a job listing
    }

    public void delete() {
        // Logic to delete a job listing
    }
}
