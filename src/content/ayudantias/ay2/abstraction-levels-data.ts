export interface AbstractionLevel {
	id: string
	name: string
	subtitle: string
	description: string
	example: string
	color: string
}

export const ABSTRACTION_LEVELS: AbstractionLevel[] = [
	{
		id: 'realidad',
		name: 'Realidad',
		subtitle: 'Tipos de Entidades',
		description: 'Lo que observamos en el mundo real: personas, objetos, lugares, eventos y sus relaciones',
		example: 'Existen "productos" y "locales". Un producto "se ofrece en" un local. Un empleado "realiza" ventas de productos.',
		color: 'green',
	},
	{
		id: 'diccionario',
		name: 'Diccionario de Datos',
		subtitle: 'Definiciones de Registros (Metadatos)',
		description: 'Las entidades se convierten en definiciones formales: nombres de campos, tipos, restricciones (DDL)',
		example: 'producto(id_producto INT PK, nombre VARCHAR(100) NOT NULL, precio DECIMAL(8,2), id_tipo INT FK, id_local INT FK)',
		color: 'blue',
	},
	{
		id: 'base-de-datos',
		name: 'Base de Datos',
		subtitle: 'Ocurrencias de Registros (Valores)',
		description: 'Las definiciones se llenan con datos concretos: filas en tablas, valores reales',
		example: "(1, 'Pollo Frito Original', 8990.00, 1, 1)",
		color: 'amber',
	},
]

export interface AssociationType {
	name: string
	cardinality: string
	example: string
	reading: string
}

export const ASSOCIATION_TYPES: AssociationType[] = [
	{
		name: 'Una',
		cardinality: '1:1',
		example: 'Local ↔ Licencia de Operación',
		reading: 'Un local tiene exactamente una licencia',
	},
	{
		name: 'Muchas',
		cardinality: '1:N',
		example: 'Local → Productos',
		reading: 'Un local tiene muchos productos',
	},
	{
		name: 'Condicional',
		cardinality: '0..1',
		example: 'Empleado → Supervisor',
		reading: 'Un empleado puede no tener supervisor',
	},
	{
		name: 'Bidireccional',
		cardinality: 'M:N',
		example: 'Empleado ↔ Producto (vía venta)',
		reading: 'Muchos empleados venden muchos productos',
	},
	{
		name: 'Recursiva',
		cardinality: '1:N (self)',
		example: 'Empleado supervisa a Empleado',
		reading: 'Un empleado puede supervisar a otro',
	},
	{
		name: 'Múltiple',
		cardinality: 'N:M + 1:N',
		example: 'Empleado-Local con dos asociaciones',
		reading: '"trabaja en" y "es gerente de"',
	},
]
