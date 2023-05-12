SELECT 'CREATE DATABASE storydotsdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'storydotsdb')\gexec