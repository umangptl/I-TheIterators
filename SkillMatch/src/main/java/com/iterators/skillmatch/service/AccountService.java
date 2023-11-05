package com.iterators.skillmatch.service;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.iterators.skillmatch.config.JWTUtils;
import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.IdTokenRequestDto;
import com.iterators.skillmatch.model.Recruiter;
import com.iterators.skillmatch.model.enums.Provider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AccountService {

    @Autowired
    private RecruiterService recruiterService;
    private final JWTUtils jwtUtils;
    private final GoogleIdTokenVerifier verifier;

    public AccountService(@Value("${app.googleClientId}") String clientId,
                          JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();
        verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public String loginOAuthGoogle(IdTokenRequestDto requestBody) {
        Recruiter account = verifyIDToken(requestBody.getIdToken());
        if (account == null) {
            throw new IllegalArgumentException();
        }
        account = createOrUpdateUser(account);
        return jwtUtils.createToken(account, false);
    }

    public Recruiter createOrUpdateUser(Recruiter account) {
        Recruiter existingAccount = null;
        try {
            existingAccount = recruiterService.getRecruiterByEmail(account.getEmail());
            if (existingAccount == null) {
                recruiterService.addRecruiter(account);
                return account;
            }
            existingAccount.setFirstName(account.getFirstName());
            existingAccount.setLastName(account.getLastName());
            recruiterService.updateRecruiter(existingAccount);
        } catch (GlobalException e) {
            throw new RuntimeException(e);
        }
        return existingAccount;
    }

    private Recruiter verifyIDToken(String idToken) {
        Recruiter recruiter = new Recruiter();
        try {
            GoogleIdToken idTokenObj = verifier.verify(idToken);
            if (idTokenObj == null) {
                return null;
            }
            GoogleIdToken.Payload payload = idTokenObj.getPayload();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");
            String email = payload.getEmail();

            recruiter.setFirstName(firstName);
            recruiter.setLastName(lastName);
            recruiter.setEmail(email);
            recruiter.setProvider(Provider.GOOGLE);
        } catch (GeneralSecurityException | IOException e) {
            return null;
        }
        return recruiter;
    }
}
