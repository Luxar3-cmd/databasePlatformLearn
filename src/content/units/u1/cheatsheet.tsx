export function CSDefiniciones() {
	return (
		<dl className="space-y-4">
			{[
				{
					term: 'Dato',
					def: 'Hecho relacionado con personas, objetos o eventos del mundo real. Puede ser cuantitativo o cualitativo, interno o externo. Por si solo no tiene significado.',
				},
				{
					term: 'Informacion',
					def: 'Datos organizados en una forma util para tomar decisiones. Un dato + contexto + proposito = informacion.',
				},
				{
					term: 'Base de Datos (BD)',
					def: 'Conjunto de archivos de datos relacionados entre si, con dos propiedades: Integracion (redundancia minimizada) y Comparticion (multiples usuarios con acceso simultaneo).',
				},
				{
					term: 'DBMS',
					def: 'Data Base Management System. Software (y a veces hardware) que permite crear, mantener y controlar el acceso a una o mas BD. Gestiona el Diccionario de Datos y las operaciones CRUD.',
				},
				{
					term: 'DDL',
					def: 'Data Definition Language. Sublanguage del SQL para definir la estructura de la BD: CREATE TABLE, ALTER TABLE, DROP TABLE. Actua sobre el esquema (metadatos).',
				},
				{
					term: 'DML',
					def: 'Data Manipulation Language. Sublanguaje del SQL para manipular datos: INSERT, SELECT, UPDATE, DELETE (CRUD). Es la operacion mas frecuente.',
				},
				{
					term: 'DCL',
					def: 'Data Control Language. Sublanguaje del SQL para control de acceso y permisos: GRANT, REVOKE. Lo administra el DBA.',
				},
			].map(({ term, def }) => (
				<div key={term} className="border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
					<dt className="text-sm font-bold text-zinc-100 mb-1">{term}</dt>
					<dd className="text-sm text-zinc-300 leading-relaxed">{def}</dd>
				</div>
			))}
		</dl>
	)
}

