package com.blog.react_spring.dto.response.file;

import com.blog.react_spring.entity.FileEntity;
import lombok.*;

/**
 * -Response-
 *  게시글 상세 정보에 포함될 file 정보 dto
 */

@Getter
@Setter
@NoArgsConstructor
public class ResBoardDetailsFileDto {

    private Long fileId;
    private String originFileName;
    private String fileType;

    @Builder
    public ResBoardDetailsFileDto(Long fileId, String originFileName, String fileType) {
        this.fileId = fileId;
        this.originFileName = originFileName;
        this.fileType = fileType;
    }

    public static ResBoardDetailsFileDto fromEntity(FileEntity file) {
        return ResBoardDetailsFileDto.builder()
                .fileId(file.getId())
                .originFileName(file.getOriginFileName())
                .fileType(file.getFileType())
                .build();
    }
}
