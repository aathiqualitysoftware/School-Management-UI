package com.lrs.ServiceImpl;

import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class WhatsAppService {

    private static final String TOKEN = "YOUR_ACCESS_TOKEN";
    private static final String PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID";

    public void sendMessage(String recipientNumber, String message) {
        try {
            String jsonBody = """
            {
              "messaging_product": "whatsapp",
              "to": "%s",
              "type": "text",
              "text": { "body": "%s" }
            }
            """.formatted(recipientNumber, message);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://graph.facebook.com/v18.0/" + "8667494855" + "/messages"))
                    .header("Authorization", "Bearer " + TOKEN)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("WhatsApp API Response: " + response.body());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}