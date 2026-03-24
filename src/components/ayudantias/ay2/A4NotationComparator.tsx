import { useState } from 'react'
import { Callout } from '@/components/ui/Callout'
import { MermaidDiagram } from '@/components/ui/MermaidDiagram'
import { NOTATIONS } from '@/content/ayudantias/ay2/notations-data'

function BachmannDiagram() {
	return (
		<div className="flex items-center justify-center gap-4 py-6">
			<div className="border-2 border-blue-700/50 bg-blue-950/30 text-blue-300 px-5 py-2.5 rounded text-sm font-mono font-semibold">
				Local
			</div>
			<div className="flex items-center gap-1.5 text-stone-400">
				<span className="text-xs font-mono">1</span>
				<svg width="80" height="20" viewBox="0 0 80 20" className="text-stone-400">
					<line x1="0" y1="10" x2="70" y2="10" stroke="currentColor" strokeWidth="2" />
					<polygon points="70,5 80,10 70,15" fill="currentColor" />
				</svg>
				<span className="text-xs font-mono">N</span>
			</div>
			<div className="border-2 border-blue-700/50 bg-blue-950/30 text-blue-300 px-5 py-2.5 rounded text-sm font-mono font-semibold">
				Producto
			</div>
		</div>
	)
}

function EREDiagram() {
	const code = `erDiagram
    LOCAL ||--o{ PRODUCTO : "ofrece"
    LOCAL {
        int id_local PK
        string nombre
        string ciudad
    }
    PRODUCTO {
        int id_producto PK
        string nombre
        decimal precio
        int id_local FK
    }`
	return <MermaidDiagram code={code} className="py-4 px-2" />
}

function UMLDiagram() {
	const code = `classDiagram
    class Local {
        -id_local: INT
        -nombre: VARCHAR
        -ciudad: VARCHAR
    }
    class Producto {
        -id_producto: INT
        -nombre: VARCHAR
        -precio: DECIMAL
        -id_local: INT
    }
    Local "1" --> "1..*" Producto : ofrece`
	return <MermaidDiagram code={code} className="py-4 px-2" />
}

const DIAGRAMS: Record<string, () => React.ReactElement> = {
	bachmann: BachmannDiagram,
	ere: EREDiagram,
	uml: UMLDiagram,
}

const ELEMENT_ICONS: Record<string, React.ReactElement> = {
	'▭': <svg width="24" height="16" viewBox="0 0 24 16"><rect x="1" y="1" width="22" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
	'⇄': <svg width="24" height="16" viewBox="0 0 24 16"><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5"/><polygon points="6,4 2,8 6,12" fill="currentColor"/><polygon points="18,4 22,8 18,12" fill="currentColor"/></svg>,
	'→': <svg width="24" height="16" viewBox="0 0 24 16"><line x1="2" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5"/><polygon points="17,4 22,8 17,12" fill="currentColor"/></svg>,
	'⊞': <svg width="24" height="16" viewBox="0 0 24 16"><rect x="1" y="1" width="22" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="4" y="4" width="16" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
	'◇◇': <svg width="28" height="16" viewBox="0 0 28 16"><polygon points="14,1 26,8 14,15 2,8" fill="none" stroke="currentColor" strokeWidth="1.5"/><polygon points="14,4 22,8 14,12 6,8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
	'◯◯': <svg width="28" height="16" viewBox="0 0 28 16"><ellipse cx="10" cy="8" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="18" cy="8" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
	'◌': <svg width="24" height="16" viewBox="0 0 24 16"><ellipse cx="12" cy="8" rx="9" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/></svg>,
	'◆': <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 15,8 8,15 1,8" fill="currentColor"/></svg>,
	'◇': <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 15,8 8,15 1,8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
	'△': <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 15,15 1,15" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
	'▭▭▭': <svg width="24" height="20" viewBox="0 0 24 20"><rect x="1" y="1" width="22" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="1" y1="7" x2="23" y2="7" stroke="currentColor" strokeWidth="1"/><line x1="1" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="1"/></svg>,
}

