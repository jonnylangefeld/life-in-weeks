CREATE OR REPLACE FUNCTION keep_alive()
RETURNS float AS $$
BEGIN
    RETURN random();
END;
$$ LANGUAGE plpgsql;
