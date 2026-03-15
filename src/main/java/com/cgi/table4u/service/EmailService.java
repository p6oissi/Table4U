package com.cgi.table4u.service;

import com.cgi.table4u.dto.ReservationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Saadab kliendile e-kirja broneeringu kinnitusega.
     * E-kiri sisaldab laua numbrit, tsooni, kuupäeva, kellaaega ja seltskonna suurust.
     *
     * @param reservation salvestatud broneeringu andmed
     */
    public void sendBookingConfirmation(ReservationResponse reservation) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@table4u.com");
        message.setTo(reservation.customerEmail());
        message.setSubject("Broneering kinnitatud – Table4U");
        message.setText(buildConfirmationText(reservation));
        mailSender.send(message);
        log.info("Confirmation sent to: {}", reservation.customerEmail());
    }

    private String buildConfirmationText(ReservationResponse reservation) {
        return String.format("""
                Tere %s,

                Teie laud on edukalt broneeritud!

                Broneeringu andmed:
                  Laud nr:       %d
                  Tsoon:         %s
                  Kuupäev:       %s
                  Kellaaeg:      %s – %s
                  Inimeste arv:  %d

                Ootame Teid!

                Table4U meeskond
                """,
                reservation.customerName(),
                reservation.tableNumber(),
                reservation.zone(),
                reservation.date(),
                reservation.startTime(),
                reservation.endTime(),
                reservation.partySize()
        );
    }
}