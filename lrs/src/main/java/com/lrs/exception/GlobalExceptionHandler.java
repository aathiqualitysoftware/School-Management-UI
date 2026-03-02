package com.lrs.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = RuntimeException.class)
	public ResponseEntity<ErrorMessage> handleRuntimeException(Exception ex) {
//		log.error("Ops!", ex);
		ErrorHandle errorHandle = ErrorCode.SVS_ERR_0001;
		ErrorMessage errorMessage = new ErrorMessage();
		errorMessage.setErrorCode(errorHandle.getErrorCode());
		errorMessage.setMessage(errorHandle.getMessage());
		errorMessage.setErrors(errorHandle.getMessage());
		errorMessage.setSuccess(false);
		return new ResponseEntity<>(errorMessage,
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

    @ExceptionHandler(value = AccessDeniedException.class)
	public ResponseEntity<ErrorMessage> handleAccessDined(Exception ex) {
		ex.printStackTrace();
//		log.error("Ops!", ex);
		ErrorHandle errorHandle = ErrorCode.SVS_ERR_0002;
		ErrorMessage errorMessage = new ErrorMessage();
		errorMessage.setErrorCode(errorHandle.getErrorCode());
		errorMessage.setMessage(ex.getMessage());
		errorMessage.setErrors(ex.getMessage());
		return new ResponseEntity<ErrorMessage>(errorMessage,
				HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler(value = ServiceException.class)
	public ResponseEntity<ErrorMessage> handleServiceException(ServiceException ex) {
		ex.printStackTrace();
//		log.error("Ops!", ex);
		ErrorHandle errorHandle = ErrorCode.SVS_ERR_0022;
		ErrorMessage errorMessage = new ErrorMessage();
		errorMessage.setErrorCode(errorHandle.getErrorCode());
		errorMessage.setMessage(ex.getMessage());
		errorMessage.setErrors(ex.getMessage());
		return new ResponseEntity<ErrorMessage>(errorMessage,
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
}