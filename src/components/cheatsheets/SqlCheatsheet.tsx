import { useState } from 'react'

function CodeBlock({ code, title }: { code: string; title?: string }) {
	return (
		<div className="rounded-md overflow-hidden border border-stone-700">
			{title && (
				<div className="px-3 py-1.5 bg-stone-800 border-b border-stone-700 text-stone-400 text-xs font-mono">
					{title}
				</div>
			)}
			<pre className="p-4 bg-stone-950 text-sm font-mono leading-relaxed overflow-x-auto text-stone-300 whitespace-pre">
				{code}
			</pre>
		</div>
	)
}

function CheatTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
	return (
		<div className="overflow-x-auto rounded-md border border-stone-700">
			<table className="w-full text-sm font-mono text-left text-stone-300">
				<thead>
					<tr className="bg-stone-800 border-b border-stone-700">
						{headers.map(h => (
							<th key={h} className="px-3 py-2 font-semibold text-stone-200 whitespace-nowrap">{h}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={i} className={`${i % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800/60'} border-t border-stone-800`}>
							{row.map((cell, j) => (
								<td key={j} className="px-3 py-1.5 whitespace-nowrap text-stone-300">{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-4">
			<h3 className="font-serif text-base font-semibold text-stone-100 border-b border-stone-800 pb-2">{title}</h3>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	)
}

function Note({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' }) {
	const styles = type === 'warning'
		? 'border-orange-700/50 bg-orange-950/30 text-orange-300'
		: 'border-blue-700/50 bg-blue-950/30 text-blue-300'
	return (
		<div className={`border-l-4 rounded-r-md px-4 py-2.5 text-sm ${styles}`}>{children}</div>
	)
}

function BasicoContent() {
	return (
		<div className="flex flex-col gap-8">
			<Section title="Tipos de datos comunes">
				<CheatTable
					headers={['Tipo', 'Descripción', 'Ejemplo']}
					rows={[
						['INT', 'Número entero', '42'],
						['DECIMAL(p,s)', 'Número con decimales', 'DECIMAL(10,2)'],
						['VARCHAR(n)', 'Texto variable hasta n caracteres', 'VARCHAR(255)'],
						['TEXT', 'Texto largo', 'blogs, descripciones'],
						['DATE', 'Fecha YYYY-MM-DD', '2024-03-15'],
						['DATETIME', 'Fecha + hora', '2024-03-15 14:30:00'],
						['BOOLEAN', 'Verdadero/Falso (alias de TINYINT)', 'TRUE / FALSE'],
					]}
				/>
			</Section>

			<Section title="DDL — Definición de estructura">
				<CodeBlock
					title="ddl.sql"
					code={`-- Crear base de datos
CREATE DATABASE tienda;
USE tienda;

-- Crear tabla
CREATE TABLE clientes (
    id        INT           AUTO_INCREMENT PRIMARY KEY,
    nombre    VARCHAR(100)  NOT NULL,
    email     VARCHAR(150)  UNIQUE,
    ciudad    VARCHAR(80),
    creado_en DATETIME      DEFAULT NOW()
);

-- Modificar tabla
ALTER TABLE clientes ADD COLUMN telefono VARCHAR(20);
ALTER TABLE clientes DROP COLUMN telefono;
ALTER TABLE clientes MODIFY COLUMN nombre VARCHAR(150) NOT NULL;

-- Eliminar tabla (irreversible)
DROP TABLE clientes;

-- Vaciar tabla sin borrar estructura
TRUNCATE TABLE clientes;`}
				/>
			</Section>

			<Section title="Restricciones (CONSTRAINTS)">
				<CodeBlock
					title="constraints.sql"
					code={`CREATE TABLE productos (
    id          INT           AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100)  NOT NULL,
    sku         VARCHAR(50)   UNIQUE,
    precio      DECIMAL(10,2) DEFAULT 0.00,
    stock       INT           CHECK (stock >= 0),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);`}
				/>
				<CheatTable
					headers={['Restricción', 'Descripción']}
					rows={[
						['PRIMARY KEY', 'Identifica cada fila de forma única. Solo una por tabla.'],
						['NOT NULL', 'La columna no puede tener valores nulos.'],
						['UNIQUE', 'Todos los valores de la columna deben ser distintos.'],
						['DEFAULT', 'Valor por defecto si no se proporciona uno.'],
						['CHECK', 'Valida que los datos cumplan una condición.'],
						['FOREIGN KEY', 'Referencia a la PRIMARY KEY de otra tabla.'],
					]}
				/>
			</Section>

			<Section title="DML — Manipulación de datos">
				<CodeBlock
					title="dml.sql"
					code={`-- Insertar una fila
INSERT INTO clientes (nombre, email, ciudad)
VALUES ('Ana López', 'ana@correo.com', 'Madrid');

-- Insertar múltiples filas
INSERT INTO clientes (nombre, email, ciudad) VALUES
    ('Luis García', 'luis@correo.com', 'Barcelona'),
    ('María Torres', 'maria@correo.com', 'Sevilla'),
    ('Carlos Ruiz', 'carlos@correo.com', 'Valencia');

-- Actualizar registros
UPDATE clientes
SET ciudad = 'Bilbao'
WHERE id = 1;

-- Eliminar registros
DELETE FROM clientes
WHERE id = 4;`}
				/>
				<Note type="warning">Siempre usa WHERE en UPDATE y DELETE a menos que sea intencional.</Note>
			</Section>

			<Section title="SELECT — Consultas básicas">
				<CodeBlock
					title="select.sql"
					code={`-- Todas las columnas
SELECT * FROM clientes;

-- Columnas específicas
SELECT nombre, email FROM clientes;

-- Alias de columnas
SELECT nombre AS cliente, email AS correo FROM clientes;

-- Valores únicos
SELECT DISTINCT ciudad FROM clientes;

-- Filtrar con WHERE
SELECT * FROM clientes WHERE ciudad = 'Madrid';

-- Ordenar resultados
SELECT * FROM clientes ORDER BY nombre ASC;
SELECT * FROM clientes ORDER BY creado_en DESC;

-- Limitar resultados
SELECT * FROM clientes LIMIT 10;

-- Paginación con OFFSET
SELECT * FROM clientes LIMIT 10 OFFSET 20;`}
				/>
			</Section>

			<Section title="Alias (AS)">
				<CodeBlock
					title="alias.sql"
					code={`-- Alias de columna: renombra la columna en el resultado
SELECT nombre AS cliente, email AS correo
FROM clientes;

-- Alias de tabla: nombre corto para usarla en JOINs y WHERE
SELECT c.nombre, p.total
FROM clientes AS c
INNER JOIN pedidos AS p ON c.id = p.cliente_id;

-- El AS es opcional (pero se recomienda por claridad)
SELECT c.nombre, p.total
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id;

-- Alias OBLIGATORIO: subconsulta en FROM (tabla derivada)
SELECT ciudad, total
FROM (
    SELECT ciudad, COUNT(*) AS total
    FROM clientes
    GROUP BY ciudad
) AS resumen;           -- sin este alias, MySQL da error

-- Alias con expresiones calculadas
SELECT nombre,
       precio * 1.19 AS precio_con_iva,
       CONCAT(nombre, ' (', categoria, ')') AS nombre_completo
FROM productos;`}
				/>
				<Note>Los alias de columna definidos en SELECT NO se pueden usar en WHERE (se ejecuta antes). Sí se pueden usar en ORDER BY y HAVING.</Note>
			</Section>

			<Section title="Funciones de agregación — Detalle">
				<p className="text-stone-400 text-sm">Supongamos esta tabla <code className="text-amber-400 font-mono">productos</code>:</p>
				<CheatTable
					headers={['id', 'nombre', 'precio', 'stock']}
					rows={[
						['1', 'Pollo Frito', '8990', '50'],
						['2', 'Combo Gus', '12990', '30'],
						['3', 'Nuggets', '5990', 'NULL'],
						['4', 'Curly Fries', '3490', '100'],
						['5', 'Batido Azul', '2990', '75'],
					]}
				/>
				<CodeBlock
					title="funciones_agregacion.sql"
					code={`-- COUNT(*) vs COUNT(col)
SELECT COUNT(*) AS total_filas FROM productos;         -- 5 (cuenta todas las filas)
SELECT COUNT(stock) AS con_stock FROM productos;       -- 4 (ignora NULLs)

-- SUM: suma valores numéricos
SELECT SUM(precio) AS suma_precios FROM productos;     -- 34450

-- AVG: promedio (ignora NULLs)
SELECT AVG(precio) AS promedio FROM productos;         -- 6890.00
SELECT ROUND(AVG(precio), 0) AS promedio_redondeado    -- 6890
FROM productos;

-- MIN / MAX: funcionan con números, texto y fechas
SELECT MIN(precio) AS más_barato FROM productos;       -- 2990
SELECT MAX(precio) AS más_caro FROM productos;         -- 12990
SELECT MIN(nombre) AS primero_alfa FROM productos;     -- Batido Azul (orden alfabético)

-- GROUP_CONCAT: concatena valores del grupo (MySQL)
SELECT categoria,
       GROUP_CONCAT(nombre SEPARATOR ', ') AS lista
FROM productos
GROUP BY categoria;
-- Resultado: "Pollo" → "Pollo Frito, Combo Gus, Nuggets"`}
				/>
				<CheatTable
					headers={['Función', 'Descripción', '¿Ignora NULL?']}
					rows={[
						['COUNT(*)', 'Cuenta todas las filas', 'No'],
						['COUNT(col)', 'Cuenta valores no nulos', 'Sí'],
						['SUM(col)', 'Suma los valores', 'Sí'],
						['AVG(col)', 'Promedio aritmético', 'Sí'],
						['MIN(col)', 'Valor mínimo', 'Sí'],
						['MAX(col)', 'Valor máximo', 'Sí'],
						['GROUP_CONCAT(col)', 'Concatena valores del grupo', 'Sí'],
					]}
				/>
			</Section>

			<Section title="Operadores en WHERE">
				<CodeBlock
					title="operadores.sql"
					code={`-- Comparación
SELECT * FROM productos WHERE precio > 100;
SELECT * FROM productos WHERE precio >= 50 AND precio <= 200;

-- BETWEEN (inclusivo)
SELECT * FROM productos WHERE precio BETWEEN 50 AND 200;

-- IN (lista de valores)
SELECT * FROM clientes WHERE ciudad IN ('Madrid', 'Barcelona', 'Sevilla');

-- LIKE (patrones de texto)
SELECT * FROM clientes WHERE nombre LIKE 'A%';     -- empieza con A
SELECT * FROM clientes WHERE email LIKE '%@gmail%'; -- contiene @gmail
SELECT * FROM clientes WHERE nombre LIKE '_na%';    -- segundo y tercer carácter: na

-- IS NULL / IS NOT NULL
SELECT * FROM clientes WHERE telefono IS NULL;
SELECT * FROM clientes WHERE email IS NOT NULL;

-- AND, OR, NOT
SELECT * FROM productos
WHERE (precio > 100 OR stock > 50)
  AND NOT categoria_id = 3;`}
				/>
			</Section>
		</div>
	)
}

function IntermedioContent() {
	return (
		<div className="flex flex-col gap-8">
			<Section title="JOINs — Unión de tablas">
				<CodeBlock
					title="joins.sql"
					code={`-- INNER JOIN: solo filas con coincidencia en ambas tablas
SELECT c.nombre, p.nombre AS pedido, p.total
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id;

-- LEFT JOIN: todos los clientes, aunque no tengan pedidos
SELECT c.nombre, p.total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id;

-- RIGHT JOIN: todos los pedidos, aunque el cliente no exista
SELECT c.nombre, p.total
FROM clientes c
RIGHT JOIN pedidos p ON c.id = p.cliente_id;

-- FULL OUTER JOIN (simulado en MySQL)
SELECT c.nombre, p.total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
UNION
SELECT c.nombre, p.total
FROM clientes c
RIGHT JOIN pedidos p ON c.id = p.cliente_id;

-- CROSS JOIN: producto cartesiano (todas las combinaciones)
SELECT c.nombre, pr.nombre
FROM clientes c
CROSS JOIN productos pr;

-- SELF JOIN: unir una tabla consigo misma
SELECT e.nombre AS empleado, m.nombre AS manager
FROM empleados e
LEFT JOIN empleados m ON e.manager_id = m.id;`}
				/>
				<CodeBlock
					title="Resumen visual de JOINs"
					code={`  A ∩ B          A                B             A ∪ B
 ┌───┐        ┌───┐           ┌───┐          ┌───┐
 │ █ │        │██ │           │ ██│          │███│
 └───┘        └───┘           └───┘          └───┘
INNER JOIN   LEFT JOIN     RIGHT JOIN    FULL OUTER JOIN

A = tabla izquierda    B = tabla derecha    █ = filas incluidas`}
				/>
			</Section>

			<Section title="GROUP BY + Funciones Agregadoras">
				<CodeBlock
					title="group_by.sql"
					code={`-- Contar clientes por ciudad
SELECT ciudad, COUNT(*) AS total_clientes
FROM clientes
GROUP BY ciudad;

-- Suma de ventas por producto
SELECT producto_id, SUM(cantidad * precio) AS total_ventas
FROM detalle_pedidos
GROUP BY producto_id;

-- Promedio de precios por categoría
SELECT categoria_id, AVG(precio) AS precio_promedio
FROM productos
GROUP BY categoria_id;

-- Mínimo y máximo
SELECT categoria_id, MIN(precio) AS menor, MAX(precio) AS mayor
FROM productos
GROUP BY categoria_id;

-- HAVING: filtrar después de agrupar
SELECT ciudad, COUNT(*) AS total
FROM clientes
GROUP BY ciudad
HAVING COUNT(*) > 5;`}
				/>
				<CheatTable
					headers={['Función', 'Descripción']}
					rows={[
						['COUNT(*)', 'Cuenta el número de filas'],
						['COUNT(col)', 'Cuenta valores no nulos de la columna'],
						['SUM(col)', 'Suma los valores de la columna'],
						['AVG(col)', 'Promedio de los valores'],
						['MIN(col)', 'Valor mínimo'],
						['MAX(col)', 'Valor máximo'],
					]}
				/>
				<Note>Regla: toda columna en SELECT que no sea agregada debe estar en GROUP BY.</Note>
			</Section>

			<Section title="Subqueries (Subconsultas)">
				<p className="text-stone-400 text-sm">Datos de ejemplo:</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div>
						<p className="text-stone-500 text-xs font-mono mb-1">productos</p>
						<CheatTable
							headers={['id', 'nombre', 'precio']}
							rows={[
								['1', 'Pollo Frito', '8990'],
								['2', 'Combo Gus', '12990'],
								['3', 'Nuggets', '5990'],
								['4', 'Curly Fries', '3490'],
							]}
						/>
					</div>
					<div>
						<p className="text-stone-500 text-xs font-mono mb-1">ventas</p>
						<CheatTable
							headers={['producto_id', 'cantidad']}
							rows={[
								['1', '15'],
								['1', '8'],
								['3', '6'],
							]}
						/>
					</div>
				</div>
				<CodeBlock
					title="subqueries.sql"
					code={`-- IN: productos que tienen al menos una venta
SELECT nombre FROM productos
WHERE id IN (SELECT producto_id FROM ventas);
-- Resultado: Pollo Frito, Nuggets (id 1 y 3 aparecen en ventas)

-- Escalar: productos con precio sobre el promedio
SELECT nombre, precio FROM productos
WHERE precio > (SELECT AVG(precio) FROM productos);
-- AVG = (8990+12990+5990+3490)/4 = 7865
-- Resultado: Pollo Frito (8990), Combo Gus (12990)

-- FROM (tabla derivada): siempre necesita alias
SELECT producto_id, total
FROM (
    SELECT producto_id, SUM(cantidad) AS total
    FROM ventas
    GROUP BY producto_id
) AS resumen              -- alias obligatorio
WHERE total > 10;
-- Resultado: producto_id=1, total=23

-- EXISTS: clientes con al menos un pedido
SELECT nombre FROM clientes c
WHERE EXISTS (
    SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id
);`}
				/>
			</Section>

			<Section title="CASE WHEN — Condicionales">
				<p className="text-stone-400 text-sm">Entrada:</p>
				<CheatTable
					headers={['nombre', 'precio']}
					rows={[
						['Pollo Frito', '8990'],
						['Batido Azul', '2990'],
						['Combo Gus', '12990'],
						['Curly Fries', '3490'],
					]}
				/>
				<CodeBlock
					title="case_when.sql"
					code={`-- Clasificar productos por rango de precio
SELECT nombre, precio,
    CASE
        WHEN precio < 3000  THEN 'Económico'
        WHEN precio < 9000  THEN 'Estándar'
        ELSE 'Premium'
    END AS rango
FROM productos;`}
				/>
				<p className="text-stone-400 text-sm">Resultado:</p>
				<CheatTable
					headers={['nombre', 'precio', 'rango']}
					rows={[
						['Pollo Frito', '8990', 'Estándar'],
						['Batido Azul', '2990', 'Económico'],
						['Combo Gus', '12990', 'Premium'],
						['Curly Fries', '3490', 'Estándar'],
					]}
				/>
				<CodeBlock
					title="case_en_group_by.sql"
					code={`-- CASE dentro de GROUP BY para crear reportes
SELECT
    CASE
        WHEN precio < 5000  THEN 'Bajo'
        WHEN precio < 10000 THEN 'Medio'
        ELSE 'Alto'
    END AS segmento,
    COUNT(*) AS cantidad,
    AVG(precio) AS precio_promedio
FROM productos
GROUP BY segmento;`}
				/>
			</Section>

			<Section title="Manejo de NULLs">
				<CodeBlock
					title="nulls.sql"
					code={`-- COALESCE: retorna el primer valor no nulo
SELECT nombre, COALESCE(telefono, email, 'Sin contacto') AS contacto
FROM clientes;

-- NULLIF: retorna NULL si ambos valores son iguales
SELECT NULLIF(precio, 0) AS precio_o_null
FROM productos;

-- IFNULL: reemplaza NULL con un valor (específico de MySQL)
SELECT nombre, IFNULL(telefono, 'N/A') AS telefono
FROM clientes;`}
				/>
			</Section>

			<Section title="Operadores de Conjunto">
				<CodeBlock
					title="set_operators.sql"
					code={`-- UNION: combina resultados y elimina duplicados
SELECT nombre, email FROM clientes
UNION
SELECT nombre, email FROM proveedores;

-- UNION ALL: combina resultados sin eliminar duplicados (más rápido)
SELECT nombre, email FROM clientes
UNION ALL
SELECT nombre, email FROM proveedores;`}
				/>
			</Section>

			<Section title="Funciones de Texto y Fecha">
				<CodeBlock
					title="funciones_texto.sql"
					code={`-- Texto
SELECT UPPER('hola mundo');               -- HOLA MUNDO
SELECT LOWER('HOLA MUNDO');               -- hola mundo
SELECT CONCAT(nombre, ' ', apellido)      -- Ana López
    FROM clientes;
SELECT LENGTH('MySQL');                    -- 5
SELECT TRIM('  hola  ');                   -- hola
SELECT SUBSTRING('MySQL rocks', 1, 5);    -- MySQL
SELECT REPLACE('foo-bar', '-', '_');       -- foo_bar`}
				/>
				<CodeBlock
					title="funciones_fecha.sql"
					code={`-- Fecha y hora
SELECT NOW();                              -- 2024-03-15 14:30:00
SELECT CURDATE();                          -- 2024-03-15
SELECT YEAR(NOW());                        -- 2024
SELECT MONTH(NOW());                       -- 3
SELECT DATEDIFF('2024-12-31', '2024-01-01'); -- 365
SELECT DATE_FORMAT(NOW(), '%d/%m/%Y');     -- 15/03/2024`}
				/>
			</Section>
		</div>
	)
}

function AvanzadoContent() {
	return (
		<div className="flex flex-col gap-8">
			<Section title="Funciones de Ventana (Window Functions)">
				<Note>A diferencia de GROUP BY, las funciones de ventana no colapsan filas — cada fila mantiene su identidad.</Note>
				<p className="text-stone-400 text-sm">Datos de ejemplo:</p>
				<CheatTable
					headers={['nombre', 'depto', 'salario']}
					rows={[
						['Ana', 'Ventas', '3000'],
						['Luis', 'Ventas', '3500'],
						['María', 'Ventas', '3500'],
						['Pedro', 'IT', '4000'],
						['Sofía', 'IT', '4500'],
					]}
				/>
				<CodeBlock
					title="window_functions.sql"
					code={`-- ROW_NUMBER: número secuencial (sin empates)
SELECT nombre, depto, salario,
    ROW_NUMBER() OVER (PARTITION BY depto ORDER BY salario DESC) AS rn
FROM empleados;
-- Ana: Ventas, rn=3 | Luis: Ventas, rn=1 o 2 | María: Ventas, rn=1 o 2
-- Pedro: IT, rn=2 | Sofía: IT, rn=1

-- RANK vs DENSE_RANK (con empates)
SELECT nombre, salario,
    RANK()       OVER (ORDER BY salario DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salario DESC) AS dense
FROM empleados;
-- Sofía:4500 → rank=1, dense=1
-- Pedro:4000 → rank=2, dense=2
-- Luis:3500  → rank=3, dense=3
-- María:3500 → rank=3, dense=3  (empate: mismo rank)
-- Ana:3000   → rank=5, dense=4  (RANK salta al 5, DENSE_RANK sigue en 4)

-- ROW_NUMBER: número secuencial por partición
SELECT nombre, departamento,
    ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) AS ranking
FROM empleados;

-- RANK: ranking con huecos en caso de empate
SELECT nombre, salario,
    RANK() OVER (ORDER BY salario DESC) AS ranking
FROM empleados;

-- DENSE_RANK: ranking sin huecos en empates
SELECT nombre, salario,
    DENSE_RANK() OVER (ORDER BY salario DESC) AS ranking
FROM empleados;

-- SUM acumulativo
SELECT fecha, monto,
    SUM(monto) OVER (ORDER BY fecha) AS total_acumulado
FROM ventas;

-- AVG por partición
SELECT nombre, departamento, salario,
    AVG(salario) OVER (PARTITION BY departamento) AS avg_depto
FROM empleados;

-- LAG / LEAD: acceder a filas anteriores / siguientes
SELECT fecha, monto,
    LAG(monto, 1)  OVER (ORDER BY fecha) AS venta_anterior,
    LEAD(monto, 1) OVER (ORDER BY fecha) AS venta_siguiente
FROM ventas;`}
				/>
			</Section>

			<Section title="Vistas (VIEWS)">
				<CodeBlock
					title="views.sql"
					code={`-- Crear una vista
CREATE VIEW clientes_activos AS
SELECT c.id, c.nombre, c.email, COUNT(p.id) AS total_pedidos
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre, c.email
HAVING COUNT(p.id) > 0;

-- Usar la vista como si fuera una tabla
SELECT * FROM clientes_activos WHERE total_pedidos > 5;

-- Eliminar la vista
DROP VIEW clientes_activos;`}
				/>
			</Section>

			<Section title="Índices">
				<CodeBlock
					title="indices.sql"
					code={`-- Índice simple
CREATE INDEX idx_clientes_ciudad ON clientes(ciudad);

-- Índice compuesto
CREATE INDEX idx_pedidos_cliente_fecha ON pedidos(cliente_id, fecha);

-- Índice único
CREATE UNIQUE INDEX idx_clientes_email ON clientes(email);

-- Ver índices de una tabla
SHOW INDEX FROM clientes;

-- Eliminar índice
DROP INDEX idx_clientes_ciudad ON clientes;`}
				/>
				<Note>Los índices aceleran SELECT pero ralentizan INSERT/UPDATE/DELETE.</Note>
			</Section>

			<Section title="Transacciones">
				<CodeBlock
					title="transacciones.sql"
					code={`-- Transacción básica
START TRANSACTION;

UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;

-- Si todo va bien
COMMIT;

-- Si algo falla
ROLLBACK;

-- SAVEPOINT: punto de guardado intermedio
START TRANSACTION;

INSERT INTO pedidos (cliente_id, total) VALUES (1, 200);
SAVEPOINT despues_pedido;

INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad) VALUES (1, 5, 3);
-- Oops, algo salió mal en el detalle
ROLLBACK TO despues_pedido;

-- El pedido sigue insertado, solo se deshizo el detalle
COMMIT;`}
				/>
			</Section>

			<Section title="CTEs — Common Table Expressions">
				<Note>Un CTE es una "tabla temporal" definida al inicio de la query con WITH. Más legible que subconsultas anidadas.</Note>
				<CodeBlock
					title="cte_paso_a_paso.sql"
					code={`-- Paso 1: el CTE calcula una tabla intermedia
WITH ventas_por_empleado AS (
    -- Esta subconsulta produce:
    -- | empleado_id | total_vendido |
    -- |      1      |      28       |
    -- |      3      |      37       |
    -- |      5      |       2       |
    SELECT id_empleado AS empleado_id,
           SUM(cantidad) AS total_vendido
    FROM venta
    GROUP BY id_empleado
)
-- Paso 2: usamos el CTE como si fuera una tabla
SELECT e.alias, vpe.total_vendido
FROM empleado e
JOIN ventas_por_empleado vpe ON e.id_empleado = vpe.empleado_id
WHERE vpe.total_vendido > 20
ORDER BY vpe.total_vendido DESC;
-- Resultado final:
-- | alias          | total_vendido |
-- | The Chicken Man|      37       |
-- | Heisenberg     |      28       |`}
				/>
				<CodeBlock
					title="cte_multiples.sql"
					code={`-- Múltiples CTEs separados por coma
WITH
productos_caros AS (
    SELECT * FROM producto WHERE precio > 5000
),
ventas_de_caros AS (
    SELECT v.id_empleado, SUM(v.cantidad) AS unidades
    FROM venta v
    JOIN productos_caros pc ON v.id_producto = pc.id_producto
    GROUP BY v.id_empleado
)
SELECT e.alias, vc.unidades
FROM empleado e
JOIN ventas_de_caros vc ON e.id_empleado = vc.id_empleado;`}
				/>
			</Section>

			<Section title="Procedimientos Almacenados">
				<CodeBlock
					title="procedures.sql"
					code={`-- Procedimiento con parámetro IN
DELIMITER //
CREATE PROCEDURE buscar_productos_por_tipo(IN p_tipo_id INT)
BEGIN
    SELECT p.nombre, p.precio, tp.nombre AS tipo
    FROM producto p
    JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo
    WHERE p.id_tipo = p_tipo_id
    ORDER BY p.precio DESC;
END //
DELIMITER ;

-- Ejecutar:
CALL buscar_productos_por_tipo(1);
-- Resultado (tipo 1 = Pollo):
-- | nombre           | precio  | tipo   |
-- | Combo Gus        | 12990   | Pollo  |
-- | Pollo Frito      | 8990    | Pollo  |
-- | Nuggets          | 5990    | Pollo  |

-- Procedimiento con parámetro OUT
DELIMITER //
CREATE PROCEDURE total_ventas_empleado(
    IN p_empleado_id INT,
    OUT p_total INT
)
BEGIN
    SELECT COALESCE(SUM(cantidad), 0) INTO p_total
    FROM venta
    WHERE id_empleado = p_empleado_id;
END //
DELIMITER ;

-- Ejecutar:
CALL total_ventas_empleado(1, @total);
SELECT @total;    -- 28 (Heisenberg vendió 15+8+5 unidades)`}
				/>
				<Note>DELIMITER cambia el delimitador de fin de sentencia (de ; a //) para que MySQL no corte el procedimiento en el primer ;. Al final se restaura con DELIMITER ;.</Note>
			</Section>

			<Section title="Orden de ejecución lógico de un SELECT">
				<div className="flex flex-col gap-2 text-sm text-stone-300 font-mono bg-stone-900 rounded-md border border-stone-700 p-4">
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">1.</span> FROM — tablas origen</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">2.</span> JOIN — uniones entre tablas</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">3.</span> WHERE — filtro de filas</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">4.</span> GROUP BY — agrupación</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">5.</span> HAVING — filtro de grupos</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">6.</span> SELECT — selección de columnas</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">7.</span> DISTINCT — eliminación de duplicados</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">8.</span> ORDER BY — ordenamiento</div>
					<div className="flex items-center gap-2"><span className="text-amber-400 font-semibold w-6 text-right">9.</span> LIMIT — limitación de resultados</div>
				</div>
				<Note type="warning">Por esto los alias definidos en SELECT no se pueden usar en WHERE — WHERE se ejecuta antes.</Note>
			</Section>

			<Section title="Referencia rápida: WHERE vs HAVING">
				<CheatTable
					headers={['', 'WHERE', 'HAVING']}
					rows={[
						['Cuándo filtra', 'Antes de agrupar', 'Después de agrupar'],
						['Sobre qué', 'Filas individuales', 'Grupos de filas'],
						['Puede usar funciones agregadas', 'No', 'Sí'],
					]}
				/>
				<CodeBlock
					title="where_vs_having.sql"
					code={`-- WHERE filtra filas antes de agrupar
-- HAVING filtra grupos después de agrupar
SELECT ciudad, COUNT(*) AS total
FROM clientes
WHERE activo = TRUE        -- filtra filas: solo clientes activos
GROUP BY ciudad
HAVING COUNT(*) > 10;      -- filtra grupos: ciudades con más de 10`}
				/>
			</Section>
		</div>
	)
}

export default function SqlCheatsheet() {
	const [level, setLevel] = useState<'basico' | 'intermedio' | 'avanzado'>('basico')

	const tabs = [
		{ key: 'basico' as const, label: 'Básico', color: 'bg-green-600' },
		{ key: 'intermedio' as const, label: 'Intermedio', color: 'bg-amber-600' },
		{ key: 'avanzado' as const, label: 'Avanzado', color: 'bg-red-600' },
	]

	return (
		<div className="min-h-screen bg-stone-950 text-stone-100">
			<div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
				{/* Breadcrumb + Title */}
				<div className="flex flex-col gap-2">
					<p className="text-sm text-stone-500 font-mono">
						Cheatsheets <span className="text-stone-600">{'>'}</span> SQL Cheatsheet
					</p>
					<h1 className="font-serif text-3xl font-bold text-amber-400">SQL MySQL — Cheatsheet</h1>
				</div>

				{/* Level Tabs */}
				<div className="flex gap-2 border-b border-stone-800 pb-3">
					{tabs.map(tab => (
						<button
							key={tab.key}
							onClick={() => setLevel(tab.key)}
							className={`flex items-center gap-2 px-4 py-2 rounded-t-md text-sm font-semibold transition-colors ${
								level === tab.key
									? 'bg-stone-900 text-stone-100 border border-stone-700 border-b-stone-950'
									: 'text-stone-500 hover:text-stone-300 hover:bg-stone-900/50'
							}`}
						>
							{tab.label}
							<span className={`${tab.color} text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold`}>
								{tab.key === 'basico' ? '1' : tab.key === 'intermedio' ? '2' : '3'}
							</span>
						</button>
					))}
				</div>

				{/* Content */}
				{level === 'basico' && <BasicoContent />}
				{level === 'intermedio' && <IntermedioContent />}
				{level === 'avanzado' && <AvanzadoContent />}
			</div>
		</div>
	)
}
