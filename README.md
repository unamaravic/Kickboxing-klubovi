
# Kickboxing klubovi

Ovaj repozitorij služi za laboratorijske vježbe iz kolegija Otvoreno računarstvo na Fakultetu elektrotehnike i računarstva.
Tema projekta su kickboxing klubovi, a skup podataka sadrži njihove najvažnije podatke, te podatke o članovima kluba i njihovom treneru.


## Opis skupa podataka

- Tema: kickboxing klubovi  
- Kategorija: sport  
- Autor: Una Maravić - <una.maravic@fer.hr>  
- Jezik: hrvatski  
- Licencija: CC0 - 1.0 license  
- Verzija skupa podataka: 2.0  
- Opis atributa koji se nalaze u skupu:  

    | Ime atributa | Opis atributa | Tip atributa |
    | ------------- | ------------- | ------------- |
    | klubId | identifikator kluba - primary key | integer |
    | naziv  | ime kluba  | varchar |
    | email  | email kluba ili odgovorne osobe  | varchar |
    | godinaosnivanja| godina osnivanja kluba | integer |
    | sjedište | mjesto u kojem se nalazi sjedište kluba | varchar |
    | država | država u kojoj se nalazi sjedište kluba | varchar |
    | brIskaznice | identifikator osobe | integer |
    | ime | ime osobe koja je u klubu | varchar |
    | prezime | prezime osobe koja je u klubu | varchar |
    | datumrođenja | datum rođenja osobe koja je u klubu | datum |
    | oib | identifikator osobe - primary key | varchar |
    | licencado | datum isteka trenerove licence | datum |
    | težina | težinska kategorija u kojoj se natječe član kluba | varchar |
    | spol | spol člana kluba | varchar |
- Datum preuzimanja podataka:  31.10.2022.
- Korisni linkovi: http://www.crokickboxing.hr/wp-content/uploads/2020/04/HKBS-status-%C4%8Dlanova-u-2020.-godini-rev.2-25.02.2020-za-objavu-1.pdf  
- Ključne riječi: klub, kickboxing, trener, član
- Posljednja izmjena u repozitoriju: 7.1.2023.
- Dostupni formati podataka: CSV, JSON  



## Licencija

[CC0-1.0 license](https://creativecommons.org/publicdomain/zero/1.0/)