package com.iterators.skillmatch.repository;

import com.iterators.skillmatch.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    List<Application> findByApplicant_Email(String emailId);
    @Query(value = "{}", fields = "{ 'applicant.resume' : 0 }")
    List<Application> findAllWithoutResume();
    List<Application> findByJobId(String jobId);
    Application findByApplicant_EmailAndJobId(String emailId, String jobId);
    Integer countApplicationsByApplicant_EmailAndJobId(String emailId, String jobId);
}
