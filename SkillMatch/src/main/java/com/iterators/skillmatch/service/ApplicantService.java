package com.iterators.skillmatch.service;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Applicant;
import com.iterators.skillmatch.model.Job;

import java.util.List;

public interface ApplicantService {


    void addApplicant(Applicant applicant) throws GlobalException;

    void updateApplicant(Applicant applicant) throws GlobalException;

    void deleteApplicant(String id) throws GlobalException;

    Applicant getApplicant(String id) throws GlobalException;

    List<Applicant> getAllApplicant() throws GlobalException;

    List<Applicant> filterApplicantOnName(String filterString) throws GlobalException;

    List<Applicant> filterApplicantOnEmail(String filterString) throws GlobalException;
}
