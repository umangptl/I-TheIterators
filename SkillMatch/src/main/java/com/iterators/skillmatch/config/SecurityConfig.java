package com.iterators.skillmatch.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableMethodSecurity
public class SecurityConfig{

    @Autowired
    private JWTRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.sessionManagement(sessionManagement -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        http.authorizeRequests().requestMatchers(new AntPathRequestMatcher("/**", "OPTIONS")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/v1/oauth/login")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/application", "POST")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/job", "GET")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/job/*", "GET")).permitAll()
                .anyRequest().authenticated();
        return http.build();
    }
}
