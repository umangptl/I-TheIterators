package com.iterators.skillmatch.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Application;
import com.iterators.skillmatch.model.enums.ApplicationStatus;
import com.iterators.skillmatch.service.ApplicationService;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/application")
public class ApplicationController {

    @Autowired
    ApplicationService applicationService;

    @GetMapping("/{applicationId}")
    public Application getApplicationById(@PathVariable String applicationId) throws GlobalException {
        return applicationService.viewApplication(applicationId);
    }

    @GetMapping("/applicant/{applicantId}")
    public List<Application> getApplicationByApplicantId(@PathVariable String applicantId) throws GlobalException {
        return applicationService.viewApplicationsByApplicantId(applicantId);
    }

    @GetMapping("/applicant/{applicantId}/job/{jobId}")
    public List<Application> getApplicationByApplicantIdAndJobId(@PathVariable String applicantId, @PathVariable String jobId) throws GlobalException {
        return applicationService.viewApplicationsByApplicantId(applicantId);
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationByJobId(@PathVariable String jobId) throws GlobalException {
        return applicationService.viewApplicationsByJobId(jobId);
    }

    @PostMapping
    public void addApplication(@RequestParam("file") MultipartFile file, @RequestParam("applicant") String applicantJson) throws GlobalException, IOException {
        Application application = new ObjectMapper().readValue(applicantJson, Application.class);

        Binary resume = new Binary(file.getBytes());
        application.getApplicant().setResume(resume);
        applicationService.addApplication(application);
    }

    @PutMapping("/{applicationId}/status/{status}")
    public void updateApplication(@PathVariable String applicationId, @PathVariable ApplicationStatus status) throws GlobalException {
        applicationService.updateApplication(applicationId, status);
    }
}
