export default function InfoGeneral() {
	return (
		<div className="max-w-3xl mx-auto space-y-8">
			{/* Hero */}
			<div className="p-10 bg-stone-900/50 border border-stone-800 rounded-lg">
				<h1 className="font-serif text-4xl font-semibold text-stone-100 tracking-tight mb-2">
					BDD Lab UTFSM
				</h1>
				<p className="text-stone-400 text-lg font-light">
					Laboratorio Interactivo — INF-239 Bases de Datos
				</p>
				<div className="mt-4 h-px bg-gradient-to-r from-amber-500/40 via-amber-500/10 to-transparent" />
				<p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-xl">
					Plataforma de aprendizaje interactivo para el curso de Bases de Datos de la Universidad
					Técnica Federico Santa María. Practica SQL directamente en el navegador, sin instalar nada.
				</p>
			</div>

			{/* Info del curso */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="p-5 bg-stone-900/50 border border-stone-800 rounded-lg">
					<p className="text-stone-500 text-xs uppercase tracking-wider mb-1">Profesor</p>
					<p className="text-stone-200 font-medium">Mauricio Figueroa</p>
				</div>
				<div className="p-5 bg-stone-900/50 border border-stone-800 rounded-lg">
					<p className="text-stone-500 text-xs uppercase tracking-wider mb-1">Semestre</p>
					<p className="text-stone-200 font-medium">2026-1</p>
				</div>
				<div className="p-5 bg-stone-900/50 border border-stone-800 rounded-lg">
					<p className="text-stone-500 text-xs uppercase tracking-wider mb-1">Curso</p>
					<p className="text-stone-200 font-medium">INF-239</p>
				</div>
			</div>

			{/* Como usar */}
			<div className="p-6 bg-stone-900/50 border border-stone-800 rounded-lg">
				<h2 className="font-serif text-xl text-stone-100 mb-5">Cómo usar esta plataforma</h2>
				<ul className="space-y-4">
					<li className="flex gap-4">
						<span className="font-serif text-xl text-amber-400 shrink-0 leading-tight">1.</span>
						<span className="text-stone-400 leading-relaxed">Navega por las unidades en el sidebar</span>
					</li>
					<li className="flex gap-4">
						<span className="font-serif text-xl text-amber-400 shrink-0 leading-tight">2.</span>
						<span className="text-stone-400 leading-relaxed">
							Cada unidad tiene secciones de Conceptos, Ejercicios, Editor SQL, Quiz y Cheat Sheet
						</span>
					</li>
					<li className="flex gap-4">
						<span className="font-serif text-xl text-amber-400 shrink-0 leading-tight">3.</span>
						<span className="text-stone-400 leading-relaxed">
							Comienza con la Unidad 1 — las demás se habilitarán progresivamente
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
