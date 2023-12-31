CREATE DATABASE FPLTeamSuggestor;
USE FPLTeamSuggestor;
CREATE TABLE fplteamsuggestor.players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(2) NOT NULL,
    team VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE fplteamsuggestor.gameweeks (
    gameweek_id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE fplteamsuggestor.player_performances (
    gameweek_id INT REFERENCES gameweeks(gameweek_id),
    player_id INT REFERENCES players(player_id),
    points INT NOT NULL,
    goals_scored INT DEFAULT 0,
    assists INT DEFAULT 0,
    clean_sheets INT DEFAULT 0,
    bonus_points INT DEFAULT 0,
    PRIMARY KEY (gameweek_id, player_id)
);


CREATE TABLE fplteamsuggestor.users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);