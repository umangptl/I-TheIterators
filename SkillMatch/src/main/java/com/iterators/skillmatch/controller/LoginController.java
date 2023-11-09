package com.iterators.skillmatch.controller;

import com.iterators.skillmatch.model.IdTokenRequestDto;
import com.iterators.skillmatch.service.AccountService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;


@RestController
@RequestMapping("/v1/oauth")
public class LoginController {

    @Autowired
    AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity LoginWithGoogleOauth2(@RequestBody IdTokenRequestDto requestBody, HttpServletResponse response) {
        String authToken = accountService.loginOAuthGoogle(requestBody);
        response.addHeader(HttpHeaders.SET_COOKIE, createCookie(authToken).toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletResponse response) {
        Cookie cookieToDelete = new Cookie("AUTH-TOKEN", "");
        cookieToDelete.setMaxAge(0);
        cookieToDelete.setPath("/"); // Use the same path as the original cookie
        response.addCookie(cookieToDelete);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/keepalive")
    public ResponseEntity keepAlive(HttpServletRequest request, HttpServletResponse response) {
        Optional<Cookie> cookie = Arrays.stream(request.getCookies()).findFirst();

        return ResponseEntity.ok().build();
    }

    private ResponseCookie createCookie(String token) {
        return ResponseCookie.from("AUTH-TOKEN", token)
                .httpOnly(true)
                .maxAge(7 * 24 * 3600)
                .path("/")
                .secure(false)
                .build();
    }
}
