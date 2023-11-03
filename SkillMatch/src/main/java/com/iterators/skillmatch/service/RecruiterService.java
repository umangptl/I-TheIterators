package com.iterators.skillmatch.service;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Recruiter;

import java.util.List;

public interface RecruiterService {
    Recruiter getRecruiter(String id) throws GlobalException;

    Recruiter getRecruiterByEmail(String email) throws GlobalException;

    void addRecruiter(Recruiter recruiter) throws GlobalException;

    void updateRecruiter(Recruiter recruiter) throws GlobalException;

    void deleteRecruiter(String id) throws GlobalException;

    void processOAuthPostLogin(String email, String firstName, String lastName) throws GlobalException;
}
