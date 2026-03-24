import { useState } from 'react'
import { ChevronDown, ChevronRight, CheckSquare, Square } from 'lucide-react'
import { Callout } from '@/components/ui/Callout'

interface CheckItem {
	id: number
	title: string
	description: string
	severity: 'critical' | 'important' | 'recommended'
}

const CHECKLIST: CheckItem[] = [
	{
		id: 1,
		title: '¿Pusiste ENGINE=InnoDB en todas las tablas?',
		description: 'Sin esto, MySQL no crea las FK y no te avisa. Es el motor por defecto en versiones recientes, pero la rúbrica lo pide explícito.',
		severity: 'important',
	},
	{
		id: 2,
		title: '¿Insertaste los catálogos primero?',
		description: 'Orden: catálogos -> padres -> hijos -> intersección. Si insertas un hijo antes del padre, MySQL rechaza la FK.',
		severity: 'recommended',
	},
	{
		id: 3,
		title: '¿Usaste WHERE o HAVING correctamente?',
		description: 'WHERE filtra filas individuales (ANTES del GROUP BY). HAVING filtra grupos (DESPUÉS). Mezclarlos es un error frecuente.',
		severity: 'important',
	},
	{
		id: 4,
		title: '¿Comentaste cada consulta?',
		description: 'La rúbrica pide explícitamente un comentario breve antes de cada SELECT explicando qué hace y por qué.',
		severity: 'recommended',
	},
	{
		id: 5,
		title: '¿Incluiste evidencia de ejecución?',
		description: 'Capturas de pantalla o SELECT de verificación para demostrar que funciona. Sin evidencia, no hay puntos.',
		severity: 'recommended',
	},
	{
		id: 6,
		title: '¿Los campos obligatorios tienen NOT NULL?',
		description: 'Los campos marcados con (*) en el formulario son obligatorios. Cada uno debe ser NOT NULL en tu DDL.',
		severity: 'important',
	},
	{
		id: 7,
		title: '¿Usaste tablas catálogo en vez de ENUM?',
		description: 'La rúbrica dice "catálogos fijos" como tablas separadas, no como ENUM en la columna. Si usas ENUM pierdes puntos.',
		severity: 'important',
	},
	{
		id: 8,
		title: '¿Tu nombre en Discord es Nombre + Apellido?',
		description: 'Descuento de -20 puntos si tienes apodo o nombre incompleto. Revísalo antes de entregar.',
		severity: 'critical',
	},
	{
		id: 9,
		title: '¿El script DDL corre sin errores?',
		description: 'Si la ejecución del script falla, 0 puntos en ese ítem. Pruébalo en un MySQL limpio (DROP DATABASE + CREATE DATABASE).',
		severity: 'critical',
	},
	{
		id: 10,
		title: '¿Entendiste cada consulta que escribiste?',
		description: 'En la defensa van a pedir que expliques el razonamiento. No basta con que funcione: tienes que saber por qué funciona.',
		severity: 'recommended',
	},
]

const SEVERITY_STYLES = {
	critical: {
		badge: 'bg-red-500/20 text-red-300 border-red-700/50',
		label: 'Crítico',
	},
	important: {
		badge: 'bg-orange-500/20 text-orange-300 border-orange-700/50',
		label: 'Importante',
	},
	recommended: {
		badge: 'bg-blue-500/20 text-blue-300 border-blue-700/50',
		label: 'Recomendado',
	},
}

function ChecklistItem({
	item,
	checked,
	onToggle,
}: {
	item: CheckItem
	checked: boolean
	onToggle: () => void
}) {
	const [expanded, setExpanded] = useState(false)
	const sev = SEVERITY_STYLES[item.severity]

	return (
		<div className={`rounded-lg border bg-stone-900 overflow-hidden transition-colors ${
			checked ? 'border-stone-700/50' : 'border-stone-800'
		}`}>
			<div className="flex items-start gap-3 px-4 py-3">
				<button
					onClick={onToggle}
					className="shrink-0 mt-0.5"
				>
					{checked
						? <CheckSquare size={18} className="text-green-400" />
						: <Square size={18} className="text-stone-600" />
					}
				</button>

				<div className="flex-1 min-w-0">
					<button
						onClick={() => setExpanded(!expanded)}
						className="flex items-center gap-2 w-full text-left"
					>
						<span className={`text-sm font-medium ${checked ? 'text-stone-500 line-through' : 'text-stone-200'}`}>
							{item.title}
						</span>
						<span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold border ${sev.badge}`}>
							{sev.label}
						</span>
						{expanded
							? <ChevronDown size={14} className="text-stone-500 shrink-0 ml-auto" />
							: <ChevronRight size={14} className="text-stone-500 shrink-0 ml-auto" />
						}
					</button>

					{expanded && (
						<p className="text-stone-400 text-xs mt-2 leading-relaxed">
							{item.description}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default function B5Checklist() {
	const [checked, setChecked] = useState<Set<number>>(new Set())

	function toggle(id: number) {
		setChecked(prev => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	const total = CHECKLIST.length
	const done = checked.size
	const pct = Math.round((done / total) * 100)

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h2 className="font-serif text-lg font-semibold text-stone-100 mb-1">
					Checklist Pre-Entrega
				</h2>
				<p className="text-stone-400 text-sm">
					Verifica cada punto antes de entregar tu proyecto. Haz clic en el título para ver detalles.
				</p>
			</div>

			{/* Progress bar */}
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-stone-300 font-medium">
						{done} de {total} verificados
					</span>
					<span className={`font-mono text-xs ${done === total ? 'text-green-400' : 'text-stone-500'}`}>
						{pct}%
					</span>
				</div>
				<div className="h-2 rounded-full bg-stone-800 overflow-hidden">
					<div
						className={`h-full rounded-full transition-all duration-300 ${
							done === total ? 'bg-green-500' : 'bg-amber-500'
						}`}
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>

			{/* Items */}
			<div className="flex flex-col gap-2">
				{CHECKLIST.map(item => (
					<ChecklistItem
						key={item.id}
						item={item}
						checked={checked.has(item.id)}
						onToggle={() => toggle(item.id)}
					/>
				))}
			</div>

			{/* Warning for critical items */}
			<Callout type="warning" title="Penalizaciones graves">
				<ul className="list-disc list-inside space-y-1">
					<li>
						<strong>Nombre en Discord</strong> (item 8): -20 puntos si tu nombre no es Nombre + Apellido completo.
					</li>
					<li>
						<strong>Script DDL sin errores</strong> (item 9): 0 puntos en el ítem si el script falla al ejecutar.
						Pruébalo siempre en una BD limpia.
					</li>
				</ul>
			</Callout>
		</div>
	)
}
