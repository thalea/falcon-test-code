/**
 * 
 */
package com.falcon.controller;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.falcon.message.FalconMessage;

/**
 * @author MatejaR
 *
 */
@Controller
public class FalconController {

	@MessageMapping("/falcon")
    @SendTo("/topic/message")
    public FalconMessage getMessage(FalconMessage message) throws Exception {
		LocalDateTime timePoint = LocalDateTime.now();
		message.setMessageDate(timePoint);
		return message;
	}
}
