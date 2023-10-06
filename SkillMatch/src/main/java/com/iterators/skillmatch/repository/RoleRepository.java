package com.iterators.skillmatch.repository;

import com.iterators.skillmatch.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {
    Role findByEmail(String email);
}
