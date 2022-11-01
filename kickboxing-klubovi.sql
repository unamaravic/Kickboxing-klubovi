PGDMP     3    /            
    z            kickboxing-klubovi    14.2    14.2 $    3           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            4           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            5           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            6           1262    18173    kickboxing-klubovi    DATABASE     s   CREATE DATABASE "kickboxing-klubovi" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Croatian_Croatia.1250';
 $   DROP DATABASE "kickboxing-klubovi";
                postgres    false            �            1259    18182    osoba    TABLE     �   CREATE TABLE public.osoba (
    briskaznice integer NOT NULL,
    ime character varying(30) NOT NULL,
    prezime character varying(30) NOT NULL,
    "datumrođenja" date NOT NULL,
    oib character varying(11) NOT NULL,
    klubid integer NOT NULL
);
    DROP TABLE public.osoba;
       public         heap    postgres    false            �            1259    18195    Član    TABLE     �   CREATE TABLE public."Član" (
    uzrast character varying(10) NOT NULL,
    "težina" character varying(10) NOT NULL,
    spol character varying(1) NOT NULL,
    oib character varying(11) NOT NULL
);
    DROP TABLE public."Član";
       public         heap    postgres    false            �            1259    18225 	   clanosoba    VIEW       CREATE VIEW public.clanosoba AS
 SELECT osoba.oib,
    osoba.briskaznice,
    osoba.ime,
    osoba.prezime,
    osoba."datumrođenja",
    osoba.klubid,
    "Član".uzrast,
    "Član"."težina",
    "Član".spol
   FROM (public.osoba
     JOIN public."Član" USING (oib));
    DROP VIEW public.clanosoba;
       public          postgres    false    212    212    212    213    213    213    213    212    212    212            �            1259    18175    klub    TABLE       CREATE TABLE public.klub (
    naziv character varying(50) NOT NULL,
    klubid integer NOT NULL,
    godinaosnivanja integer NOT NULL,
    "sjedište" character varying(30) NOT NULL,
    "država" character varying(30) NOT NULL,
    email character varying(50) NOT NULL
);
    DROP TABLE public.klub;
       public         heap    postgres    false            �            1259    18215    kickboxingklubovijson    VIEW       CREATE VIEW public.kickboxingklubovijson AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    ( SELECT json_agg(row_to_json("Član".*)) AS json_agg
           FROM (public."Član"
             LEFT JOIN public.osoba USING (oib))
          WHERE (klub.klubid = osoba.klubid)) AS json_agg
   FROM public.klub;
 (   DROP VIEW public.kickboxingklubovijson;
       public          postgres    false    213    210    210    210    210    210    210    212    212            �            1259    18220    kickboxingklubovijson1    VIEW     }  CREATE VIEW public.kickboxingklubovijson1 AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    ( SELECT json_agg(row_to_json("Član".*)) AS json_agg
           FROM (public."Član"
             JOIN public.osoba USING (oib))
          WHERE (klub.klubid = osoba.klubid)) AS "članovi"
   FROM public.klub;
 )   DROP VIEW public.kickboxingklubovijson1;
       public          postgres    false    210    210    212    212    213    210    210    210    210            �            1259    18229    kickboxingklubovijson2    VIEW     K  CREATE VIEW public.kickboxingklubovijson2 AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    ( SELECT json_agg(clanosoba.*) AS json_agg
           FROM public.clanosoba
          WHERE (klub.klubid = clanosoba.klubid)) AS "članovi"
   FROM public.klub;
 )   DROP VIEW public.kickboxingklubovijson2;
       public          postgres    false    210    210    210    210    210    210    217            �            1259    18205    trener    TABLE     d   CREATE TABLE public.trener (
    licencado date NOT NULL,
    oib character varying(11) NOT NULL
);
    DROP TABLE public.trener;
       public         heap    postgres    false            �            1259    18233    trenerosoba    VIEW     �   CREATE VIEW public.trenerosoba AS
 SELECT osoba.oib,
    osoba.briskaznice,
    osoba.ime,
    osoba.prezime,
    osoba."datumrođenja",
    osoba.klubid,
    trener.licencado
   FROM (public.osoba
     JOIN public.trener USING (oib));
    DROP VIEW public.trenerosoba;
       public          postgres    false    212    212    212    212    212    214    214    212            �            1259    18237    kickboxingklubovijson3    VIEW     �  CREATE VIEW public.kickboxingklubovijson3 AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    ( SELECT json_agg(row_to_json(clanosoba.*)) AS json_agg
           FROM public.clanosoba
          WHERE (klub.klubid = clanosoba.klubid)) AS "članovi",
    ( SELECT json_agg(row_to_json(trenerosoba.*)) AS json_agg
           FROM public.trenerosoba
          WHERE (klub.klubid = trenerosoba.klubid)) AS treneri
   FROM public.klub;
 )   DROP VIEW public.kickboxingklubovijson3;
       public          postgres    false    210    210    219    217    210    210    210    210            �            1259    18241    kickboxingklubovijson4    VIEW     �  CREATE VIEW public.kickboxingklubovijson4 AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    ( SELECT json_agg(row_to_json(clanosoba.*)) AS json_agg
           FROM public.clanosoba
          WHERE (klub.klubid = clanosoba.klubid)) AS "članovi",
    ( SELECT json_agg(row_to_json(trenerosoba.*)) AS json_agg
           FROM public.trenerosoba
          WHERE (klub.klubid = trenerosoba.klubid)) AS trener
   FROM public.klub;
 )   DROP VIEW public.kickboxingklubovijson4;
       public          postgres    false    210    210    219    217    210    210    210    210            �            1259    18254    kickboxingklubovijson5    VIEW     �  CREATE VIEW public.kickboxingklubovijson5 AS
 SELECT klub.naziv,
    klub.klubid,
    klub.godinaosnivanja,
    klub."sjedište",
    klub."država",
    klub.email,
    ( SELECT json_agg(row_to_json(clanosoba.*)) AS json_agg
           FROM public.clanosoba
          WHERE (klub.klubid = clanosoba.klubid)) AS "članovi",
    ( SELECT row_to_json(trenerosoba.*) AS row_to_json
           FROM public.trenerosoba
          WHERE (klub.klubid = trenerosoba.klubid)) AS trener
   FROM public.klub;
 )   DROP VIEW public.kickboxingklubovijson5;
       public          postgres    false    210    219    217    210    210    210    210    210            �            1259    18174    klub_klubid_seq    SEQUENCE     �   CREATE SEQUENCE public.klub_klubid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.klub_klubid_seq;
       public          postgres    false    210            7           0    0    klub_klubid_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.klub_klubid_seq OWNED BY public.klub.klubid;
          public          postgres    false    209            �            1259    18181    osoba_briskaznice_seq    SEQUENCE     �   CREATE SEQUENCE public.osoba_briskaznice_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.osoba_briskaznice_seq;
       public          postgres    false    212            8           0    0    osoba_briskaznice_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.osoba_briskaznice_seq OWNED BY public.osoba.briskaznice;
          public          postgres    false    211            �           2604    18178    klub klubid    DEFAULT     j   ALTER TABLE ONLY public.klub ALTER COLUMN klubid SET DEFAULT nextval('public.klub_klubid_seq'::regclass);
 :   ALTER TABLE public.klub ALTER COLUMN klubid DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    18185    osoba briskaznice    DEFAULT     v   ALTER TABLE ONLY public.osoba ALTER COLUMN briskaznice SET DEFAULT nextval('public.osoba_briskaznice_seq'::regclass);
 @   ALTER TABLE public.osoba ALTER COLUMN briskaznice DROP DEFAULT;
       public          postgres    false    211    212    212            ,          0    18175    klub 
   TABLE DATA           ]   COPY public.klub (naziv, klubid, godinaosnivanja, "sjedište", "država", email) FROM stdin;
    public          postgres    false    210   �2       .          0    18182    osoba 
   TABLE DATA           X   COPY public.osoba (briskaznice, ime, prezime, "datumrođenja", oib, klubid) FROM stdin;
    public          postgres    false    212   }3       0          0    18205    trener 
   TABLE DATA           0   COPY public.trener (licencado, oib) FROM stdin;
    public          postgres    false    214   �4       /          0    18195    Član 
   TABLE DATA           ?   COPY public."Član" (uzrast, "težina", spol, oib) FROM stdin;
    public          postgres    false    213   95       9           0    0    klub_klubid_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.klub_klubid_seq', 4, true);
          public          postgres    false    209            :           0    0    osoba_briskaznice_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.osoba_briskaznice_seq', 18, true);
          public          postgres    false    211            �           2606    18180    klub klub_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.klub
    ADD CONSTRAINT klub_pkey PRIMARY KEY (klubid);
 8   ALTER TABLE ONLY public.klub DROP CONSTRAINT klub_pkey;
       public            postgres    false    210            �           2606    18189    osoba osoba_briskaznice_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_briskaznice_key UNIQUE (briskaznice);
 E   ALTER TABLE ONLY public.osoba DROP CONSTRAINT osoba_briskaznice_key;
       public            postgres    false    212            �           2606    18187    osoba osoba_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_pkey PRIMARY KEY (oib);
 :   ALTER TABLE ONLY public.osoba DROP CONSTRAINT osoba_pkey;
       public            postgres    false    212            �           2606    18209    trener trener_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.trener
    ADD CONSTRAINT trener_pkey PRIMARY KEY (oib);
 <   ALTER TABLE ONLY public.trener DROP CONSTRAINT trener_pkey;
       public            postgres    false    214            �           2606    18199    Član Član_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."Član"
    ADD CONSTRAINT "Član_pkey" PRIMARY KEY (oib);
 >   ALTER TABLE ONLY public."Član" DROP CONSTRAINT "Član_pkey";
       public            postgres    false    213            �           2606    18190    osoba osoba_klubid_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.osoba
    ADD CONSTRAINT osoba_klubid_fkey FOREIGN KEY (klubid) REFERENCES public.klub(klubid);
 A   ALTER TABLE ONLY public.osoba DROP CONSTRAINT osoba_klubid_fkey;
       public          postgres    false    212    3212    210            �           2606    18210    trener trener_oib_fkey    FK CONSTRAINT     r   ALTER TABLE ONLY public.trener
    ADD CONSTRAINT trener_oib_fkey FOREIGN KEY (oib) REFERENCES public.osoba(oib);
 @   ALTER TABLE ONLY public.trener DROP CONSTRAINT trener_oib_fkey;
       public          postgres    false    214    3216    212            �           2606    18200    Član Član_oib_fkey    FK CONSTRAINT     t   ALTER TABLE ONLY public."Član"
    ADD CONSTRAINT "Član_oib_fkey" FOREIGN KEY (oib) REFERENCES public.osoba(oib);
 B   ALTER TABLE ONLY public."Član" DROP CONSTRAINT "Član_oib_fkey";
       public          postgres    false    3216    212    213            ,   �   x�U�=�0����^�Шl%�(���A�Ц����x/�:�Ó�El�Ny�R������Z����$B��J.�;I�9W��Y'�����z��zV\L��k��%m�e�՝X��Q���\�%'�U+�hBi�ǌr��v��v�,.�(&�\�A#��]��8o�I�      .   f  x�U�MN�0����7?K"!@��;��HJ[%�I{V	V��x��ĵƎ_��=[�m0����TEz�����9C�A�Y K�0��0���J�Evd��m�>X)���2�	O/�"�	�=+jE�X狲������[�x�1���hrPC���@��#�-$�ڜ2�*Zv����b����f����>c�+���
�{b�r;6�Fe����y��RҪ�(S-0<�6_���DO�:�1?{�Zj��}Rs�/�RO撆%�����]ր�r�Ʋ��Mm�py8j���w�ڴ=D����pл��L�s t�IRKm$��h����Ė�$u��)���F�Jj�      0   6   x�3206�50"N�2202�
����[X���1���-0�M�b���� i��      /   �   x�e�;�0�9> �N�����vA�BH���{Ѫ$���l�v7?��kR{������Rp�\���.�xV$��������!���|���T�W;�Х<�k��h]ʚ��t[�$�<�γ\";u3�8�[��Ze��@A����g�0 ���h�     