package com.iterators.skillmatch.controller;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Job;
import com.iterators.skillmatch.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/job")
public class JobController {

    @Autowired
    JobService jobService;

    @GetMapping
    public List<Job> getAllJobs() throws GlobalException {
        return jobService.getAllJob();
    }

    @GetMapping("/{jobId}")
    public Job getJobById(@PathVariable String jobId) throws GlobalException {
        return jobService.getJob(jobId);
    }

    @GetMapping("/title/{titleFilter}")
    public List<Job> filterJobByTitle(@PathVariable String titleFilter) throws GlobalException {
        return jobService.filterJobOnTitle(titleFilter);
    }

    @GetMapping("/deadline/{endDate}")
    public List<Job> filterJobByDeadline(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) throws GlobalException {
        return jobService.filterJobOnDeadline(endDate);
    }

    @GetMapping("/dateposted/{startDate}/{endDate}")
    public List<Job> filterJobByDatePosted(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) throws GlobalException {
        return jobService.filterJobOnDatePosted(startDate, endDate);
    }

    @PostMapping
    public void addJob(@RequestBody Job job) throws GlobalException {
        jobService.addJob(job);
    }

    @PutMapping
    public void updateJob(@RequestBody Job job) throws GlobalException {
        jobService.updateJob(job);
    }

    @DeleteMapping("/{jobId}")
    public void deleteJob(@PathVariable String jobId) throws GlobalException {
        jobService.deleteJob(jobId);
    }
}
