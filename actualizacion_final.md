# Frontend - React (Entrega Final)

## Descripción
Breve documentación del trabajo realizado en el Frontend: aplicación React que consume la API del backend (ver: [README principal](./README.md)). La app implementa autenticación basada en JWT provisto por el backend y gestiona sesiones en el cliente.

## Tecnologías
- React
- Axios
- Context API / Hooks

## Actualización con JWT
- Flujo: el usuario hace login (email + password) -> backend valida y responde con un JWT -> el frontend almacena el token y lo adjunta en las solicitudes protegidas.

## Componentes / Vistas principales
- Login / Register: formularios de autenticación.
- Dashboard: resumen (balance, últimas transacciones).
- Transacciones: listado, filtro, creación/edición/eliminación (consumo de endpoints existentes).
- Perfil: muestra información del usuario (GET /api/usuario/perfil/:id).

## Rutas protegidas
Implementar protección de rutas con un componente tipo <PrivateRoute /> que verifica existencia/validez del token antes de renderizar rutas sensibles.

## Integrantes y responsabilidades (Frontend)

### **Priscila Arrimada** → **Gestión de Categorías (Frontend)**

- Página de Categorías (listar todas)
- Form de crear categoría
- Editar categoría (modal o página)
- Eliminar categoría (confirm dialog)

---

### **Tomás Astudillo** → **Crear Transacciones (Frontend)**

- Form de crear transacción (inputs de monto, descripción, fecha, categoría)
- Validaciones del form
- Integración con endpoint POST /api/transaccion/crear

---

### **Valentina Guerrieri** → **Listar y Filtrar Transacciones (Frontend)**

- Página de transacciones con tabla/cards
- Filtros por usuario, categoría, rango de fechas
- Integración con GET /api/transaccion/filtrar

---

### **Máximo Messina**  → **Usuario (Frontend)**

- Estructura inicial del proyecto React
- Setup de axios/fetch con interceptores para JWT
- Rutas protegidas y contexto de autenticación
- Layout general (Navbar, Sidebar, estructura de la app)
- Modelado de vistas de usuario (register, login, perfil)

---

### **Máximo Moraes** → **Editar y Eliminar Transacciones (Frontend)**

- Modal/form de editar transacción
- Integración con PUT /api/transaccion/actualizar/:id
- Integración con DELETE /api/transaccion/eliminar/:id

---

### **Lucas Rojas** → **Dashboard y Reportes (Frontend)**

- Dashboard balance (balance total, ingresos vs egresos)
- Resumen por categoría