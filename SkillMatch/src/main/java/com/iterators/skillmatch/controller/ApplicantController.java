package com.iterators.skillmatch.controller;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Applicant;
import com.iterators.skillmatch.service.ApplicantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applicant")
public class ApplicantController {

    @Autowired
    ApplicantService applicantService;

    @GetMapping
    public List<Applicant> getAllApplicants() throws GlobalException {
        return applicantService.getAllApplicant();
    }

    @GetMapping("/{applicantId}")
    public Applicant getApplicantById(@PathVariable String applicantId) throws GlobalException {
        return applicantService.getApplicant(applicantId);
    }

    @GetMapping("/name/{nameFilter}")
    public List<Applicant> filterApplicantByName(@PathVariable String nameFilter) throws GlobalException {
        return applicantService.filterApplicantOnName(nameFilter);
    }

    @GetMapping("/email/{emailFilter}")
    public List<Applicant> filterApplicantByEmail(@PathVariable String emailFilter) throws GlobalException {
        return applicantService.filterApplicantOnEmail(emailFilter);
    }

    @PostMapping
    public void addApplicant(@RequestBody Applicant applicant) throws GlobalException {
        applicantService.addApplicant(applicant);
    }

    @PutMapping
    public void updateApplicant(@RequestBody Applicant applicant) throws GlobalException {
        applicantService.updateApplicant(applicant);
    }

    @DeleteMapping("/{applicantId}")
    public void deleteApplicant(@PathVariable String applicantId) throws GlobalException {
        applicantService.deleteApplicant(applicantId);
    }
}
