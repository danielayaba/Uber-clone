-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------
-- USERS
--------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120),
    email VARCHAR(120) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password TEXT,
    role VARCHAR(20) CHECK (role IN ('rider','driver','admin')),
    profile_photo TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- DRIVERS
--------------------------------------------------
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    rating DECIMAL(2,1) DEFAULT 5.0,
    total_rides INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'offline',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- COMPANIES / FLEETS
--------------------------------------------------
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150),
    contact_email VARCHAR(120),
    contact_phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- COMPANY DRIVERS
--------------------------------------------------
CREATE TABLE company_drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    driver_id UUID REFERENCES drivers(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- VEHICLES
--------------------------------------------------
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    company_id UUID REFERENCES companies(id),
    owner_driver_id UUID REFERENCES drivers(id),

    brand VARCHAR(100),
    model VARCHAR(100),
    plate_number VARCHAR(50),
    color VARCHAR(50),
    year INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- DRIVER VEHICLE ASSIGNMENTS
--------------------------------------------------
CREATE TABLE driver_vehicle_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id UUID REFERENCES drivers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unassigned_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

--------------------------------------------------
-- DRIVER AVAILABILITY
--------------------------------------------------
CREATE TABLE driver_availability (
    driver_id UUID PRIMARY KEY REFERENCES drivers(id),
    is_available BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP
);

--------------------------------------------------
-- DRIVER REALTIME LOCATION
--------------------------------------------------
CREATE TABLE driver_locations (
    driver_id UUID PRIMARY KEY REFERENCES drivers(id),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    heading DOUBLE PRECISION,
    speed DOUBLE PRECISION,
    accuracy DOUBLE PRECISION,
    updated_at TIMESTAMP
);

--------------------------------------------------
-- DRIVER LOCATION HISTORY
--------------------------------------------------
CREATE TABLE driver_location_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id UUID REFERENCES drivers(id),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    heading DOUBLE PRECISION,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- TRIPS
--------------------------------------------------
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    trip_code VARCHAR(6),

    rider_id UUID REFERENCES users(id),
    driver_id UUID REFERENCES drivers(id),

    vehicle_id UUID REFERENCES vehicles(id),

    pickup_lat DOUBLE PRECISION,
    pickup_lng DOUBLE PRECISION,

    drop_lat DOUBLE PRECISION,
    drop_lng DOUBLE PRECISION,

    has_stops BOOLEAN DEFAULT FALSE,
    total_stops INT DEFAULT 0,

    distance DOUBLE PRECISION,
    duration INT,

    base_fare DECIMAL,
    surge_multiplier DECIMAL,
    total_price DECIMAL,

    status VARCHAR(30),

    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP,
    arrived_at TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);

--------------------------------------------------
-- TRIP STOPS
--------------------------------------------------
CREATE TABLE trip_stops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id),

    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    address TEXT,

    stop_order INT,
    status VARCHAR(20) DEFAULT 'pending',

    reached_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- TRIP TRACKING
--------------------------------------------------
CREATE TABLE trip_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    heading DOUBLE PRECISION,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- PAYMENTS
--------------------------------------------------
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id),
    amount DECIMAL,
    method VARCHAR(20),
    status VARCHAR(20),
    transaction_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- PAYMENT METHODS
--------------------------------------------------
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(20),
    provider VARCHAR(50),
    token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- RATINGS (BIDIRECTIONAL)
--------------------------------------------------
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id),
    rater_id UUID REFERENCES users(id),
    rated_id UUID REFERENCES users(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- NOTIFICATIONS
--------------------------------------------------
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50),
    title TEXT,
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- PUSH TOKENS
--------------------------------------------------
CREATE TABLE push_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    token TEXT,
    platform VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- EMERGENCY CONTACTS
--------------------------------------------------
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(120),
    phone VARCHAR(20)
);

--------------------------------------------------
-- SAVED PLACES (Home, Work, etc)
--------------------------------------------------
CREATE TABLE saved_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100), -- 'Home', 'Work', or Custom name
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- PRICING RULES
--------------------------------------------------
CREATE TABLE pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    base_fare DECIMAL,
    price_per_km DECIMAL,
    price_per_min DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- SURGE ZONES
--------------------------------------------------
CREATE TABLE surge_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    area TEXT,
    multiplier DECIMAL,
    active BOOLEAN DEFAULT FALSE
);

--------------------------------------------------
-- TRIP EVENTS
--------------------------------------------------
CREATE TABLE trip_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id),
    event_type VARCHAR(50),
    payload JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- REPORTS
--------------------------------------------------
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES users(id),
    reported_user_id UUID REFERENCES users(id),
    trip_id UUID REFERENCES trips(id),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- INDEXES
--------------------------------------------------
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_driver ON trips(driver_id);
CREATE INDEX idx_trips_rider ON trips(rider_id);
CREATE INDEX idx_trips_vehicle ON trips(vehicle_id);
CREATE INDEX idx_trip_stops_trip ON trip_stops(trip_id);
CREATE INDEX idx_driver_location ON driver_locations(driver_id);
CREATE INDEX idx_ratings_rated ON ratings(rated_id);

-- Contrainte: un seul véhicule actif par chauffeur
CREATE UNIQUE INDEX unique_active_vehicle_assignment 
ON driver_vehicle_assignments(driver_id)
WHERE is_active = TRUE;

CREATE INDEX idx_saved_places_user_id ON saved_places(user_id);
