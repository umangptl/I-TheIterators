package com.iterators.skillmatch.repository;

import com.iterators.skillmatch.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    @Query(value = "{'applicant.email' : ?0}", fields = "{ 'applicant.resume' : 0 }")
    List<Application> findByApplicant_Email(String emailId);
    @Query(value = "{}", fields = "{ 'applicant.resume' : 0 }")
    List<Application> findAllWithoutResume();
    @Query(value = "{'jobId' : ?0}", fields = "{ 'applicant.resume' : 0 }")
    List<Application> findByJobId(String jobId);
    Application findByApplicant_EmailAndJobId(String emailId, String jobId);
    Integer countApplicationsByApplicant_EmailAndJobId(String emailId, String jobId);
}
