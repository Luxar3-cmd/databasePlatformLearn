export interface FlipCardData {
	id: string
	name: string
	question: string
	definition: string
	example: string
	icon: string
}

export const SEMANTICS_CARDS: FlipCardData[] = [
	{
		id: 'cardinalidad',
		name: 'Cardinalidad',
		question: '¿Cuántas entidades se relacionan entre sí?',
		definition: 'Define el número de instancias que participan en una asociación (1:1, 1:N, M:N)',
		example: 'Local tiene 1..N productos. Un producto pertenece a exactamente 1 local',
		icon: '#',
	},
	{
		id: 'grado',
		name: 'Grado',
		question: '¿Cuántos tipos de entidades participan?',
		definition: 'El número de tipos de entidad involucrados en una asociación: unaria (1), binaria (2), ternaria (3)',
		example: 'Unaria: Empleado "supervisa a" Empleado. Binaria: Empleado-Producto (venta). Ternaria: Empleado-Producto-Local',
		icon: 'N',
	},
	{
		id: 'dependencia-existencial',
		name: 'Dependencia Existencial',
		question: '¿Puede existir X sin Y?',
		definition: 'Una entidad débil no puede existir sin su entidad fuerte. Se implementa con FK obligatoria + PK compuesta',
		example: 'Venta no existe sin Empleado ni Producto → entidad débil. Su PK incluye id_empleado e id_producto como FK',
		icon: '?',
	},
	{
		id: 'tiempo',
		name: 'Tiempo',
		question: '¿Cuándo se puede insertar/modificar?',
		definition: 'Restricciones sobre cuándo los datos pueden crearse o modificarse (temporalidad)',
		example: '¿Se puede registrar una venta con fecha futura? Restricción temporal sobre INSERT',
		icon: 'T',
	},
	{
		id: 'unicidad',
		name: 'Unicidad',
		question: '¿Qué identifica unívocamente a cada entidad?',
		definition: 'Determina los atributos que identifican de forma única cada instancia: PK, UNIQUE, llaves candidatas',
		example: 'Alias identifica al empleado. Nombre identifica al local. Ambos llevan UNIQUE constraint',
		icon: '!',
	},
	{
		id: 'herencia',
		name: 'Herencia',
		question: '¿Hay tipos/subtipos (IS-A)?',
		definition: 'Generalización/especialización: una superclase con atributos comunes y subclases con atributos propios',
		example: 'Persona → {Empleado, Gerente, Proveedor}. Persona tiene nombre y RUT. Empleado tiene alias adicional',
		icon: '^',
	},
	{
		id: 'categorizacion',
		name: 'Categorización',
		question: '¿Herencia selectiva?',
		definition: 'Similar a herencia pero una entidad elige de qué superclase hereda (herencia selectiva, interfaces)',
		example: 'Un Producto puede categorizarse como Pollo, Acompañamiento, Bebida o Postre, con atributos diferentes según tipo',
		icon: 'C',
	},
	{
		id: 'agregacion',
		name: 'Agregación',
		question: '¿X es parte de Y (IS-PART-OF)?',
		definition: 'Una entidad es componente de otra. Composición: si el todo se destruye, las partes también. Agregación: las partes sobreviven',
		example: 'Productos son parte del Menú del Local (agregación). Si el local cierra, los productos pueden ofrecerse en otro local',
		icon: '+',
	},
]
