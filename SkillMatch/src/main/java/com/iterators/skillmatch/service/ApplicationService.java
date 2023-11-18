package com.iterators.skillmatch.service;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Application;
import com.iterators.skillmatch.model.enums.ApplicationStatus;

import java.util.List;

public interface ApplicationService {

    Application viewApplication(String applicationId) throws GlobalException;
    List<Application> viewApplicationsByJobId(String jobId) throws GlobalException;
    Application viewApplicationsByEmailIdAndJobId(String applicantId, String jobId) throws GlobalException;
    List<Application> viewApplicationsByEmailId(String applicantId) throws GlobalException;
    Integer countApplication(String applicantId, String jobId);
    List<Application> getAllApplications() throws GlobalException;
    void updateApplication(String applicationId, ApplicationStatus applicationStatus) throws GlobalException;
    void updateApplicationsByJobId(String jobId, ApplicationStatus applicationStatus) throws GlobalException;
    void addApplication(Application application) throws GlobalException;

}
