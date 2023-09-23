package com.iterators.skillmatch.service;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Job;

import java.util.Date;
import java.util.List;

public interface JobService {
    Job getJob(String id) throws GlobalException;

    List<Job> getAllJob() throws GlobalException;

    void addJob(Job job) throws GlobalException;

    void updateJob(Job job) throws GlobalException;

    void deleteJob(String id) throws GlobalException;

    public List<Job> filterJobOnTitle(String filterString) throws GlobalException;

    public List<Job> filterJobOnDatePosted(Date startDate, Date endDate) throws GlobalException;

    public List<Job> filterJobOnDeadline(Date endDate) throws GlobalException;
}
