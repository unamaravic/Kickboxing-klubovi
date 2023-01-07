--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2023-01-07 21:54:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 18182)
-- Name: osoba; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.osoba (
    briskaznice integer NOT NULL,
    ime character varying(30) NOT NULL,
    prezime character varying(30) NOT NULL,
    "datumrođenja" date NOT NULL,
    oib character varying(11) NOT NULL,
    klubid integer NOT NULL
);


ALTER TABLE public.osoba OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 18195)
-- Name: Član; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Član" (
    "težina" character varying(10) NOT NULL,
    spol character varying(1) NOT NULL,
    oib character varying(11) NOT NULL
);


ALTER TABLE public."Član" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 26816)
-- Name: clanosoba; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.clanosoba AS
 SELECT osoba.briskaznice AS briskazniceclana,
    osoba.ime AS imeclana,
    osoba.prezime AS prezimeclana,
    osoba."datumrođenja" AS datumrodenjaclana,
    osoba.oib AS oibclana,
    osoba.klubid,
    "Član"."težina",
    "Član".spol
   FROM (public.osoba
     JOIN public."Član" USING (oib));


ALTER TABLE public.clanosoba OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 18175)
-- Name: klub; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.klub (
    naziv character varying(50) NOT NULL,
    klubid integer NOT NULL,
    godinaosnivanja integer NOT NULL,
    "sjedište" character varying(30) NOT NULL,
    "država" character varying(30) NOT NULL,
    email character varying(50) NOT NULL
);


ALTER TABLE public.klub OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 18205)
-- Name: trener; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trener (
    licencado date NOT NULL,
    oib character varying(11) NOT NULL
);


ALTER TABLE public.trener OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 26820)
-- Name: trenerosoba; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.trenerosoba AS
 SELECT osoba.briskaznice AS briskaznicetrenera,
    osoba.ime AS imetrenera,
    osoba.prezime AS prezimetrenera,
    osoba."datumrođenja" AS datumrodenjatrenera,
    osoba.oib AS oibtrenera,
    osoba.klubid,
    trener.licencado
   FROM (public.osoba
     JOIN public.trener USING (oib));


ALTER TABLE public.trenerosoba OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 26824)
-- Name: clanklubtrener; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.clanklubtrener AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    clanosoba.briskazniceclana,
    clanosoba.imeclana,
    clanosoba.prezimeclana,
    clanosoba.datumrodenjaclana,
    clanosoba.oibclana,
    clanosoba."težina",
    clanosoba.spol,
    trenerosoba.briskaznicetrenera,
    trenerosoba.imetrenera,
    trenerosoba.prezimetrenera,
    trenerosoba.datumrodenjatrenera,
    trenerosoba.oibtrenera,
    trenerosoba.licencado
   FROM ((public.klub
     LEFT JOIN public.clanosoba USING (klubid))
     FULL JOIN public.trenerosoba ON ((trenerosoba.klubid = klub.klubid)));


ALTER TABLE public.clanklubtrener OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 26833)
-- Name: kickboxingklubovijson; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.kickboxingklubovijson AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    ( SELECT json_agg(row_to_json(clanosoba.*)) AS json_agg
           FROM public.clanosoba
          WHERE (clanosoba.klubid = klub.klubid)) AS "članovi",
    ( SELECT row_to_json(trenerosoba.*) AS row_to_json
           FROM public.trenerosoba
          WHERE (trenerosoba.klubid = klub.klubid)) AS trener
   FROM public.klub;


ALTER TABLE public.kickboxingklubovijson OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 18174)
-- Name: klub_klubid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.klub_klubid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.klub_klubid_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 209
-- Name: klub_klubid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.klub_klubid_seq OWNED BY public.klub.klubid;


--
-- TOC entry 211 (class 1259 OID 18181)
-- Name: osoba_briskaznice_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.osoba_briskaznice_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.osoba_briskaznice_seq OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 211
-- Name: osoba_briskaznice_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.osoba_briskaznice_seq OWNED BY public.osoba.briskaznice;


