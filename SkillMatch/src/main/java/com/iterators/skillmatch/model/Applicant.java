package com.iterators.skillmatch.model;

import com.iterators.skillmatch.model.enums.Provider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.Binary;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Applicant {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private Binary resume;
    private Binary coverLetter;
    private Provider provider;
    private String actualJobTitle;
    private String actualEmployer;
}
