CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');

CREATE TABLE users (
	iduser INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	active BOOLEAN DEFAULT TRUE,
	role user_role NOT NULL DEFAULT 'user'
)

SELECT enumlabel AS type_movs
FROM pg_enum
WHERE enumtypid = 'user_role'::regtype;

CREATE TYPE trade_movs AS ENUM ('buy by market', 'sell by market', 'buy limit', 'sell limit', 'buy stop', 'sell stop');
CREATE TYPE trade_type AS ENUM ('FOREX', 'BINARIES', 'CRYPTO');

CREATE TABLE trades(
  idtrade INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  mov trade_movs NOT NULL,
  type trade_type NOT NULL DEFAULT 'FOREX',
  market VARCHAR(10) NOT NULL,
  pe DECIMAL(10,4) NOT NULL,
  sl DECIMAL(10,4) NOT NULL,
  tp DECIMAL(10,4) NOT NULL,
  pips INT,
  total DECIMAL(10,2),
  dateIn TIMESTAMP NOT NULL,
  dateOut TIMESTAMP,
  bank INT REFERENCES banks(idbank),
  comment TEXT
)

SELECT enumlabel AS type_movs
FROM pg_enum
WHERE enumtypid = 'trade_movs'::regtype;

SELECT enumlabel AS type_movs
FROM pg_enum
WHERE enumtypid = 'trade_type'::regtype;

CREATE TABLE banks(
  idbank INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(150),
  start TIMESTAMP NOT NULL,
  finish TIMESTAMP,
  amount DECIMAL(10,2)
  usr INT REFERENCES users(iduser),
  active BOOLEAN DEFAULT true
)