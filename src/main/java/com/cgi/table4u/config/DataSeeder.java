package com.cgi.table4u.config;

import com.cgi.table4u.model.Reservation;
import com.cgi.table4u.model.RestaurantTable;
import com.cgi.table4u.model.Zone;
import com.cgi.table4u.repository.ReservationRepository;
import com.cgi.table4u.repository.TableRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;
    private final Random random = new Random();

    public DataSeeder(TableRepository tableRepository, ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        List<RestaurantTable> tables = seedTables();
        seedRandomReservations(tables);
    }

    private List<RestaurantTable> seedTables() {
        List<RestaurantTable> tables = List.of(
                // Terrace 1-4
                new RestaurantTable(1, 2, Zone.TERRACE, 0, 0, false, false, false),
                new RestaurantTable(2, 4, Zone.TERRACE, 1, 0, false, false, true),
                new RestaurantTable(3, 2, Zone.TERRACE, 2, 0, false, false, false),
                new RestaurantTable(4, 6, Zone.TERRACE, 3, 0, false, false, true),

                // Indoor 5-12
                new RestaurantTable(5, 2, Zone.INDOOR, 0, 1, true, false, false),
                new RestaurantTable(6, 4, Zone.INDOOR, 1, 1, false, false, false),
                new RestaurantTable(7, 4, Zone.INDOOR, 2, 1, false, false, true),
                new RestaurantTable(8, 6, Zone.INDOOR, 3, 1, false, false, false),
                new RestaurantTable(9, 2, Zone.INDOOR, 0, 2, true, false, false),
                new RestaurantTable(10, 8, Zone.INDOOR, 1, 2, false, false, false),
                new RestaurantTable(11, 4, Zone.INDOOR, 2, 2, false, false, false),
                new RestaurantTable(12, 2, Zone.INDOOR, 3, 2, true, false, false),

                // Private room 13-16
                new RestaurantTable(13, 4, Zone.PRIVATE_ROOM, 4, 1, true, true, false),
                new RestaurantTable(14, 6, Zone.PRIVATE_ROOM, 4, 2, true, true, false),
                new RestaurantTable(15, 8, Zone.PRIVATE_ROOM, 4, 3, true, true, false),
                new RestaurantTable(16, 10, Zone.PRIVATE_ROOM, 4, 4, true, true, false)
        );
        return tableRepository.saveAll(tables);
    }

    private void seedRandomReservations(List<RestaurantTable> tables) {
        String[] names = {
                "Kati Karu",
                "Jaanus Kajakas",
                "Liisi Luusi",
                "Margus Mägi",
                "Aadu Peedu"
        };
        LocalTime[] startTimes = {
                LocalTime.of(11,0),
                LocalTime.of(13,0),
                LocalTime.of(15,0),
                LocalTime.of(18,0),
                LocalTime.of(20,0),
        };

        for (int day = 0; day < 7; day++) {
            LocalDate date = LocalDate.now().plusDays(day);

            for (RestaurantTable table : tables) {
                if (random.nextDouble() < 0.3) {
                    LocalTime start = startTimes[random.nextInt(startTimes.length)];
                    String name = names[random.nextInt(names.length)];
                    int partySize = random.nextInt(table.getCapacity()) + 1;

                    Reservation reservation = new Reservation(
                            table,
                            name,
                            name.toLowerCase().replace(" ", ".") + "@gmail.com",
                            date,
                            start,
                            start.plusHours(2),
                            partySize
                    );
                    reservationRepository.save(reservation);
                }
            }
        }
    }
}
