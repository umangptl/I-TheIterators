package com.iterators.skillmatch.repository;

import com.iterators.skillmatch.model.Applicant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApplicantRepository extends MongoRepository<Applicant, String>{

    List<Applicant> findByFirstNameIgnoreCaseContaining(String filterString);
    List<Applicant> findByLastNameIgnoreCaseContaining(String filterString);
    List<Applicant> findByEmailContaining(String filterString);

}
