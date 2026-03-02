package com.lrs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;
import org.modelmapper.ModelMapper;

@SpringBootApplication
@Slf4j
@EnableScheduling
public class LrsApplication {

	public static void main(String[] args) {
		SpringApplication.run(LrsApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}
	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}
}
