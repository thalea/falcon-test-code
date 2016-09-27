package com.falcon.message;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * JSON model represented as plain java object
 * 
 * @author MatejaR
 *
 */
public class FalconMessage {
	
	private String name;
	
	private String message;
	
	private LocalDateTime messageDate;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getMessageDate() {
		return messageDate;
	}

	public void setMessageDate(LocalDateTime messageDate) {
		this.messageDate = messageDate;
	}
}
