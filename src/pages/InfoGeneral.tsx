export default function InfoGeneral() {
	return (
		<div className="max-w-3xl mx-auto space-y-6">
			{/* Header principal */}
			<div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg">
				<h1 className="text-3xl font-bold text-zinc-100 mb-1">BDD Lab UTFSM</h1>
				<p className="text-zinc-400 text-lg">Laboratorio Interactivo — INF-239 Bases de Datos</p>
			</div>

			{/* Info del curso */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-lg">
					<p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Profesor</p>
					<p className="text-zinc-300 font-medium">Por definir</p>
				</div>
				<div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-lg">
					<p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Semestre</p>
					<p className="text-zinc-300 font-medium">2026-1</p>
				</div>
				<div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-lg">
					<p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Curso</p>
					<p className="text-zinc-300 font-medium">INF-239</p>
				</div>
			</div>

			{/* Descripcion */}
			<div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
				<p className="text-zinc-400 leading-relaxed">
					Plataforma de aprendizaje interactivo para el curso de Bases de Datos de la Universidad
					Tecnica Federico Santa Maria. Practica SQL directamente en el browser, sin instalar nada.
				</p>
			</div>

			{/* Como usar */}
			<div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
				<h2 className="text-zinc-100 font-semibold mb-4">Como usar esta plataforma</h2>
				<ul className="space-y-3">
					<li className="flex gap-3">
						<span className="text-indigo-500 font-bold shrink-0">1.</span>
						<span className="text-zinc-400">Navega por las unidades en el sidebar</span>
					</li>
					<li className="flex gap-3">
						<span className="text-indigo-500 font-bold shrink-0">2.</span>
						<span className="text-zinc-400">
							Cada unidad tiene secciones de Conceptos, Ejercicios, Editor SQL, Quiz y Cheat Sheet
						</span>
					</li>
					<li className="flex gap-3">
						<span className="text-indigo-500 font-bold shrink-0">3.</span>
						<span className="text-zinc-400">
							Comienza con la Unidad 1 — las demas se habilitaran progresivamente
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
