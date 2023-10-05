package com.iterators.skillmatch.model;

import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("role")
public class Role {
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    private UserRole role;
    private Department department;

}
