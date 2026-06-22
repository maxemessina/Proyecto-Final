# Inicio del Proyecto:

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

## Levantar el proyecto

```bash
# Construir las imagenes
docker-compose build

# Una vez construidas las imagenes, iniciar los servicios
docker-compose up
```

Una vez que todo este corriendo, podes acceder a:

Recurso          | URL 
-----------------|-----
Frontend (React) | http://localhost:3000 // No disponible actualmente
Backend API      | http://localhost:3001/api
Health check     | http://localhost:3001/health
Proxy (Caddy)    | http://localhost
pgAdmin          | http://localhost:5050

> **Tip:** Si queres correrlo en segundo plano, usa `docker-compose up -d`. Para ver los logs: `docker-compose logs -f`.

### Detener el proyecto

```bash
# Detener los servicios manteniendo los datos
docker-compose down

# Detener y borrar todos los datos
docker-compose down -v
```