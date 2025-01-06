package com.blog.react_spring.dto.request.member;

import lombok.*;

/**
 * -Request-
 * 로그인 요청 dto
 */
@Getter
@Setter
@NoArgsConstructor
public class MemberLoginDto {

    private String email;
    private String password;

    @Builder
    public MemberLoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}

