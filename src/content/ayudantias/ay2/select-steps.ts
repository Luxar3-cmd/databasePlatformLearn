export interface SelectStep {
	id: string
	title: string
	concept: string
	question: string
	sql: string
	hints: string[]
	expectedRowCount: number
	explanation: string
	transferTip: string
	initialQuery?: string
}

export const SELECT_STEPS: SelectStep[] = [
	{
		id: 'select-where-order',
		title: 'SELECT + WHERE + ORDER BY',
		concept: 'Filtrar y ordenar',
		question: 'Listar todos los productos con precio mayor a 5000, ordenados de mas caro a mas barato.',
		sql: `SELECT nombre, precio
FROM producto
WHERE precio > 5000
ORDER BY precio DESC`,
		hints: [
			'Filtra con WHERE precio > 5000. Ordena con ORDER BY.',
			'Necesitas nombre y precio. Ordena de mayor a menor con DESC.',
			'SELECT nombre, precio FROM producto WHERE ___ ORDER BY ___ DESC',
		],
		expectedRowCount: 3,
		explanation:
			'WHERE filtra filas que cumplan una condicion. ORDER BY ordena el resultado por una o mas columnas; DESC invierte el orden (de mayor a menor).',
		transferTip:
			'Cuando necesites filtrar registros por precio, estado o fecha y ordenar resultados, usa exactamente este patron.',
		initialQuery: `SELECT nombre, precio\nFROM producto\nWHERE `,
	},
	{
		id: 'inner-join-2',
		title: 'INNER JOIN (2 tablas)',
		concept: 'JOIN basico',
		question: 'Lo mismo, pero mostrando el nombre del tipo de producto en vez del id_tipo.',
		sql: `SELECT p.nombre, tp.nombre AS tipo, p.precio
FROM producto p
INNER JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo
WHERE p.precio > 5000
ORDER BY p.precio DESC`,
		hints: [
			'Usa INNER JOIN con tipo_producto. Conecta por id_tipo.',
			'Alias: producto p, tipo_producto tp. El JOIN reemplaza el id por el nombre.',
			'SELECT p.nombre, tp.nombre AS tipo, p.precio FROM producto p INNER JOIN tipo_producto tp ON p.___ = tp.___',
		],
		expectedRowCount: 3,
		explanation:
			'INNER JOIN conecta dos tablas usando una columna en comun (tipicamente PK-FK). Solo retorna filas donde existe coincidencia en ambas tablas. Los alias (p, tp) hacen la consulta mas legible.',
		transferTip:
			'Cada vez que necesites reemplazar un id numerico por un nombre legible, usaras un INNER JOIN con la tabla catalogo correspondiente.',
		initialQuery: `SELECT p.nombre, tp.nombre AS tipo, p.precio\nFROM producto p\nINNER JOIN `,
	},
	{
		id: 'inner-join-multi',
		title: 'INNER JOIN (3+ tablas)',
		concept: 'Multi-JOIN',
		question: 'Ver nombre del producto, tipo, local y ciudad — todo con nombres legibles.',
		sql: `SELECT p.nombre AS producto, tp.nombre AS tipo, l.nombre AS local, l.ciudad, p.precio
FROM producto p
INNER JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo
INNER JOIN local l ON p.id_local = l.id_local
ORDER BY p.precio DESC`,
		hints: [
			'Encadena 2 INNER JOIN: tipo_producto y local.',
			'Cada JOIN conecta por su FK (id_tipo, id_local).',
			'FROM producto p INNER JOIN tipo_producto tp ON ... INNER JOIN local l ON ...',
		],
		expectedRowCount: 8,
		explanation:
			'Puedes encadenar multiples INNER JOIN en una sola consulta. Cada JOIN agrega columnas de una tabla adicional. El orden de los JOINs no afecta el resultado.',
		transferTip:
			'Cuando necesites combinar una entidad principal con multiples catalogos en una sola consulta, es exactamente este patron de multi-JOIN.',
		initialQuery: `SELECT p.nombre AS producto, tp.nombre AS tipo,\n       l.nombre AS local, l.ciudad, p.precio\nFROM producto p\nINNER JOIN tipo_producto tp ON `,
	},
	{
		id: 'count-group',
		title: 'COUNT + GROUP BY',
		concept: 'Agrupar y contar',
		question: 'Cuantos productos hay por cada tipo?',
		sql: `SELECT tp.nombre AS tipo, COUNT(*) AS total_productos
FROM producto p
INNER JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo
GROUP BY tp.nombre`,
		hints: [
			'Agrupa por nombre del tipo con GROUP BY. Cuenta con COUNT(*).',
			'Todo lo que aparece en SELECT y no es funcion de agregacion debe estar en GROUP BY.',
			'SELECT tp.nombre AS tipo, COUNT(*) AS total_productos FROM producto p INNER JOIN tipo_producto tp ON ... GROUP BY ___',
		],
		expectedRowCount: 4,
		explanation:
			'GROUP BY agrupa filas con el mismo valor en la(s) columna(s) indicada(s). Las funciones de agregacion como COUNT(*) operan sobre cada grupo. Todo lo que aparece en SELECT y no es funcion de agregacion debe estar en GROUP BY.',
		transferTip:
			'Cuando te pidan "cuantos X por cada Y", piensa en COUNT + GROUP BY. Es el patron mas comun en reportes.',
		initialQuery: `SELECT tp.nombre AS tipo, COUNT(*) AS total_productos\nFROM producto p\nINNER JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo\nGROUP BY `,
	},
	{
		id: 'count-group-having',
		title: 'COUNT + GROUP BY + HAVING',
		concept: 'Filtrar grupos',
		question: 'Que empleados han realizado menos de 3 ventas?',
		sql: `SELECT e.alias, COUNT(*) AS total_ventas
FROM venta v
INNER JOIN empleado e ON v.id_empleado = e.id_empleado
GROUP BY e.alias
HAVING COUNT(*) < 3`,
		hints: [
			'Agrupa por alias del empleado. Filtra grupos con HAVING.',
			'WHERE filtra filas antes de agrupar. HAVING filtra grupos despues.',
			'Necesitas JOIN venta con empleado. Agrupa por e.alias. HAVING COUNT(*) < 3',
		],
		expectedRowCount: 4,
		explanation:
			'HAVING es el WHERE de los grupos. WHERE filtra filas antes de agrupar; HAVING filtra grupos despues de agrupar. Solo HAVING puede usar funciones de agregacion.',
		transferTip:
			'Cuando te pidan "mostrar solo los que tengan mas/menos de N", necesitas HAVING despues del GROUP BY.',
		initialQuery: `SELECT e.alias, COUNT(*) AS total_ventas\nFROM venta v\nINNER JOIN empleado e ON v.id_empleado = e.id_empleado\nGROUP BY e.alias\nHAVING `,
	},
	{
		id: 'subquery-where',
		title: 'Subconsulta en WHERE',
		concept: 'Subconsulta',
		question: 'Que productos tienen un precio mayor al promedio?',
		sql: `SELECT nombre, precio
FROM producto
WHERE precio > (SELECT AVG(precio) FROM producto)
ORDER BY precio DESC`,
		hints: [
			'Usa una subconsulta con AVG() dentro del WHERE.',
			'La subconsulta (SELECT AVG(precio) FROM producto) calcula el promedio.',
			'SELECT nombre, precio FROM producto WHERE precio > (SELECT ___(___) FROM ___) ORDER BY ...',
		],
		expectedRowCount: 3,
		explanation:
			'Una subconsulta es un SELECT dentro de otro SELECT. Cuando retorna un solo valor (escalar), se puede usar directamente en WHERE con operadores de comparacion. AVG() calcula el promedio.',
		transferTip:
			'Las subconsultas son utiles cuando necesitas comparar contra un valor calculado del mismo u otro conjunto de datos.',
		initialQuery: `SELECT nombre, precio\nFROM producto\nWHERE precio > (SELECT `,
	},
	{
		id: 'left-join-null',
		title: 'LEFT JOIN + IS NULL',
		concept: 'Encontrar ausencias',
		question: 'Que empleados no tienen ninguna venta registrada?',
		sql: `SELECT e.alias, e.cargo
FROM empleado e
LEFT JOIN venta v ON e.id_empleado = v.id_empleado
WHERE v.id_empleado IS NULL`,
		hints: [
			'Usa LEFT JOIN en vez de INNER JOIN. Filtra con IS NULL.',
			'LEFT JOIN conserva las filas sin coincidencia (rellenando con NULL).',
			'FROM empleado e LEFT JOIN venta v ON ... WHERE v.___ IS NULL',
		],
		expectedRowCount: 2,
		explanation:
			'LEFT JOIN retorna todas las filas de la tabla izquierda, incluso si no tienen coincidencia en la derecha (rellena con NULL). Combinado con WHERE ... IS NULL, encuentra registros sin relacion: el patron clasico para "encontrar lo que falta".',
		transferTip:
			'Cuando necesites encontrar registros sin relacion (ej: "empleados sin ventas", "clientes sin pedidos"), este es el patron exacto.',
		initialQuery: `SELECT e.alias, e.cargo\nFROM empleado e\nLEFT JOIN venta v ON `,
	},
	{
		id: 'sum-group-having',
		title: 'SUM + GROUP BY + HAVING',
		concept: 'Sumar y filtrar',
		question: 'Que empleados han vendido mas de 20 unidades en total?',
		sql: `SELECT e.alias, SUM(v.cantidad) AS total_vendido
FROM venta v
INNER JOIN empleado e ON v.id_empleado = e.id_empleado
GROUP BY e.alias
HAVING SUM(v.cantidad) > 20`,
		hints: [
			'Suma con SUM(v.cantidad). Filtra con HAVING.',
			'Necesitas JOIN venta con empleado. Agrupa por alias.',
			'HAVING SUM(v.cantidad) > 20 filtra los que superan el umbral.',
		],
		expectedRowCount: 2,
		explanation:
			'SUM() suma los valores de una columna dentro de cada grupo. Puedes combinar multiples funciones de agregacion (COUNT, SUM, AVG, etc.) en un mismo SELECT y filtrar con HAVING sobre cualquiera de ellas.',
		transferTip:
			'Cuando necesites totales acumulados por grupo con un umbral minimo/maximo, combina SUM + GROUP BY + HAVING.',
		initialQuery: `SELECT e.alias, SUM(v.cantidad) AS total_vendido\nFROM venta v\nINNER JOIN empleado e ON v.id_empleado = e.id_empleado\nGROUP BY e.alias\nHAVING `,
	},
]
