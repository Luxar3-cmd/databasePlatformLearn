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
		title: 'Introducción a Bases de Datos',
		locked: false,
		sections: SECTIONS,
	},
	{ id: 'u2', number: 2, title: 'Modelo Entidad-Relación', locked: true, sections: SECTIONS },
	{ id: 'u3', number: 3, title: 'Modelo Relacional', locked: true, sections: SECTIONS },
	{ id: 'u4', number: 4, title: 'SQL', locked: true, sections: SECTIONS },
	{ id: 'u5', number: 5, title: 'Normalización', locked: true, sections: SECTIONS },
	{ id: 'u6', number: 6, title: 'Temas Avanzados', locked: true, sections: SECTIONS },
]

export interface SidebarExtraItem {
	id: string
	label: string
	icon: string
	locked: boolean
	items?: { id: string; label: string; path: string }[]
}

export const SIDEBAR_EXTRA: SidebarExtraItem[] = [
	{
		id: 'cheatsheets',
		label: 'Cheatsheets',
		icon: 'Code',
		locked: false,
		items: [
			{ id: 'sql', label: 'SQL Cheatsheet', path: '/cheatsheet/sql' },
		],
	},
	{ id: 'tareas', label: 'Tareas', icon: 'ClipboardList', locked: true },
	{ id: 'certamenes', label: 'Certámenes', icon: 'FileCheck', locked: true },
	{
		id: 'ayudantias',
		label: 'Ayudantías',
		icon: 'Users',
		locked: false,
		items: [
			{ id: '2', label: 'Ay. 2: Modelos + SQL', path: '/ayudantia/2' },
		],
	},
]
