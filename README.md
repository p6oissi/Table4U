# Table4U

Veebipõhine laua broneerimise tarkvara, mis soovitab külastajatele sobivaima laua vastavalt seltskonna suurusele ja eelistustele. Valiku tegemine toimub visuaalsel põhiplaani vaatel.

---

## Funktsionaalsus

- Otsing kuupäeva, kellaaja, seltskonna suuruse ja tsooni (terrass, saal, privaatne ruum) järgi
- Automaatne laude soovitus skoorialgoritmi alusel (suuruse sobivus + eelistuste boonused)
- Visuaalne põhiplaan, kus lauad on värvkoodiga: roheline (saadaval), punane (hõivatud), kuldne (parim soovitus), hall (ei vasta filtritele)
- Laua broneerimine nime ja e-posti aadressiga
- Kinnituse e-kiri peale edukat broneerimist

---

## Tehnoloogiad

|           | Tehnoloogia                    |
|-----------|--------------------------------|
| Backend   | Java 21, Spring Boot 4.0.3, H2 |
| Frontend  | React 19, TypeScript, Vite     |
| E-post    | Spring Mail + Mailpit          |
| Konteiner | Docker, Docker Compose         |

---

## Käivitamine Dockeriga

**Eeldused:** Docker ja Docker Compose on paigaldatud.

```bash
git clone <repo-url>
cd Table4U
docker compose up --build
```

Seejärel:
- Rakendus: [http://localhost:8080](http://localhost:8080)
- Mailpit (e-kirjad): [http://localhost:8025](http://localhost:8025)

Esimene käivitamine võtab kauem aega, kuna Docker ehitab nii frontendi kui ka backendi. Järgnevad käivitamised on kiiremad.

Peatamiseks:
```bash
docker compose down
```

---

## Arhitektuur

```
Table4U/
├── src/main/java/com/cgi/table4u/
│   ├── controller/     # REST kontrollerid (TableController, ReservationController)
│   ├── service/        # Äriloogika (RecommendationService, ReservationService, EmailService)
│   ├── repository/     # Spring Data JPA
│   ├── model/          # JPA entiteedid (RestaurantTable, Reservation, Zone)
│   ├── dto/            # Andmeobjektid API jaoks
│   ├── exception/      # Veakäsitlus (BookingException, GlobalExceptionHandler)
│   └── config/         # CORS seaded
└── frontend/src/
    ├── pages/          # LandingPage, ReservePage, ConfirmationPage
    ├── components/     # ReservationForm, FloorPlan, TableElement, BookingDialog
    ├── services/       # kõik fetch-päringud
    └── types.ts        # TypeScript liidesed
```

**API otspunktid:**

| Meetod | URL                        | Kirjeldus                                      |
|--------|----------------------------|------------------------------------------------|
| GET    | `/api/tables/zones`        | Kõik tsoonid (rippmenüü jaoks)                 |
| GET    | `/api/tables/recommended`  | Lauad koos staatuse ja skooriga                |
| POST   | `/api/reservations`        | Uue broneeringu loomine                        |

---

## Soovitusalgoritm

Iga saadaolev laud saab skoori järgmise valemiga:

```
skoor = eelistuste_boonus − (laua_mahtuvus − seltskonna_suurus)
```

- **Suuruse sobivus:** mida vähem tühje kohti, seda kõrgem skoor
- **Eelistuste boonus:** +3 punkti iga sobiva eelistuse eest (aknakoht, privaatsus, lapsesõbralik)

Kõrgeima skooriga saadaolev laud märgitakse „Best match" sildi ja kuldse esiletõstega.

---


## Kasutatud abivahendid ja viited

- **Claude Code (Anthropic)**: Abistas rakenduse kavandamisel, frontend koodi kirjutamisel ja dokumenteerimisel.
- [Mailpit](https://mailpit.axllent.org/): e-kirjade testimine lokaalses arenduskeskkonnas

---

## Ajakulu

| Tegevus                  | Aeg (ligikaudu) |
|--------------------------|-----------------|
| Backend                  | 5 h             |
| Frontend                 | 4 h             |
| Dokumenteerimine         | 1.5 h           |
| Dockeri konfigureerimine | 1 h             |
| **Kokku**                | **~11.5 h**     |

---

## Raskused

- **Frontend Kujundus** oli kõige aeganõudvam osa. Arhitektuurse ilmega põhiplaani loomine nõudis palju aega, aga tänu katse-eksitus meetodile said, uksed, aknad ja ruumi piirjooned paika.