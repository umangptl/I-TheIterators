package com.iterators.skillmatch.model;

import com.iterators.skillmatch.model.enums.Documents;
import jakarta.validation.constraints.NotNull;
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
@Document("applicant")
public class Applicant {

    @Id
    private String id;
    @NotNull
    @Indexed(unique = true)
    private String email;
    @NotNull
    @Field("firstname")
    private String firstName;
    @NotNull
    @Field("lastName")
    private String lastName;

    @NotNull
    @Indexed(unique = true)
    @Field("PhoneNumber")
    private String phoneNumber;

    @NotNull
    @Field("Address")
    private String address;

    @NotNull
    private String Resume;

    private String CoverLetter;

}
