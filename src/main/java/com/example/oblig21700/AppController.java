package com.example.oblig21700;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AppController {
    private final ArrayList<Ticket> tickets = new ArrayList<>();

    @PostMapping("/tickets/add")
    public void addTicketToList(Ticket ticket) {
        tickets.add(ticket);
    }

    @GetMapping("/tickets/list")
    public ArrayList<Ticket> listTickets() {
        return tickets;
    }

    @PostMapping("/tickets/clear")
    public void deleteAll() {
        tickets.clear();
    }

    @PostMapping("/receiveTicket")
    public void receiveTicket(Ticket ticket){
        System.out.println(ticket);
    }
}