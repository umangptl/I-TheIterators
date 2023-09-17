package com.iterators.skillmatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class SkillMatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillMatchApplication.class, args);
    }

}
