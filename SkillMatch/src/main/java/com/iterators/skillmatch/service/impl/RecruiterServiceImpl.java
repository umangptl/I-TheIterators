package com.iterators.skillmatch.service.impl;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Recruiter;
import com.iterators.skillmatch.repository.RecruiterRepository;
import com.iterators.skillmatch.service.RecruiterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecruiterServiceImpl implements RecruiterService {

    @Autowired
    RecruiterRepository recruiterRepository;
    Logger logger = LoggerFactory.getLogger(RecruiterServiceImpl.class);

    @Override
    public Recruiter getRecruiter(String id) throws GlobalException {
        try {
            return recruiterRepository.findById(id).get();
        } catch (Exception exception) {
            logger.error("Error getting recruiter with id: {}", id);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public Recruiter getRecruiterByEmail(String email) throws GlobalException {
        try {
            return recruiterRepository.findByEmail(email);
        } catch (Exception exception) {
            logger.error("Error getting recruiter with email: {}", email);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void addRecruiter(Recruiter recruiter) throws GlobalException {
        try {
            recruiterRepository.insert(recruiter);
        } catch (Exception exception) {
            logger.error("Error adding recruiter: {}", recruiter.toString());
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void updateRecruiter(Recruiter recruiter) throws GlobalException {
        try {
            recruiterRepository.save(recruiter);
        } catch (Exception exception) {
            logger.error("Error updating recruiter: {}", recruiter.toString());
            throw new GlobalException(exception.getMessage(), exception);
        }
    }

    @Override
    public void deleteRecruiter(String id) throws GlobalException {
        try {
            recruiterRepository.deleteById(id);
        } catch (Exception exception) {
            logger.error("Error deleting recruiter with id: {}", id);
            throw new GlobalException(exception.getMessage(), exception);
        }
    }
}
