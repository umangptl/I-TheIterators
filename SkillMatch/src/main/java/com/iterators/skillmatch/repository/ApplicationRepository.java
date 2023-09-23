package com.iterators.skillmatch.repository;

import com.iterators.skillmatch.model.Application;
import com.iterators.skillmatch.model.enums.ApplicationStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    List<Application> findByApplicantId(String applicantId);
    List<Application> findByJobId(String jobId);
    Application findByApplicantIdAndJobId(String applicantId, String jobId);
    Integer countApplicationsByApplicantIdAndJobId(String applicantId, String jobId);
}
