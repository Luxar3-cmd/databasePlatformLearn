export interface NotationData {
	id: string
	name: string
	year?: string
	description: string
	characteristics: string[]
	elements: { name: string; visual: string; description: string }[]
}

export const NOTATIONS: NotationData[] = [
	{
		id: 'bachmann',
		name: 'Bachmann',
		year: '1969',
		description: 'Rectángulos con flechas, la más simple',
		characteristics: [
			'Rectángulos para entidades',
			'Flechas para asociaciones',
			'No muestra atributos explícitamente',
			'Buena para asociaciones sencillas',
		],
		elements: [
			{ name: 'Rectángulo', visual: '▭', description: 'Entidad' },
			{ name: 'Flecha', visual: '→', description: 'Asociación 1:N' },
			{ name: 'Doble flecha', visual: '⇄', description: 'M:N' },
		],
	},
	{
		id: 'ere',
		name: 'E-R Extendido (E-R-E)',
		description: 'Todo lo anterior + entidades débiles, atributos especiales',
		characteristics: [
			'Doble rectángulo = Entidad débil',
			'Doble rombo = Asociación identificante',
			'Doble óvalo = Atributo multivaluado',
			'Óvalo punteado = Atributo derivado',
			'Cardinalidad con (min,max)',
		],
		elements: [
			{ name: 'Doble rectángulo', visual: '⊞', description: 'Entidad débil' },
			{ name: 'Doble rombo', visual: '◇◇', description: 'Asociación identificante' },
			{ name: 'Doble óvalo', visual: '◯◯', description: 'Multivaluado' },
			{ name: 'Óvalo punteado', visual: '◌', description: 'Derivado' },
		],
	},
	{
		id: 'uml',
		name: 'Diagrama de Clases UML',
		description: 'Clases con compartimentos, multiplicidades explícitas',
		characteristics: [
			'3 compartimentos (nombre | atributos | métodos)',
			'Multiplicidades: 1, 0..1, 1..*, *',
			'Rombo negro = Composición',
			'Rombo blanco = Agregación',
			'Triángulo = Herencia',
		],
		elements: [
			{ name: 'Clase', visual: '▭▭▭', description: '3 compartimentos' },
			{ name: 'Rombo negro', visual: '◆', description: 'Composición' },
			{ name: 'Rombo blanco', visual: '◇', description: 'Agregación' },
			{ name: 'Triángulo', visual: '△', description: 'Herencia (IS-A)' },
		],
	},
]
