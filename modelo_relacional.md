# Modelo Relacional | Control de Gastos Personales

```
┌─────────────────┐
│     Usuarios    │
├─────────────────┤
│ id (PK)         │◄──────────┐
│ email (UNIQUE)  │           │
│ password        │           │ 1:N
│ nombre          │           │
│ created_at      │           │
└─────────────────┘           │
                              │
        ┌─────────────────────┴───────────────────────┐
        │                                             │
        │                                             │
   ┌────▼──────────────┐              ┌───────────────▼──┐
   │   Categorias      │              │  Transacciones   │
   ├───────────────────┤              ├──────────────────┤
   │ id (PK)           │◄─────────1:N─│ id (PK)          │
   │ nombre            │              │ usuario_id (FK)  │
   │ tipo              │              │ categoria_id (FK)│
   │ created_at        │              │ monto            │
   └───────────────────┘              │ descripcion      │
                                      │ fecha            │
                                      │ created_at       │
                                      │ updated_at       │
                                      └──────────────────┘
```

## Descripción de Tablas

### 1. **Usuarios**
Gestiona los usuarios del sistema.

Campo         | Tipo                     | Descripción
--------------|--------------------------|-------------
id            | INT (PK, AUTO_INCREMENT) | Identificador único del usuario
email         | VARCHAR(255, UNIQUE)     | Email (login único)
password      | VARCHAR(255)             | Hash de contraseña
nombre        | VARCHAR(255)             | Nombre completo
created_at    | TIMESTAMP                | Fecha de creación

---

### 2. **Categorias**
Categorías de transacciones personalizables por usuario.

Campo      | Tipo                      | Descripción
-----------|---------------------------|-------------
id         | INT (PK, AUTO_INCREMENT)  | Identificador único
nombre     | VARCHAR(100)              | Nombre de categoría
tipo       | ENUM('income', 'expense') | Tipo de transacción
created_at | TIMESTAMP                 | Fecha de creación

---

### 3. **Transacciones** (Transacciones)
Registra ingresos y gastos con todas sus propiedades.

Campo        | Tipo                     | Descripción
-------------|--------------------------|-------------
id           | INT (PK, AUTO_INCREMENT) | Identificador único
usuario_id   | INT (FK)                 | Usuario propietario
categoria_id | INT (FK)                 | Categoría de la transacción
monto        | DECIMAL(10,2)            | Cantidad (siempre positivo)
descripcion  | TEXT                     | Detalles opcionales
fecha        | DATE                     | Fecha de la transacción
created_at   | TIMESTAMP                | Cuándo se registró
updated_at   | TIMESTAMP                | Última actualización