package com.iterators.skillmatch.model;

import com.iterators.skillmatch.model.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.Binary;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document("application")
public class Application {
    @Id
    private String applicationId;
    private ApplicationStatus status;
    private String jobId;
    private Applicant applicant;
    private Binary resume;
}