export default function A4NotationComparator() {
	const [activeTab, setActiveTab] = useState(NOTATIONS[0].id)
	const notation = NOTATIONS.find(n => n.id === activeTab)!
	const Diagram = DIAGRAMS[activeTab]

	return (
		<div className="flex flex-col gap-6">
			{/* Tabs */}
			<div className="flex gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800 w-fit flex-wrap">
				{NOTATIONS.map(n => (
					<button
						key={n.id}
						onClick={() => setActiveTab(n.id)}
						className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
							activeTab === n.id
								? 'bg-stone-800 text-stone-100 shadow-sm'
								: 'text-stone-400 hover:text-stone-200'
						}`}
					>
						{n.name}
					</button>
				))}
			</div>

			{/* Active notation */}
			<div className="animate-fade-in flex flex-col gap-5" key={activeTab}>
				{/* Header */}
				<div>
					<div className="flex items-baseline gap-2">
						<h3 className="font-serif text-lg font-semibold text-stone-100">
							{notation.name}
						</h3>
						{notation.year && (
							<span className="text-stone-500 text-sm">({notation.year})</span>
						)}
					</div>
					<p className="text-stone-400 text-sm mt-1">{notation.description}</p>
				</div>

				{/* Diagram */}
				<div className="bg-stone-900 border border-stone-800 rounded-lg">
					<div className="px-4 py-2 border-b border-stone-800">
						<p className="text-stone-500 text-xs font-mono">Local 1..* Producto</p>
					</div>
					<Diagram />
				</div>

				{/* Elements */}
				<div>
					<h4 className="font-serif text-sm font-semibold text-stone-200 mb-3">Elementos</h4>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
						{notation.elements.map(el => (
							<div
								key={el.name}
								className="flex items-center gap-3 bg-stone-900 border border-stone-800 rounded-md px-3 py-2"
							>
								<div className="text-amber-400 w-8 flex items-center justify-center shrink-0">
									{ELEMENT_ICONS[el.visual] ?? <span className="font-mono text-lg">{el.visual}</span>}
								</div>
								<div>
									<p className="text-stone-200 text-sm font-medium">{el.name}</p>
									<p className="text-stone-500 text-xs">{el.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Characteristics */}
				<div>
					<h4 className="font-serif text-sm font-semibold text-stone-200 mb-3">Características</h4>
					<ul className="flex flex-col gap-1.5">
						{notation.characteristics.map(c => (
							<li key={c} className="flex items-start gap-2 text-stone-300 text-sm">
								<span className="text-amber-500 mt-0.5">•</span>
								{c}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Comparison table */}
			<div>
				<h4 className="font-serif text-sm font-semibold text-stone-200 mb-3">Comparación</h4>
				<div className="overflow-x-auto">
					<table className="w-full text-sm border-collapse">
						<thead>
							<tr className="border-b border-stone-700">
								<th className="text-left text-stone-400 font-medium px-3 py-2">Aspecto</th>
								{NOTATIONS.map(n => (
									<th key={n.id} className="text-left text-stone-400 font-medium px-3 py-2">
										{n.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-stone-800">
								<td className="text-stone-300 px-3 py-2">Entidades</td>
								<td className="text-stone-400 px-3 py-2">Rectángulo</td>
								<td className="text-stone-400 px-3 py-2">Rectángulo / Doble</td>
								<td className="text-stone-400 px-3 py-2">Clase (3 compartimentos)</td>
							</tr>
							<tr className="border-b border-stone-800">
								<td className="text-stone-300 px-3 py-2">Asociaciones</td>
								<td className="text-stone-400 px-3 py-2">Flechas</td>
								<td className="text-stone-400 px-3 py-2">Rombo / Doble rombo</td>
								<td className="text-stone-400 px-3 py-2">Línea con multiplicidad</td>
							</tr>
							<tr className="border-b border-stone-800">
								<td className="text-stone-300 px-3 py-2">Atributos</td>
								<td className="text-stone-400 px-3 py-2">No explícitos</td>
								<td className="text-stone-400 px-3 py-2">Óvalos (simples, dobles, punteados)</td>
								<td className="text-stone-400 px-3 py-2">Dentro de la clase</td>
							</tr>
							<tr className="border-b border-stone-800">
								<td className="text-stone-300 px-3 py-2">Cardinalidad</td>
								<td className="text-stone-400 px-3 py-2">Implícita (flechas)</td>
								<td className="text-stone-400 px-3 py-2">(min,max)</td>
								<td className="text-stone-400 px-3 py-2">1, 0..1, 1..*, *</td>
							</tr>
							<tr>
								<td className="text-stone-300 px-3 py-2">Herencia</td>
								<td className="text-stone-400 px-3 py-2">—</td>
								<td className="text-stone-400 px-3 py-2">Triángulo ISA</td>
								<td className="text-stone-400 px-3 py-2">Triángulo △</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<Callout type="example" title="Tip">
				En el ramo se pide usar Diagrama de Clases UML para el modelo conceptual.
			</Callout>
		</div>
	)
}
