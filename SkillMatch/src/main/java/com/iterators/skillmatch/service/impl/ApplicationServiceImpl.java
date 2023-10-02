package com.iterators.skillmatch.service.impl;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Application;
import com.iterators.skillmatch.model.enums.ApplicationStatus;
import com.iterators.skillmatch.repository.ApplicationRepository;
import com.iterators.skillmatch.service.ApplicationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    ApplicationRepository applicationRepository;

    Logger logger = LoggerFactory.getLogger(ApplicationServiceImpl.class);

    @Override
    public Application viewApplication(String applicationId) throws GlobalException {
        try {
            return applicationRepository.findById(applicationId).get();
        } catch (Exception exception) {
            logger.error("Error getting application with ApplicationId: {}", applicationId);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Application> viewApplicationsByJobId(String jobId) throws GlobalException {
        try {
            return applicationRepository.findByJobId(jobId);
        } catch (Exception exception) {
            logger.error("Error getting application with JobId: {}", jobId);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public Application viewApplicationsByApplicantIdAndJobId(String applicantId, String jobId) throws GlobalException {
        try {
            return applicationRepository.findByApplicantIdAndJobId(applicantId, jobId);
        } catch (Exception exception) {
            logger.error("Error getting application with ApplicantId: {} and JobId: {}", applicantId, jobId);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Application> viewApplicationsByApplicantId(String applicantId) throws GlobalException {
        try {
            return applicationRepository.findByJobId(applicantId);
        } catch (Exception exception) {
            logger.error("Error getting application with ApplicantId: {}", applicantId);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public Integer countApplication(String applicantId, String jobId) {
        try {
            return applicationRepository.countApplicationsByApplicantIdAndJobId(applicantId, jobId);
        } catch (Exception exception) {
            logger.error("Error getting count with ApplicantId: {} and JobId: {}", applicantId, jobId);
        }
        return 0;
    }

    @Override
    public void updateApplication(String applicationId, ApplicationStatus applicationStatus) throws GlobalException {
        try {
            Application application = viewApplication(applicationId);
            application.setStatus(applicationStatus);
            applicationRepository.save(application);
        } catch (Exception exception) {
            logger.error("Error updating application with ApplicantId: {}", applicationId);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void updateApplicationsByJobId(String jobId, ApplicationStatus applicationStatus) throws GlobalException {
        try {
            List<Application> applications = viewApplicationsByJobId(jobId);
            for (Application application: applications) {
                if(!application.getStatus().equals(ApplicationStatus.SELECTED))
                    application.setStatus(applicationStatus);
            }
            applicationRepository.saveAll(applications);
        } catch (Exception exception) {
            logger.error("Error updating applications with JobId: {}", jobId);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void addApplication(Application application) throws GlobalException {
        try {
            applicationRepository.insert(application);
        } catch (Exception exception) {
            logger.error("Error adding application: {}", application.toString());
            throw new GlobalException(exception.getMessage(), exception);
        }
    }
}
