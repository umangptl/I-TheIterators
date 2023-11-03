package com.iterators.skillmatch.service.impl;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.CustomOAuth2User;
import com.iterators.skillmatch.model.Recruiter;
import com.iterators.skillmatch.model.Role;
import com.iterators.skillmatch.service.RecruiterService;
import com.iterators.skillmatch.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService  {

    Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);

    @Autowired
    RoleService roleService;

    @Autowired
    RecruiterService recruiterService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user =  super.loadUser(userRequest);
        Role role = null;
        try {
            role = roleService.getRole(user.<String>getAttribute("email"));
        } catch (GlobalException e) {
            logger.info("User not found in database");
        }
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(user,  role);
        try {
            return processOAuth2User(customOAuth2User);
        } catch (GlobalException e) {
            throw new RuntimeException(e);
        }
    }

    private OAuth2User processOAuth2User(CustomOAuth2User customOAuth2User) throws GlobalException {
        if(StringUtils.isEmpty(customOAuth2User.getEmail())) {
            throw new GlobalException("Email not found from OAuth2 provider", new RuntimeException());
        }

        recruiterService.processOAuthPostLogin(customOAuth2User.getEmail(),
                customOAuth2User.getFirstName(),
                customOAuth2User.getLastName());

        return customOAuth2User;
    }
}
