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
    id UUID NOT NULL PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    postal_code VARCHAR(20),
    rent BIGINT,
    property_id UUID REFERENCES owner (id)
);

-- insert to table owner 
INSERT INTO owner (id, first_name, last_name) VALUES (uuid_generate_v4(), 'Lucian', 'Windows');
INSERT INTO owner (id, first_name, last_name) VALUES (uuid_generate_v4(), 'Hector', 'Marchment');


-- insert to table property 
INSERT INTO property (id, street, city, state, postal_code, rent) VALUES (uuid_generate_v4(), 'Sunbrook', 'Trenton', 'New Jersey', '08603', 5623);
INSERT INTO property (id, street, city, state, postal_code, rent) VALUES (uuid_generate_v4(), 'Riverside', 'Arvada', 'Colorado', '80005', 9334);


