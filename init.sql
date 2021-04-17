CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (50) UNIQUE NOT NULL, 
    password VARCHAR (200) NOT NULL,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
 );


CREATE TABLE IF NOT EXISTS job (
    id TEXT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR (50) NOT NULL,
    daily_hours INT,
    total_hours INT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) 
          REFERENCES users (id)
          ON DELETE CASCADE
);

