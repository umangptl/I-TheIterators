package com.iterators.skillmatch.service.impl;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Applicant;
import com.iterators.skillmatch.repository.ApplicantRepository;
import com.iterators.skillmatch.service.ApplicantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicantImpl implements ApplicantService {

    @Autowired
    ApplicantRepository applicantRepository;
    Logger logger = LoggerFactory.getLogger(ApplicantImpl.class);

    @Override
    public void addApplicant(Applicant applicant) throws GlobalException {
        try {
            applicantRepository.insert(applicant);
        } catch (Exception exception) {
            logger.error("Error adding applicant: {}", applicant.toString());
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void updateApplicant(Applicant applicant) throws GlobalException {
        try {
            applicantRepository.save(applicant);
        } catch (Exception exception) {
            logger.error("Error updating applicant: {}", applicant.toString());
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void deleteApplicant(String id) throws GlobalException {
        try {
            applicantRepository.deleteById(id);
        } catch (Exception exception) {
            logger.error("Error deleting applicant with id: {}", id);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public Applicant getApplicant(String id) throws GlobalException {
        try {
            return applicantRepository.findById(id).get();
        } catch (Exception exception) {
            logger.error("Error getting applicant with id: {}", id);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Applicant> getAllApplicant() throws GlobalException {
        try {
            return applicantRepository.findAll();
        } catch (Exception exception) {
            logger.error("Error getting applicants");
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Applicant> filterApplicantOnName(String filterString) throws GlobalException {
        try {
            List<Applicant> applicantsByFirstName=  applicantRepository.findByFirstNameIgnoreCaseContaining(filterString);
            List<Applicant> applicantsByLastName = applicantRepository.findByLastNameIgnoreCaseContaining(filterString);

            // Combine the results of both lists into a new list
            List<Applicant> combinedApplicants = new ArrayList<>();
            combinedApplicants.addAll(applicantsByFirstName);
            combinedApplicants.addAll(applicantsByLastName);

            return combinedApplicants;

        } catch (Exception exception) {
            logger.error("Error getting applicants");
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public List<Applicant> filterApplicantOnEmail(String filterString) throws GlobalException {
        try {
            return applicantRepository.findByEmailContaining(filterString);
        } catch (Exception exception) {
            logger.error("Error getting applicants");
            throw new GlobalException(exception.getMessage(), exception);
        }
    }


}
