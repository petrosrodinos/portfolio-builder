--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, created_at, active, name, description, image, product_id) FROM stdin;
13	2025-05-01 15:34:00.710303+00	t	Professional	This is the professional plan	\N	prod_SES16JQgCSIxI7
11	2025-05-01 15:33:31.864544+00	t	Basic	This is the basic plan	\N	prod_SES1tGFTBcDhYY
\.


--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.prices (id, created_at, product_id, active, currency, type, unit_amount, "interval", interval_count, trial_period_days, price_id) FROM stdin;
8	2025-05-01 15:33:32.512696+00	prod_SES1tGFTBcDhYY	t	usd	recurring	400	month	1	30	price_1RJz79R9wa3GrFgkP21LyEdM
9	2025-05-01 15:34:01.231149+00	prod_SES16JQgCSIxI7	t	usd	recurring	900	month	1	30	price_1RJz7cR9wa3GrFgkTOsQPRc8
\.


--
-- Name: prices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.prices_id_seq', 9, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 13, true);


--
-- PostgreSQL database dump complete
--

