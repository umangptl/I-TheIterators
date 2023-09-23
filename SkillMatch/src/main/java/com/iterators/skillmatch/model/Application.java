package com.iterators.skillmatch.model;

import com.iterators.skillmatch.model.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String applicantId;
}
