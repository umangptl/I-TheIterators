package com.iterators.skillmatch.model;

import com.iterators.skillmatch.model.enums.Documents;
import com.iterators.skillmatch.model.enums.Skills;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("jobs")
public class Job {
    @Id
    private String jobId;
    @NotNull
    private String title;
    private Date datePosted = Date.from(Instant.now());
    private Date deadline;
    @NotNull
    private String description;
    @NotNull
    private List<Skills> skillsRequired;
    private double salary;
    @NotNull
    private String location;
    private String requiredQualifications;
    private String hiringTeamInfo;
    private List<Documents> requiredDocuments;
    private String tag;
    private String experience;
    private String type; // part-time OR full-time;
}
