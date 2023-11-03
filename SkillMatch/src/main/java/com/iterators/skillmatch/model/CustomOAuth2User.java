package com.iterators.skillmatch.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomOAuth2User implements OAuth2User {

    private OAuth2User oauth2User;
    private Role role;

    public CustomOAuth2User(OAuth2User oauth2User, Role role) {
        this.oauth2User = oauth2User;
        this.role = role;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oauth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        oauth2User.getAuthorities().forEach(ga -> authorities.add(ga));
        authorities.add(new SimpleGrantedAuthority("ROLE_RECRUITER"));
        if (role != null)
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRole().getRole()));
        return authorities;
    }

    @Override
    public String getName() {
        return oauth2User.getAttribute("name");
    }

    public String getFirstName() {
        return oauth2User.getAttribute("given_name");
    }

    public String getLastName() {
        return oauth2User.getAttribute("family_name");
    }

    public String getEmail() {
        return oauth2User.<String>getAttribute("email");
    }
}