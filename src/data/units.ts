import type { SectionId } from '@/types/content'

export interface UnitSection {
	id: SectionId
	label: string
	icon: string
}

export interface Unit {
	id: string
	number: number
	title: string
	locked: boolean
	sections: UnitSection[]
}

export const SECTIONS: UnitSection[] = [
	{ id: 'conceptos', label: 'Conceptos', icon: 'BookOpen' },
	{ id: 'ejercicios', label: 'Ejercicios', icon: 'PenTool' },
	{ id: 'editor-sql', label: 'Editor SQL', icon: 'Terminal' },
	{ id: 'quiz', label: 'Quiz', icon: 'CheckSquare' },
	{ id: 'cheat-sheet', label: 'Cheat Sheet', icon: 'FileText' },
]

export const UNITS: Unit[] = [
	{
		id: 'u1',
		number: 1,
		title: 'Introduccion a Bases de Datos',
		locked: false,
		sections: SECTIONS,
	},
	{ id: 'u2', number: 2, title: 'Modelo Entidad-Relacion', locked: true, sections: SECTIONS },
	{ id: 'u3', number: 3, title: 'Modelo Relacional', locked: true, sections: SECTIONS },
	{ id: 'u4', number: 4, title: 'SQL', locked: true, sections: SECTIONS },
	{ id: 'u5', number: 5, title: 'Normalizacion', locked: true, sections: SECTIONS },
	{ id: 'u6', number: 6, title: 'Temas Avanzados', locked: true, sections: SECTIONS },
]

export const SIDEBAR_EXTRA = [
	{ id: 'tareas', label: 'Tareas', icon: 'ClipboardList', locked: true },
	{ id: 'certamenes', label: 'Certamenes', icon: 'FileCheck', locked: true },
	{ id: 'ayudantias', label: 'Ayudantias', icon: 'Users', locked: true },
]