export function CSArchivosVsBd() {
	return (
		<div className="overflow-x-auto rounded-md border border-zinc-700">
			<table className="w-full text-sm border-collapse">
				<thead>
					<tr className="bg-zinc-800">
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Criterio
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Archivos
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Base de Datos
						</th>
					</tr>
				</thead>
				<tbody>
					{[
						['Redundancia', 'No controlada, alta', 'Minimizada, controlada'],
						['Dependencia', 'Datos ligados al programa', 'Independencia de datos'],
						['Estandarizacion', 'Dificil, descentralizada', 'Centralizada via DBA'],
						['Compartir datos', 'Escasa, por aplicacion', 'Amplia, vision compartida'],
						['Productividad', 'Baja (disenar todo)', 'Alta (DBMS gestiona I/O)'],
						['Consistencia', 'Baja (datos duplicados)', 'Alta (dato en un lugar)'],
						['Sinonimos/Homonimos', 'Frecuentes (sin control)', 'Eliminados via DBA'],
					].map(([criterio, archivos, bd], i) => (
						<tr key={criterio} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
							<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800">
								{criterio}
							</td>
							<td className="px-4 py-2.5 text-red-400 border-b border-zinc-800">{archivos}</td>
							<td className="px-4 py-2.5 text-green-400 border-b border-zinc-800">{bd}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export function CSTiposBd() {
	return (
		<div className="overflow-x-auto rounded-md border border-zinc-700">
			<table className="w-full text-sm border-collapse">
				<thead>
					<tr className="bg-zinc-800">
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Criterio
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Tipos
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Ejemplo breve
						</th>
					</tr>
				</thead>
				<tbody>
					{[
						[
							'Modelo de datos',
							'Jerarquica / Reticular / Relacional / Orientada a Objeto / Multidimensional',
							'Oracle (rel.), MongoDB (doc.), OLAP Cubes (multidim.)',
						],
						[
							'Nivel organizacional',
							'Operacional (OLTP) / Gestion (OLAP/DW) / Estrategica (Data Mining)',
							'TPS para cajero; DW para gerente',
						],
						[
							'Tipo de dato',
							'Estructurado / Agregado / Semiestructurado / No estructurado',
							'BD relacional / DW / XML-JSON / NoSQL',
						],
						[
							'Sitio de almacenamiento',
							'In-memory (1 nivel) / Basada en disco (2 niveles) / Almacenamiento terciario (3 niveles)',
							'Redis / PostgreSQL / cinta magnetica',
						],
						[
							'Numero de procesadores',
							'Serial (1 CPU) / Paralela (MC, NC, DC, AC)',
							'RDBMS clasico / Apache Spark',
						],
						[
							'Numero de sitios',
							'Centralizada / Distribuida (homogenea o heterogenea)',
							'Servidor unico / BD en multiples nodos',
						],
					].map(([criterio, tipos, ejemplo], i) => (
						<tr key={criterio} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
							<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800 whitespace-nowrap">
								{criterio}
							</td>
							<td className="px-4 py-2.5 text-zinc-300 border-b border-zinc-800">{tipos}</td>
							<td className="px-4 py-2.5 text-zinc-500 text-xs border-b border-zinc-800">{ejemplo}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export function CSEtapasDiseno() {
	return (
		<ol className="space-y-3">
			{[
				{
					num: '1',
					nombre: 'Analisis',
					objetivo: 'Levantar requerimientos de informacion con el usuario. Produce el modelo de datos conceptual (entidades y relaciones).',
					color: 'border-blue-700 bg-blue-950/20',
					numColor: 'text-blue-300',
				},
				{
					num: '2',
					nombre: 'Diseno',
					objetivo: 'Convertir el modelo conceptual en un modelo logico implementable en el DBMS. Se define el esquema (CREATE TABLE con DDL).',
					color: 'border-purple-700 bg-purple-950/20',
					numColor: 'text-purple-300',
				},
				{
					num: '3',
					nombre: 'Construccion',
					objetivo: 'Implementar la BD fisicamente en el DBMS y desarrollar los programas de aplicacion.',
					color: 'border-amber-700 bg-amber-950/20',
					numColor: 'text-amber-300',
				},
				{
					num: '4',
					nombre: 'Implementacion',
					objetivo: 'Poner el sistema en produccion. Incluye carga inicial de datos y capacitacion de usuarios.',
					color: 'border-green-700 bg-green-950/20',
					numColor: 'text-green-300',
				},
				{
					num: '5',
					nombre: 'Mantenimiento',
					objetivo: 'Operacion continua: DML frecuente (INSERT, UPDATE, DELETE, SELECT), ajustes de esquema via DDL, control de acceso via DCL.',
					color: 'border-zinc-600 bg-zinc-800/40',
					numColor: 'text-zinc-300',
				},
				{
					num: '6',
					nombre: 'Modelamiento de Datos (ciclo BD)',
					objetivo: 'Dentro de BD: captura requerimientos en modelo conceptual (rara vez). Fase inicial del ciclo Modelamiento → Diseno/Creacion → Uso.',
					color: 'border-red-700 bg-red-950/20',
					numColor: 'text-red-300',
				},
			].map(({ num, nombre, objetivo, color, numColor }) => (
				<li key={num} className={`flex gap-3 border rounded-md p-3 ${color}`}>
					<span className={`text-lg font-bold shrink-0 w-6 text-center ${numColor}`}>{num}</span>
					<div>
						<p className="text-sm font-semibold text-zinc-200 mb-0.5">{nombre}</p>
						<p className="text-xs text-zinc-400 leading-relaxed">{objetivo}</p>
					</div>
				</li>
			))}
		</ol>
	)
}

export function CSNiveles() {
	return (
		<div className="overflow-x-auto rounded-md border border-zinc-700">
			<table className="w-full text-sm border-collapse">
				<thead>
					<tr className="bg-zinc-800">
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Nivel
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Tipo SI
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Decision
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Datos
						</th>
					</tr>
				</thead>
				<tbody>
					{[
						[
							'Estrategico',
							'DSS (OLAP / Data Mining)',
							'No estructurada — planificacion largo plazo',
							'Resumidos, historicos, externos',
						],
						[
							'Tactico',
							'MIS (OLAP)',
							'Semiestructurada — control gerencial',
							'Detallados, periodicos, internos',
						],
						[
							'Operacional',
							'TPS (OLTP)',
							'Estructurada — control del dia a dia',
							'Muy detallados, tiempo real, internos',
						],
					].map(([nivel, si, decision, datos], i) => (
						<tr key={nivel} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
							<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800 whitespace-nowrap">
								{nivel}
							</td>
							<td className="px-4 py-2.5 text-blue-300 border-b border-zinc-800 text-xs font-mono">
								{si}
							</td>
							<td className="px-4 py-2.5 text-zinc-300 border-b border-zinc-800">{decision}</td>
							<td className="px-4 py-2.5 text-zinc-400 border-b border-zinc-800">{datos}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export function CSTerminologia() {
	return (
		<div className="overflow-x-auto rounded-md border border-zinc-700">
			<table className="w-full text-sm border-collapse">
				<thead>
					<tr className="bg-zinc-800">
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Termino formal
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Equivalente informal
						</th>
						<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
							Descripcion
						</th>
					</tr>
				</thead>
				<tbody>
					{[
						[
							'Relacion',
							'Tabla',
							'Estructura que almacena datos de un mismo tipo de entidad. Columnas fijas, filas variables.',
						],
						[
							'Tupla',
							'Fila / Registro',
							'Una instancia de la entidad. Identificada univocamente por la clave primaria.',
						],
						[
							'Atributo',
							'Columna / Campo',
							'Caracteristica de la entidad. Cada atributo tiene un tipo de dato y pertenece a un dominio.',
						],
						[
							'Dominio',
							'Rango de valores validos',
							'Conjunto de valores permitidos para un atributo. Ej: dominio de NOTA = {1.0 .. 7.0}.',
						],
						[
							'Clave primaria (PK)',
							'Identificador unico',
							'Campo(s) que identifican univocamente cada tupla. No puede ser NULL ni repetirse.',
						],
						[
							'Clave foranea (FK)',
							'Referencia a otra tabla',
							'Campo que apunta a la PK de otra relacion para establecer asociacion. Puede ser NULL.',
						],
					].map(([formal, informal, desc], i) => (
						<tr key={formal} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
							<td className="px-4 py-2.5 text-blue-300 font-semibold border-b border-zinc-800 whitespace-nowrap">
								{formal}
							</td>
							<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800">
								{informal}
							</td>
							<td className="px-4 py-2.5 text-zinc-400 border-b border-zinc-800">{desc}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
