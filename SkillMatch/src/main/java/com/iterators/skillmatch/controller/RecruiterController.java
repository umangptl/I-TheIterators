package com.iterators.skillmatch.controller;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Recruiter;
import com.iterators.skillmatch.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recruiter")
public class RecruiterController {

    @Autowired
    RecruiterService recruiterService;

    @GetMapping("/{recruiterId}")
    public Recruiter getRecruiterId(@PathVariable String recruiterId) throws GlobalException {
        return recruiterService.getRecruiter(recruiterId);
    }

    @GetMapping("/email/{email}")
    public Recruiter getEmployeeByName(@PathVariable String email) throws GlobalException {
        return recruiterService.getRecruiterByEmail(email);
    }

    @PostMapping
    public void addRecruiter(@RequestBody Recruiter recruiter) throws GlobalException {
        recruiterService.addRecruiter(recruiter);
    }

    @PutMapping
    public void updateRecruiter(@RequestBody Recruiter recruiter) throws GlobalException {
        recruiterService.updateRecruiter(recruiter);
    }

    @DeleteMapping("/{recruiterId}")
    public void deleteRecruiter(@PathVariable String recruiterId) throws GlobalException {
        recruiterService.deleteRecruiter(recruiterId);
    }
}
