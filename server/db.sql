-- create database 
CREATE DATABASE properties;

-- install UUID extention 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create tables 
CREATE TABLE owner (
    id UUID NOT NULL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE property (
    property_id UUID NOT NULL PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    postal_code VARCHAR(20),
    rent BIGINT
);

-- insert to table owner 
INSERT INTO owner (id, first_name, last_name) VALUES (uuid_generate_v4(), 'Lucian', 'Windows');
INSERT INTO owner (id, first_name, last_name) VALUES (uuid_generate_v4(), 'Hector', 'Marchment');
INSERT INTO owner (id, first_name, last_name) VALUES (uuid_generate_v4(), 'Paulie', 'Doore');
INSERT INTO owner (id, first_name, last_name) VALUES (uuid_generate_v4(), 'Lucinda', 'Gapp');
INSERT INTO owner (id, first_name, last_name) VALUES (uuid_generate_v4(), 'Avie', 'Eales');

-- insert to table property 
INSERT INTO property (property_id, street, city, state, postal_code, rent) VALUES (uuid_generate_v4(), 'Sunbrook', 'Trenton', 'New Jersey', '08603', 5623);
INSERT INTO property (property_id, street, city, state, postal_code, rent) VALUES (uuid_generate_v4(), 'Riverside', 'Arvada', 'Colorado', '80005', 9334);
INSERT INTO property (property_id, street, city, state, postal_code, rent) VALUES (uuid_generate_v4(), 'Daystar', 'Winston Salem', 'North Carolina', '27157', 1636);
INSERT INTO property (property_id, street, city, state, postal_code, rent) VALUES (uuid_generate_v4(), 'Westerfield', 'Bethesda', 'Maryland', '20816', 9498);
INSERT INTO property (property_id, street, city, state, postal_code, rent) VALUES (uuid_generate_v4(), 'Everett', 'Fort Myers', 'Florida', '33994', 6645);


