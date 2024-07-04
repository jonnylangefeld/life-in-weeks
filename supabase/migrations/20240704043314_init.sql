create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  date_of_birth date
);

alter table users enable row level security;
