import { useParams } from 'react-router'
import { UNITS } from '@/data/units'
import type { SectionId } from '@/types/content'
import PlaceholderSection from '@/components/ui/PlaceholderSection'

const SECTION_DESCRIPTIONS: Record<SectionId, string> = {
	conceptos: 'Contenido teorico de la unidad con definiciones, tablas comparativas y ejemplos',
	ejercicios: 'Ejercicios practicos resueltos paso a paso',
	'editor-sql': 'Editor SQL interactivo para ejecutar consultas contra una base de datos real',
	quiz: 'Preguntas de seleccion multiple para evaluar tu comprension',
	'cheat-sheet': 'Resumen visual con los conceptos clave de la unidad',
}

export default function SectionPage() {
	const { unitId, section } = useParams<{ unitId: string; section: string }>()

	const unit = UNITS.find((u) => u.id === unitId)
	if (!unit) {
		return (
			<div className="text-zinc-400 p-6">
				<p>Unidad no encontrada</p>
			</div>
		)
	}

	const sectionData = unit.sections.find((s) => s.id === section)
	if (!sectionData) {
		return (
			<div className="text-zinc-400 p-6">
				<p>Seccion no encontrada</p>
			</div>
		)
	}

	return (
		<div>
			<p className="text-zinc-500 text-sm mb-6">
				Unidad {unit.number}: {unit.title}{' '}
				<span className="text-zinc-700">&rsaquo;</span>{' '}
				<span className="text-zinc-400">{sectionData.label}</span>
			</p>
			<PlaceholderSection
				title={sectionData.label}
				description={SECTION_DESCRIPTIONS[sectionData.id as SectionId] ?? 'Contenido proximamente'}
				icon={sectionData.icon}
			/>
		</div>
	)
}
