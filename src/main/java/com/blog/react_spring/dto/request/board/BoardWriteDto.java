package com.blog.react_spring.dto.request.board;

import com.blog.react_spring.entity.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardWriteDto {

    private String title;
    private String content;

    public BoardWriteDto(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Builder
    public static Board ofEntity(BoardWriteDto dto) {
        return Board.builder()
                .title(dto.title)
                .content(dto.content)
                .build();
    }
}
