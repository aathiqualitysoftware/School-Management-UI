package com.lrs.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class GenericResponse<T> {
    private T data;
    private int errorCode;
    private String message;
    private boolean success;
}
