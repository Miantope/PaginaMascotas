CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena_hash TEXT NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'voluntario'
        CHECK (rol IN ('admin', 'voluntario')),
    creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE mascotas (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    especie VARCHAR(10) NOT NULL CHECK (especie IN ('perro', 'gato')),
    edad VARCHAR(20) NOT NULL CHECK (edad IN ('cachorro', 'joven', 'adulto', 'senior')),
    genero VARCHAR(10) NOT NULL CHECK (genero IN ('macho', 'hembra')),
    personalidad VARCHAR(20) NOT NULL CHECK (personalidad IN ('jugueton', 'carinoso', 'tranquilo')),
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255),
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);