package com.iterators.skillmatch.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document("recruiter")
public class Recruiter {
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    @Field("firstname")
    private String firstName;
    @Field("lastName")
    private String lastName;
    @Field("recruitertags")
    private List<String> recruiterTags;
}
