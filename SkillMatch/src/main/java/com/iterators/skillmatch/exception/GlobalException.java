package com.iterators.skillmatch.exception;

public class GlobalException extends Exception {
    public GlobalException(String errorMessage, Throwable e) {
        super(errorMessage, e);
    }
}
