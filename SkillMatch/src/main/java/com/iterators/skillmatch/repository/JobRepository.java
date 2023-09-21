package com.iterators.skillmatch.repository;

import com.iterators.skillmatch.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface JobRepository extends MongoRepository<Job, String> {
    List<Job> findByTitleContainsIgnoreCase(String filterString);

    List<Job> findByDatePostedBetween(Date startDate, Date endDate);

    List<Job> findByDeadlineBefore(Date endDate);
}
