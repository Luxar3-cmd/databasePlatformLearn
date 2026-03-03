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
	{ id: 'etapas-diseno', label: 'Etapas de Diseno' },
	{ id: 'niveles', label: 'Niveles Org.' },
	{ id: 'terminologia', label: 'Terminologia' },
] as const

export default function CheatSheetSection() {
	return (
		<div className="scroll-smooth">
			{/* Sticky anchor nav */}
			<nav className="sticky top-[57px] z-10 bg-zinc-950 border-b border-zinc-800 py-2 flex gap-1 overflow-x-auto">
				{SECTIONS.map((s) => (
					<a
						key={s.id}
						href={`#${s.id}`}
						className="text-sm text-zinc-400 hover:text-zinc-200 whitespace-nowrap px-3 py-1 rounded hover:bg-zinc-800 transition-colors"
					>
						{s.label}
					</a>
				))}
			</nav>

			{/* Content sections */}
			<div className="flex flex-col gap-10 py-8">
				<section id="definiciones">
					<h2 className="text-lg font-semibold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
						Definiciones Clave
					</h2>
					<CSDefiniciones />
				</section>

				<section id="archivos-vs-bd">
					<h2 className="text-lg font-semibold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
						Archivos vs Base de Datos
					</h2>
					<CSArchivosVsBd />
				</section>

				<section id="tipos-bd">
					<h2 className="text-lg font-semibold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
						Tipos de Bases de Datos
					</h2>
					<CSTiposBd />
				</section>

				<section id="etapas-diseno">
					<h2 className="text-lg font-semibold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
						Etapas del Proceso de Diseno
					</h2>
					<CSEtapasDiseno />
				</section>

				<section id="niveles">
					<h2 className="text-lg font-semibold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
						Niveles Organizacionales y Tipos de SI
					</h2>
					<CSNiveles />
				</section>

				<section id="terminologia">
					<h2 className="text-lg font-semibold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
						Terminologia Relacional
					</h2>
					<CSTerminologia />
				</section>
			</div>
		</div>
	)
}