--
-- TOC entry 3193 (class 2604 OID 18178)
-- Name: klub klubid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klub ALTER COLUMN klubid SET DEFAULT nextval('public.klub_klubid_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 18185)
-- Name: osoba briskaznice; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba ALTER COLUMN briskaznice SET DEFAULT nextval('public.osoba_briskaznice_seq'::regclass);


--
-- TOC entry 3352 (class 0 OID 18175)
-- Dependencies: 210
-- Data for Name: klub; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.klub (naziv, klubid, godinaosnivanja, "sjedište", "država", email) FROM stdin;
KBK KUTINA	1	1998	Kutina	Hrvatska	josip.cerovec@sk.t-com.hr
KBK IMPACT	2	2011	Našice	Hrvatska	stjepan.paska@gmail.com
KBK BTI	3	1997	Zabok	Hrvatska	zvonko.kar@kr.t-com.hr
KBK SPARTAN GYM	4	2006	Zagreb	Hrvatska	acopupac@gmail.com
KBK BUDOKAI-LABIN	5	1998	Labin	Hrvatska	faraguna1@gmail.com
KBK IVANIĆ GRAD	6	1998	Ivanić Grad	Hrvatska	ivica.spevec@gmail.com
KBK JASTREB	7	1997	Jastrebarsko	Hrvatska	jastreb.derdic@gmail.com
KBK LEGEND	8	2010	Slatina	Hrvatska	sarko.marko@gmail.com
KBK MLADOST	9	2011	Varaždin	Hrvatska	veceric@gmail.com
KBK PLANET SPORT	10	2005	Pula	Hrvatska	planetsport@hi.t-com.hr
KBK TIGAR	11	2010	Slunj	Hrvatska	bosanac.milenko@gmail.com
KBK VELEBIT	12	1999	Benkovac	Hrvatska	kbk.velebit@gmail.com
KBK ZMAJ	13	1999	Bedekovčina	Hrvatska	arpad.jaksa@gmail.com
KBK OMEGA	14	2012	Slavonski Brod	Hrvatska	robert.katusic@gmail.com
KBK SUŠAK	15	1995	Rijeka	Hrvatska	branko.fibinger@gmail.com
KBK KOBRA	32	2010	Bjelovar	Hrvatska	kobrabj@gmail.com
\.


--
-- TOC entry 3354 (class 0 OID 18182)
-- Dependencies: 212
-- Data for Name: osoba; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.osoba (briskaznice, ime, prezime, "datumrođenja", oib, klubid) FROM stdin;
1	Ana	Anić	2005-01-01	11111111111	1
2	Ivo	Ivić	2011-02-02	22222222222	1
3	Mate	Matić	1993-03-03	33333333333	2
4	Marija	Marić	1980-04-04	44444444444	4
5	Petar	Petrić	1995-03-10	12345678910	3
6	Lorena	Horvat	2010-04-20	12345678911	4
7	Iva	Grgić	2006-05-30	12345678912	4
8	Luka	Lukić	1970-06-10	12345678913	2
9	Ivan	Babić	1965-07-21	12345678914	1
10	Nora	Novak	1985-09-09	12345678915	3
11	Marina	Petrović	2008-08-28	12345678920	2
12	Zoran	Kovač	2004-06-21	12345678921	3
13	Boris	Buntić	1999-03-18	12345678922	2
14	Željka	Mitrović	2005-05-10	12345678923	3
15	Nora	Stanić	2000-03-13	12345678924	4
16	Senka	Božić	1994-10-10	12345678925	4
17	Marin	Erlić	2001-12-14	12345678926	1
18	Marta	Kovačić	2007-02-19	12345678927	2
19	Mia	Horvat	1990-10-10	98765432100	5
20	Gabrijel	Kovačević	2010-02-01	98765432101	5
21	Luka	Blažević	1980-11-11	98765432102	6
22	Lara	Burić	2005-03-02	98765432103	6
23	David	Mlakar	1970-12-12	98765432104	7
24	Ivan	Despot	1997-04-03	98765432105	7
25	Jakov	Sertić	1960-01-01	98765432106	8
26	Klara	Stanić	2011-05-04	98765432107	8
27	Lea	Filipović	1985-02-02	98765432108	9
28	Mihael	Tokić	2004-06-05	98765432109	9
29	Elena	Katić	1975-03-03	98765432110	10
30	Iva	Tomić	1998-07-06	98765432111	10
31	Niko	Jelić	1965-04-04	98765432112	11
32	Fran	Ilić	2009-08-07	98765432113	11
33	Matej	Šarić	1955-05-05	98765432114	12
34	Dora	Vukelić	2006-09-08	98765432115	12
35	Toma	Brozović	1987-06-06	98765432116	13
36	Jan	Ljubičić	1999-10-09	98765432117	13
37	Petra	Leko	1977-07-07	98765432118	14
38	Franka	Barić	2012-11-10	98765432119	14
39	Ivano	Mesić	2005-12-11	98765432120	5
40	Eva	Petrić	2000-12-13	98765432121	6
41	Marko	Herceg	2013-01-14	98765432122	7
42	Branka	Jurišić	1953-12-07	45612378900	15
43	Vito	Juršić	2003-12-07	45612378901	15
\.


--
-- TOC entry 3356 (class 0 OID 18205)
-- Dependencies: 214
-- Data for Name: trener; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trener (licencado, oib) FROM stdin;
2030-01-01	44444444444
2025-01-01	12345678913
2027-01-01	12345678914
2028-01-01	12345678915
2030-01-01	98765432100
2029-02-01	98765432102
2028-03-01	98765432104
2027-04-01	98765432106
2026-05-01	98765432108
2025-06-01	98765432110
2024-07-01	98765432112
2023-08-01	98765432114
2024-09-01	98765432116
2025-10-01	98765432118
2040-01-01	45612378900
\.


--
-- TOC entry 3355 (class 0 OID 18195)
-- Dependencies: 213
-- Data for Name: Član; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Član" ("težina", spol, oib) FROM stdin;
55	Ž	11111111111
69	M	22222222222
75	M	33333333333
81	M	12345678910
46	Ž	12345678920
84	M	12345678921
91	M	12345678922
60	Ž	12345678923
50	Ž	12345678924
70	Ž	12345678925
69	M	12345678926
55	Ž	12345678927
42	M	98765432101
50	Ž	98765432103
57	M	98765432105
46	Ž	98765432107
63	M	98765432109
55	Ž	98765432111
47	M	98765432113
60	Ž	98765432115
69	M	98765432117
50	Ž	98765432119
74	M	98765432120
65	Ž	98765432121
52	M	98765432122
37	Ž	12345678911
65	Ž	12345678912
74	M	45612378901
\.


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 209
-- Name: klub_klubid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.klub_klubid_seq', 33, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 211
-- Name: osoba_briskaznice_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.osoba_briskaznice_seq', 44, true);


--
-- TOC entry 3196 (class 2606 OID 18180)
-- Name: klub klub_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klub
    ADD CONSTRAINT klub_pkey PRIMARY KEY (klubid);


--
-- TOC entry 3198 (class 2606 OID 18189)
-- Name: osoba osoba_briskaznice_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_briskaznice_key UNIQUE (briskaznice);


--
-- TOC entry 3200 (class 2606 OID 18187)
-- Name: osoba osoba_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pkey PRIMARY KEY (oib);


--
-- TOC entry 3204 (class 2606 OID 18209)
-- Name: trener trener_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trener
    ADD CONSTRAINT trener_pkey PRIMARY KEY (oib);


--
-- TOC entry 3202 (class 2606 OID 18199)
-- Name: Član Član_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Član"
    ADD CONSTRAINT "Član_pkey" PRIMARY KEY (oib);


--
-- TOC entry 3205 (class 2606 OID 18190)
-- Name: osoba osoba_klubid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_klubid_fkey FOREIGN KEY (klubid) REFERENCES public.klub(klubid);


--
-- TOC entry 3207 (class 2606 OID 18210)
-- Name: trener trener_oib_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trener
    ADD CONSTRAINT trener_oib_fkey FOREIGN KEY (oib) REFERENCES public.osoba(oib);


--
-- TOC entry 3206 (class 2606 OID 18200)
-- Name: Član Član_oib_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Član"
    ADD CONSTRAINT "Član_oib_fkey" FOREIGN KEY (oib) REFERENCES public.osoba(oib);


-- Completed on 2023-01-07 21:54:07

--
-- PostgreSQL database dump complete
--

