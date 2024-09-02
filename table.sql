
CREATE TABLE brand
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE type
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE country
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE bearings
(
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    count          INT          NOT NULL,
    price          INT          NOT NULL,
    brand_id       INT REFERENCES brand (id),
    inner_diameter INT          NOT NULL,
    outer_diameter INT          NOT NULL,
    height         INT          NOT NULL,
    type_id        INT REFERENCES type (id),
    country_id     INT REFERENCES country (id)
);

INSERT INTO brand (name)
VALUES ('SKF'),
       ('FAG'),
       ('NSK');

INSERT INTO type (name)
VALUES ('Ball Bearings'),
       ('Roller Bearings'),
       ('Spherical Roller Bearings');

INSERT INTO country (name)
VALUES ('Sweden'),
       ('Germany'),
       ('Japan');

INSERT INTO bearings (name, brand_id, count, price, inner_diameter, outer_diameter, height, type_id, country_id)
VALUES ('6205', 1, 52, 258, 25, 52, 15, 1, 1),
       ('6206', 1, 38, 458, 30, 62, 16, 1, 2),
       ('30202', 2, 3, 2205, 15, 35, 11, 2, 2),
       ('22308', 3, 10, 5000, 40, 80, 23, 3, 3);

--request to get all bearing details
PREPARE bearing_details AS
    SELECT bearings.name AS name,
           brand.name    AS brand,
           bearings.count AS count,
           bearings.price AS price,
           bearings.inner_diameter,
           bearings.outer_diameter,
           bearings.height,
           type.name AS type,
           country.name AS country
    FROM bearings
             JOIN brand
                  ON bearings.brand_id = brand.id
             JOIN type ON bearings.type_id = type.id
             JOIN country ON bearings.country_id = country.id;

--request to get bearing details by its ID
PREPARE bearing_details_by_id(INT) AS
    SELECT bearings.name AS name,
           brand.name    AS brand,
           bearings.count AS count,
           bearings.price AS price,
           bearings.inner_diameter,
           bearings.outer_diameter,
           bearings.height,
           type.name AS type,
           country.name AS country
    FROM bearings
             JOIN brand
                  ON bearings.brand_id = brand.id
             JOIN type ON bearings.type_id = type.id
             JOIN country ON bearings.country_id = country.id
    WHERE bearings.id = $1;

--request to get bearing details by brand name
PREPARE bearing_details_by_brand_name(VARCHAR) AS
    SELECT bearings.name AS name,
           brand.name    AS brand,
           bearings.count AS count,
           bearings.price AS price,
           bearings.inner_diameter,
           bearings.outer_diameter,
           bearings.height,
           type.name AS type,
           country.name AS country
    FROM bearings
             JOIN brand
                  ON bearings.brand_id = brand.id
             JOIN type ON bearings.type_id = type.id
             JOIN country ON bearings.country_id = country.id
    WHERE brand.name = $1;

--request to get all bearing details ordered by price
PREPARE bearing_details_ordered_by_price AS
    SELECT bearings.name AS name,
           brand.name    AS brand,
           bearings.count AS count,
           bearings.price AS price,
           bearings.inner_diameter,
           bearings.outer_diameter,
           bearings.height,
           type.name AS type,
           country.name AS country
    FROM bearings
             JOIN brand
                  ON bearings.brand_id = brand.id
             JOIN type ON bearings.type_id = type.id
             JOIN country ON bearings.country_id = country.id

    ORDER BY bearings.price DESC;

EXECUTE bearing_details;
EXECUTE bearing_details_by_id(2);
EXECUTE bearing_details_by_brand_name('FAG');