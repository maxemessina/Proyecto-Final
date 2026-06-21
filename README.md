#### Explicación de las Funciones Implementadas para obtener el blance

El cálculo del balance se divide en tres etapas funcionales:

1. **`Transaccion.findAll` (Consulta y Agregación):** Se encarga de la comunicación con PostgreSQL. Filtra los registros por el `usuario_id` y delega la operación matemática al motor de la base de datos usando `fn('SUM', col('monto'))`. Mediante un `LEFT OUTER JOIN` (`include`), vincula la tabla de categorías para segmentar los montos.

2. **`raw: true, nest: true` (Formateo de Instancias):**
   Normaliza la respuesta del ORM. Convierte las instancias complejas de Sequelize en objetos JSON planos. Esto permite que la aplicación pueda leer de forma directa propiedades anidadas como `item.Categorium.tipo`.

3. **`registros.forEach` (Clasificación y Cálculo):**
   Itera sobre los totales devueltos por la base de datos. Ejecuta un `parseFloat` para convertir los strings monetarios en tipos numéricos y, mediante un condicional (`if/else`), acumula los montos en sus respectivas variables (`ingresos` o `egresos`).

4. **Operación del Neto y `res.json` (Despacho):**
   Realiza la resta final ($ingresos - egresos$) para obtener el `balanceNeto` y ejecuta la función de respuesta de Express para enviar el objeto estructurado al cliente con un código de estado HTTP 200.
Explicación de Funciones de Transacciones

crearTransaccion (Controller): Intercepta peticiones POST para registrar nuevas operaciones. Extrae el monto, descripción, fecha, usuario_id y categoria_id enviados en el cuerpo de la petición (req.body). Utiliza el método create() del ORM Sequelize para guardar el nuevo registro en la base de datos PostgreSQL. Si la operación es exitosa, devuelve un estado 201 (Created) junto con un mensaje de éxito y el objeto de la transacción. Todo el bloque está protegido por un try/catch que devuelve un error 500 si falla la inserción.

obtenerTransacciones (Controller): Función asíncrona encargada de leer el historial completo mediante una petición GET. Utiliza el método findAll() del modelo Transaccion. Para evitar devolver solo identificadores numéricos, implementa la propiedad include para hacer un cruce relacional (JOIN) con los modelos Categoria y Usuario, extrayendo atributos legibles y específicos como el nombre, email y tipo. Además, ordena los resultados de forma descendente (los más recientes primero) basándose en la fecha asignada y la fecha de creación del registro. Responde con los datos en formato JSON o un error 500 en caso de fallo.

actualizarTransaccion (Controller): Permite la edición de un registro existente mediante el método PUT. Primero, extrae el identificador dinámico de la ruta a través de req.params.id y busca la coincidencia en la base de datos usando findByPk(). Si el ID no existe, frena la ejecución y devuelve de forma temprana un error 404 (No encontrada). Si lo encuentra, evalúa uno a uno qué campos fueron enviados en el cuerpo de la petición (evaluando si son diferentes de undefined) para reemplazar únicamente los datos modificados y conservar el resto intacto. Finalmente, ejecuta el método update() de Sequelize y devuelve la transacción actualizada.

eliminarTransaccion (Controller): Endpoint destructivo accesible por DELETE para borrar transacciones específicas. Captura el ID desde la ruta y localiza el registro con findByPk(). Si la transacción no existe, retorna un error 404 como medida defensiva. Si es hallada con éxito, ejecuta el método destroy() proporcionado por el ORM para borrar permanentemente la fila correspondiente en la tabla de la base de datos. Culmina la petición retornando un mensaje JSON de confirmación exitosa.
