import { useState, useEffect } from 'react'
import {
	CSDefiniciones,
	CSArchivosVsBd,
	CSTiposBd,
	CSEtapasDiseno,
	CSNiveles,
	CSTerminologia,
} from '@/content/units/u1/cheatsheet'

const SECTIONS = [
	{ id: 'definiciones', label: 'Definiciones' },
	{ id: 'archivos-vs-bd', label: 'Archivos vs BD' },
	{ id: 'tipos-bd', label: 'Tipos de BD' },
	{ id: 'etapas-diseno', label: 'Etapas de Diseño' },
	{ id: 'niveles', label: 'Niveles Org.' },
	{ id: 'terminologia', label: 'Terminología' },
] as const

export default function CheatSheetSection() {
	const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id)
					}
				}
			},
			{ rootMargin: '-80px 0px -60% 0px' },
		)

		for (const s of SECTIONS) {
			const el = document.getElementById(s.id)
			if (el) observer.observe(el)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<div className="scroll-smooth">
			{/* Sticky anchor nav */}
			<nav className="sticky top-[57px] z-10 bg-stone-950 border-b border-stone-800 py-2 flex gap-1 overflow-x-auto">
				{SECTIONS.map((s) => (
					<a
						key={s.id}
						href={`#${s.id}`}
						className={`text-sm whitespace-nowrap px-3 py-1 rounded transition-colors ${
							activeSection === s.id
								? 'text-amber-400 bg-amber-950/20'
								: 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
						}`}
					>
						{s.label}
					</a>
				))}
			</nav>

			{/* Content sections */}
			<div className="flex flex-col gap-10 py-8">
				<section id="definiciones" style={{ scrollMarginTop: '110px' }}>
					<h2 className="font-serif text-xl font-semibold text-stone-100 tracking-tight mb-4 pb-2 border-b border-stone-800">
						Definiciones Clave
					</h2>
					<CSDefiniciones />
				</section>

				<section id="archivos-vs-bd" style={{ scrollMarginTop: '110px' }}>
					<h2 className="font-serif text-xl font-semibold text-stone-100 tracking-tight mb-4 pb-2 border-b border-stone-800">
						Archivos vs Base de Datos
					</h2>
					<CSArchivosVsBd />
				</section>

				<section id="tipos-bd" style={{ scrollMarginTop: '110px' }}>
					<h2 className="font-serif text-xl font-semibold text-stone-100 tracking-tight mb-4 pb-2 border-b border-stone-800">
						Tipos de Bases de Datos
					</h2>
					<CSTiposBd />
				</section>

				<section id="etapas-diseno" style={{ scrollMarginTop: '110px' }}>
					<h2 className="font-serif text-xl font-semibold text-stone-100 tracking-tight mb-4 pb-2 border-b border-stone-800">
						Etapas del Proceso de Diseño
					</h2>
					<CSEtapasDiseno />
				</section>

				<section id="niveles" style={{ scrollMarginTop: '110px' }}>
					<h2 className="font-serif text-xl font-semibold text-stone-100 tracking-tight mb-4 pb-2 border-b border-stone-800">
						Niveles Organizacionales y Tipos de SI
					</h2>
					<CSNiveles />
				</section>

				<section id="terminologia" style={{ scrollMarginTop: '110px' }}>
					<h2 className="font-serif text-xl font-semibold text-stone-100 tracking-tight mb-4 pb-2 border-b border-stone-800">
						Terminología Relacional
					</h2>
					<CSTerminologia />
				</section>
			</div>
		</div>
	)
}
