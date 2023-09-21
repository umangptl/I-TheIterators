package com.iterators.skillmatch.repository;

import com.iterators.skillmatch.model.Recruiter;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecruiterRepository extends MongoRepository<Recruiter, String> {
    Recruiter findByEmail(String email);
}
