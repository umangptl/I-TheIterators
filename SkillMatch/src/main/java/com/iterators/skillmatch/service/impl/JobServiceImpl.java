package com.iterators.skillmatch.service.impl;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Job;
import com.iterators.skillmatch.model.enums.ApplicationStatus;
import com.iterators.skillmatch.repository.JobRepository;
import com.iterators.skillmatch.service.ApplicationService;
import com.iterators.skillmatch.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    ApplicationService applicationService;

    Logger logger = LoggerFactory.getLogger(JobServiceImpl.class);

    @Override
    public Job getJob(String id) throws GlobalException {
        try {
            return jobRepository.findById(id).get();
        } catch (Exception exception) {
            logger.error("Error getting job with id: {}", id);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Job> getAllJob() throws GlobalException {
        try {
            return jobRepository.findAll();
        } catch (Exception exception) {
            logger.error("Error getting jobs");
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void addJob(Job job) throws GlobalException {
        try {
            jobRepository.insert(job);
        } catch (Exception exception) {
            logger.error("Error adding job: {}", job.toString());
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void updateJob(Job job) throws GlobalException {
        try {
            jobRepository.save(job);
        } catch (Exception exception) {
            logger.error("Error updating job: {}", job.toString());
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void deleteJob(String id) throws GlobalException {
        try {
            jobRepository.deleteById(id);
            applicationService.updateApplicationsByJobId(id, ApplicationStatus.REJECTED);
        } catch (Exception exception) {
            logger.error("Error deleting job with id: {}", id);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Job> filterJobOnTitle(String filterString) throws GlobalException {
        try {
            return jobRepository.findByTitleContainsIgnoreCase(filterString);
        } catch (Exception exception) {
            logger.error("Error getting jobs");
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Job> filterJobOnDatePosted(Date startDate, Date endDate) throws GlobalException {
        try {
            return jobRepository.findByDatePostedBetween(startDate, endDate);
        } catch (Exception exception) {
            logger.error("Error getting jobs");
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Job> filterJobOnDeadline(Date endDate) throws GlobalException {
        try {
            return jobRepository.findByDeadlineBefore(endDate);
        } catch (Exception exception) {
            logger.error("Error getting jobs");
            throw new GlobalException(exception.getMessage(), exception);
        }
    }
}
