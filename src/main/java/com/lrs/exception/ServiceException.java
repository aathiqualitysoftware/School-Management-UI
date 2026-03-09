/*
 *
 * Copyright (c) 2019 OLAM Limited
 *
 * All information contained herein is, and remains the property of OLAM
 * Limited. The intellectual and technical concepts contained herein are
 * proprietary to OLAM and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is obtained from OLAM
 * Limited
 *
 */ 
package com.lrs.exception;

/**
 * This class is defined to handle application related APIs
 * 
 * @author Win 10 Pro
 */
public class ServiceException extends Exception {

	private static final long serialVersionUID = -4844945838096311275L;
	private ErrorCode status;
	private int errorCode;
	private  String errorMessage;
	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public ServiceException(String message) {
		super(message);
	}
	
	public ServiceException(ErrorCode code) {
		super(getMessage(code));
		this.errorCode=code.getErrorCode();
		this.errorMessage=code.getMessage();
	}
	
	public ServiceException(Throwable cause) {
		super(cause);
	}
	private static String getMessage(ErrorCode errorCode) {
		if (errorCode.getMessage() != null) {
			return errorCode.getMessage();
		}
		else {
			return null;
		}
	}

	public ErrorCode getStatus() {
		return status;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	
}
