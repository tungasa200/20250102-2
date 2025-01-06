package com.blog.react_spring.common.exception;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
public class MemberException extends RuntimeException {
    private HttpStatus status;
    private String message;
    public MemberException( String message, HttpStatus status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
