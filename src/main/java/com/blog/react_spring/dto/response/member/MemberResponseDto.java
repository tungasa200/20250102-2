package com.blog.react_spring.dto.response.member;

import com.blog.react_spring.dto.request.member.MemberRegisterDto;
import com.blog.react_spring.entity.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberResponseDto {
    private String email;
    private String username;

    @Builder
    public MemberResponseDto(String email, String username) {
        this.email = email;
        this.username = username;
    }

    public static MemberResponseDto fromEntity(Member member){
        return MemberResponseDto.builder()
                .email(member.getEmail())
                .username(member.getUsername())
                .build();
    }
}
