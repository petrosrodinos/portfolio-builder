# Professional Portfolio Builder

Build a stunning portfolio website in minutes—just upload your resume and let our **AI** get you experience and create a personalized site for you.  
Perfect for developers, designers, and creatives, with no coding required and featuring multiple templates.

# Project Setup and Local Development Guide

This guide walks you through the setup of your local development environment, syncing data from a remote database, and integrating with services like Stripe.

## Getting Started

### 1. Run the Development Server

To start your development server, follow these steps:

#### Client Setup

1. Copy the required environment variables from `.env.template` to `.env` and `.env.development`.
2. Make sure to update the values in both files according to your project’s needs.

Run the development server:

```bash
npm run dev
```

This command will start your application on the default port (`http://localhost:3000`).

---

## Local Supabase Development

To run Supabase locally, you'll need Docker and the Supabase CLI. Follow the steps below to set it up:

### 1. Run Docker Desktop

Ensure Docker Desktop is running on your machine. Docker is required to run the Supabase services locally.

### 2. Start Supabase Locally

Start Supabase locally with the following command:

```bash
npx supabase start
```

This command will launch the necessary Supabase services, including PostgreSQL, storage, and GraphQL, and provide you with the required access URLs.

---

## Sync Remote Database with Local Database

### 1. Apply Schema Migration to Your Local Database

To sync the schema from your remote database to your local one, you'll need to apply the `schema.sql` migration file.

Run the following command to apply the schema:

```bash
psql "postgresql://postgres:postgres@localhost:5432/postgres" -f path/to/your/schema.sql
```

Make sure to replace `path/to/your/schema.sql` with the actual file path of the migration.

### 2. Migrate Remote Tables

To migrate the `prices` and `products` tables from your remote Supabase database to your local one, use `pg_dump` to export the data.

```bash
pg_dump --data-only --table=public.prices --table=public.products --dbname='postgresql://postgres.lmvdjvvrhvqestxlupqj:[password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres' --no-owner --file=table_data.sql
```

Replace `[password]` with the actual password for your remote Supabase database.

### 3. Populate the Remote Data to the Local Database

After exporting the data, populate it into your local database:

```bash
psql "postgresql://postgres:postgres@localhost:5432/postgres" -f table_data.sql
```

This command will insert the exported data into your local PostgreSQL instance.

---

## Create Storage Bucket and Policies

Ensure that the storage bucket is set up locally.Create a bucket called `files` along with the necessary row-level security policies.

### 1. Create Storage Bucket

Run the following SQL commands to create the required storage bucket policies:

```bash
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY objects_select_policy ON storage.objects FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY objects_insert_policy ON storage.objects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY objects_UPDATE_policy ON storage.objects FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY objects_delete_policy ON storage.objects FOR DELETE
USING (auth.role() = 'authenticated');
```

---

## Stripe Integration

### 1. Download and Set Up Stripe CLI

To integrate Stripe with your local development environment, download the Stripe CLI and add it to your system's PATH.

### 2. Listen for Stripe Webhooks

Run the Stripe CLI to listen for webhook events and forward them to your local server:

```bash
stripe listen --forward-to http://192.168.1.5:3000/api/webhooks
```

### 3. Trigger Stripe Events

Trigger test events to simulate Stripe interactions:

```bash
stripe trigger your.event
```

Replace `your.event` with the event you want to trigger (e.g., `payment_intent.succeeded`)
