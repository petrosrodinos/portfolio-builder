## Getting Started

First, run the development server:

### client

- add the required environment variables from .env.template to .env and .env.development

```bash
npm run dev
```

### Local Supabase development

- run docker desktop
- npx supabase start

#### Take products and prices data from remote database

- download https://www.postgresql.org/download/

- ### Apply the schema migration to your local database
- psql "postgresql://postgres:postgres@localhost:5432/postgres" -f path/to/your/schema.sql
- migrate remote tables

```bash
pg_dump --data-only --table=public.prices --table=public.products --dbname='postgresql://postgres.lmvdjvvrhvqestxlupqj:[password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres' --no-owner --file=table_data.sql
```

- populate the remote data to local database

```bash
psql "postgresql://postgres:postgres@localhost:5432/postgres" -f table_data.sql
```

### stripe

- download stripe cli and add it to environment variables
- stripe listen --forward-to http://192.168.1.5:3000/api/webhooks
- stripe trigger your.event
