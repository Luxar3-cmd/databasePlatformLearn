import { Callout } from '@/components/ui/Callout'

export function Topic11() {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-zinc-100">1.1 Definicion de Bases de Datos</h2>

			<p className="text-zinc-300 leading-relaxed">
				En las organizaciones se ha reconocido la necesidad de incorporar al dato como un recurso mas,
				con costo y valor asociado. Su obtencion, almacenamiento y control involucran gastos, pero si
				se considera el valor agregado que entrega para la toma de decisiones en forma oportuna, ese
				gasto pasa a ser una inversion.
			</p>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Definiciones clave</h3>

			<Callout type="definition" title="Dato">
				Hechos relacionados con personas, objetos, eventos u otras entidades del mundo real (empresa,
				sistema, etc.). Pueden ser cuantitativos (financieros) o cualitativos (descriptivos), internos
				o externos, historicos o predictivos. Provienen de diversas fuentes dentro de una
				organizacion: Finanzas, Produccion, Ventas, Personal, etc.
			</Callout>

			<Callout type="example" title="Dato en la UTFSM">
				Imagina que eres alumno de la UTFSM. Tu RUT{' '}
				<code className="text-xs bg-zinc-800 px-1 rounded">12.345.678-9</code>, tu rol{' '}
				<code className="text-xs bg-zinc-800 px-1 rounded">201234567-8</code>, la nota{' '}
				<code className="text-xs bg-zinc-800 px-1 rounded">5.3</code> del certamen 1 de INF-239 y la
				fecha <code className="text-xs bg-zinc-800 px-1 rounded">2026-03-15</code> son{' '}
				<strong>datos</strong>: hechos aislados almacenados en la BD de la universidad. Por si solos
				no te dicen nada util.
			</Callout>

			<Callout type="definition" title="Informacion">
				Datos que han sido organizados o preparados en una forma adecuada para apoyar la toma de
				decisiones. Por ejemplo, una lista de productos sin orden son datos; esa misma lista ordenada
				por stock (de menor a mayor) representa informacion para el encargado de compras que debe
				decidir cuándo y cuánto reponer.
			</Callout>

			<Callout type="example" title="Informacion en Spotify">
				Spotify tiene millones de plays registrados (datos). Cuando te muestra{' '}
				<em>"tu artista mas escuchado del mes fue Billie Eilish con 847 reproducciones"</em>, convirtio
				esos datos en <strong>informacion</strong>: algo organizado y presentado para que puedas tomar
				una decision. Esos datos se convirtieron en informacion porque estan estructurados para
				responder una pregunta concreta.
			</Callout>

			<Callout type="definition" title="Base de Datos (BD)">
				Conjunto de archivos de datos relacionados entre si donde se almacenan datos relevantes para
				la organizacion y que posteriormente seran recuperados para transformarlos en informacion.
			</Callout>

			<Callout type="example" title="Base de Datos en Spotify">
				Piensa en Spotify: tiene una tabla de{' '}
				<strong>canciones</strong> (titulo, artista, duracion), una tabla de{' '}
				<strong>usuarios</strong> (nombre, pais, plan), y una tabla de{' '}
				<strong>reproducciones</strong> que las conecta (quien escucho que y cuando). Esas tres tablas
				relacionadas entre si son una <strong>base de datos</strong>. La propiedad clave es la{' '}
				<em>integracion</em>: todos los datos viven en un solo lugar coherente, y miles de usuarios
				los comparten a la vez.
			</Callout>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Definicion tecnica</h3>

			<p className="text-zinc-300 leading-relaxed">
				Desde una perspectiva tecnica, una BD es un gran repositorio donde hay un conjunto de archivos
				relacionados entre si que pueden ser accesados por numerosos usuarios, a traves de distintos
				medios. Tiene dos propiedades fundamentales:
			</p>
			<ul className="list-disc list-inside space-y-1 text-zinc-300 ml-4">
				<li>
					<span className="font-medium text-zinc-200">Integracion:</span> los archivos de datos han
					sido logicamente organizados para reducir su redundancia y facilitar el acceso.
				</li>
				<li>
					<span className="font-medium text-zinc-200">Comparticion:</span> todos los usuarios
					calificados tienen acceso a los mismos datos, para usarlos en diferentes actividades.
				</li>
			</ul>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Definicion organizacional</h3>

			<p className="text-zinc-300 leading-relaxed">
				Desde una perspectiva organizacional, una BD se puede definir como un conjunto de{' '}
				<span className="font-medium text-zinc-100">datos operacionales</span> relevantes para la
				toma de decisiones involucrada en algun nivel de la organizacion. La organizacion se visualiza
				como una piramide de 3 niveles:
			</p>
			<ul className="list-disc list-inside space-y-1 text-zinc-300 ml-4">
				<li>
					<span className="font-medium text-zinc-200">Nivel Operacional:</span> datos del dia a dia
					(cajeros, transacciones).
				</li>
				<li>
					<span className="font-medium text-zinc-200">Nivel Tactico:</span> datos para control
					gerencial (jefe de sucursal).
				</li>
				<li>
					<span className="font-medium text-zinc-200">Nivel Estrategico:</span> datos para
					planificacion a largo plazo (gerente general).
				</li>
			</ul>

			<Callout type="example" title="Los tres niveles en un banco">
				En el Banco de Chile, un cajero registra cada deposito al instante (
				<strong>operacional</strong>). El jefe de sucursal revisa cuantas transacciones se hicieron
				esta semana y que producto tuvo mas demanda (<strong>tactico</strong>). El CEO analiza si
				conviene abrir una nueva sucursal en Quilpue basandose en el crecimiento de clientes de los
				ultimos 3 anos (<strong>estrategico</strong>). Los tres usan la misma BD — pero consultan
				datos a distinto nivel de detalle.
			</Callout>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Operaciones CRUD sobre la BD</h3>
			<p className="text-zinc-300 leading-relaxed">
				Los usuarios interactuan con la BD a traves de 4 operaciones basicas (CRUD), soportadas por
				el lenguaje SQL:
			</p>
			<ul className="list-disc list-inside space-y-1 text-zinc-300 ml-4">
				<li>
					<span className="font-mono text-blue-300">CREATE / INSERT</span> — Insertar datos nuevos
				</li>
				<li>
					<span className="font-mono text-blue-300">SELECT</span> — Leer o seleccionar datos
				</li>
				<li>
					<span className="font-mono text-blue-300">UPDATE</span> — Actualizar datos existentes
				</li>
				<li>
					<span className="font-mono text-blue-300">DELETE</span> — Borrar datos obsoletos
				</li>
			</ul>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Componentes del enfoque de BD</h3>

			<div className="space-y-3">
				<div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
					<p className="text-sm font-medium text-zinc-200 mb-1">1. Base de Datos fisica</p>
					<p className="text-sm text-zinc-400">
						Lugar fisico donde quedan almacenados los valores de los datos. Puede ser centralizada
						(un servidor central) o distribuida (distintos nodos de una red).
					</p>
				</div>
				<div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
					<p className="text-sm font-medium text-zinc-200 mb-1">
						2. Diccionario de Datos (Data Dictionary)
					</p>
					<p className="text-sm text-zinc-400">
						Guarda una descripcion de los datos (metadatos): tipo, largo, propietario, tamaño de
						registros, etc. Tambien llamado Repositorio, Catalogo, Schema o BD Logica.
					</p>
				</div>
				<div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
					<p className="text-sm font-medium text-zinc-200 mb-1">
						3. DBMS (Data Base Management System)
					</p>
					<p className="text-sm text-zinc-400">
						Software (y a veces hardware y firmware) que permite manejar una o mas BD. Sus 3
						funciones principales son:
					</p>
					<ul className="list-disc list-inside mt-2 space-y-1 text-sm text-zinc-400 ml-3">
						<li>
							<span className="font-medium text-zinc-300">DDL</span> (Data Definition Language):
							especifica el tipo de dato, estructura logica y relaciones.
						</li>
						<li>
							<span className="font-medium text-zinc-300">DML</span> (Data Manipulation Language):
							permite almacenar, modificar y recuperar datos (SQL).
						</li>
						<li>
							<span className="font-medium text-zinc-300">DCL</span> (Data Control Language):
							controla acceso y define operaciones permitidas por usuario.
						</li>
					</ul>
				</div>
				<div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
					<p className="text-sm font-medium text-zinc-200 mb-1">4. Programas de Aplicacion</p>
					<p className="text-sm text-zinc-400">
						Escritos por desarrolladores para poblar inicialmente la BD, mantenerla en el tiempo
						(CUD del CRUD) y generar informacion a los usuarios via reportes, graficos, dashboards.
					</p>
				</div>
				<div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
					<p className="text-sm font-medium text-zinc-200 mb-1">5. Interfaz de Usuario</p>
					<p className="text-sm text-zinc-400">
						Lenguajes, menus, pantallas, sistemas Web, reconocimiento de voz, etc. que permiten a
						los usuarios interactuar con los componentes del DBMS.
					</p>
				</div>
				<div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
					<p className="text-sm font-medium text-zinc-200 mb-1">
						6. Herramientas CASE (Computer-Aided Software Engineering)
					</p>
					<p className="text-sm text-zinc-400">
						Herramientas automatizadas para el ciclo de vida del software. En BD ayudan a generar el
						modelo de datos, algunas generan codigo SQL. Ejemplos: Erwin, EasyCASE, Oracle Designer,
						MySQL Workbench.
					</p>
				</div>
				<div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
					<p className="text-sm font-medium text-zinc-200 mb-1">7. Usuarios</p>
					<p className="text-sm text-zinc-400">
						Se clasifican en: <span className="text-zinc-300">Usuarios Finales</span> (ejecutivos,
						vendedores, secretarias — quienes usan la BD en su ciclo de vida),{' '}
						<span className="text-zinc-300">Desarrolladores de Software</span> (analistas y
						programadores que disenan aplicaciones), y{' '}
						<span className="text-zinc-300">DBA (Data Base Administrator)</span> (responsable del
						diseno, construccion, implementacion y seguridad de la BD).
					</p>
				</div>
			</div>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">
				Implementacion del enfoque de BD: 3 etapas
			</h3>
			<div className="flex gap-2 flex-wrap">
				{[
					{
						etapa: 'Modelamiento',
						desc: 'Captura requerimientos y los traduce en un modelo de datos conceptual (diagrama con notacion estandar). Se realiza rara vez.',
						color: 'border-red-800 bg-red-950/20',
					},
					{
						etapa: 'Diseno / Creacion',
						desc: 'Transforma el modelo conceptual en modelo logico implementable en el DBMS via comandos DDL (CREATE TABLE). Se realiza rara vez.',
						color: 'border-blue-800 bg-blue-950/20',
					},
					{
						etapa: 'Uso',
						desc: 'Usuarios finales consultan (Query) y desarrolladores mantienen la BD via DML. Ocurre frecuentemente.',
						color: 'border-green-800 bg-green-950/20',
					},
				].map((e) => (
					<div key={e.etapa} className={`flex-1 min-w-[200px] border rounded-md p-3 ${e.color}`}>
						<p className="text-sm font-semibold text-zinc-200 mb-1">{e.etapa}</p>
						<p className="text-xs text-zinc-400">{e.desc}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export function Topic12() {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-zinc-100">
				1.2 Enfoque de Archivos vs Enfoque de BD
			</h2>

			<h3 className="text-base font-semibold text-zinc-200">Enfoque de Archivos (por Agregacion)</h3>
			<p className="text-zinc-300 leading-relaxed">
				Enfoque utilizado en la decada de los 70. Cada aplicacion (remuneraciones, cuentas corrientes,
				contabilidad, control de inventario, etc.) era disenada para satisfacer las necesidades de un
				departamento, sin planificacion corporativa ni modelo que guiara el desarrollo. Cada programa
				era dueno de sus propios archivos de datos.
			</p>

			<Callout type="warning" title="Problema central">
				La superposicion de areas de datos entre aplicaciones indica que el mismo tipo de dato era
				duplicado por multiples programas, sin compartir recursos — generando redundancia no
				controlada.
			</Callout>

			<h3 className="text-base font-semibold text-zinc-200 mt-2">
				Desventajas del Enfoque de Archivos
			</h3>
			<ul className="space-y-3 text-zinc-300">
				<li className="flex gap-2">
					<span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
					<div>
						<span className="font-medium text-zinc-200">Redundancia no controlada:</span> cada
						aplicacion tiene sus propios archivos, generando datos duplicados, perdida de espacio e
						inconsistencias al actualizar.
					</div>
				</li>
				<li className="flex gap-2">
					<span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
					<div>
						<span className="font-medium text-zinc-200">
							Dependencia de los datos del programa:
						</span>{' '}
						la definicion de los archivos iba incorporada dentro del programa (ej: COBOL). Cualquier
						cambio en la estructura del dato requeria modificar todos los programas que lo usaban.
					</div>
				</li>
				<li className="flex gap-2">
					<span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
					<div>
						<span className="font-medium text-zinc-200">Pobre estandarizacion:</span> sin control
						centralizado, cada unidad usaba sus propios nombres y formatos. Generaba sinonimos
						(distintos nombres para el mismo dato: #ESTUDIANTE vs ROL_ALUMNO) y homonimos (mismo
						nombre para datos distintos: NOTA para calificacion vs NOTA para comentario en una orden
						de compra).
					</div>
				</li>
				<li className="flex gap-2">
					<span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
					<div>
						<span className="font-medium text-zinc-200">Inconsistencia de datos:</span> cuando el
						dato existe en distintas partes y no se modifica en todas al hacer un UPDATE. Lleva a
						reportes inconsistentes y reduce la confianza en la calidad de la BD.
					</div>
				</li>
				<li className="flex gap-2">
					<span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
					<div>
						<span className="font-medium text-zinc-200">Problemas con el cliente:</span> dificil
						responder a nuevos requerimientos de informacion del usuario que no fueron considerados
						en el diseno original.
					</div>
				</li>
				<li className="flex gap-2">
					<span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
					<div>
						<span className="font-medium text-zinc-200">Escasa posibilidad de compartir datos:</span>{' '}
						cada aplicacion tiene sus propios archivos; el mismo dato debe ingresarse varias veces.
					</div>
				</li>
				<li className="flex gap-2">
					<span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>
					<div>
						<span className="font-medium text-zinc-200">Baja productividad del desarrollador:</span>{' '}
						debe disenar cada archivo, codificar las definiciones y escribir instrucciones de
						Input/Output para cada nueva aplicacion.
					</div>
				</li>
			</ul>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Enfoque de Bases de Datos</h3>
			<p className="text-zinc-300 leading-relaxed">
				Los datos son vistos como un recurso que debe ser compartido entre diferentes usuarios. Cada
				usuario puede tener una vision (view) propia de la BD. Los datos son independientes del
				programa que los usa. Se tiene control centralizado via DBMS.
			</p>

			<h3 className="text-base font-semibold text-zinc-200 mt-4">Tabla comparativa</h3>

			<div className="overflow-x-auto rounded-md border border-zinc-700">
				<table className="w-full text-sm border-collapse">
					<thead>
						<tr className="bg-zinc-800">
							<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
								Criterio
							</th>
							<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
								Enfoque Archivos
							</th>
							<th className="text-left px-4 py-3 text-zinc-300 font-semibold border-b border-zinc-700">
								Enfoque BD
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
						].map(([criterio, archivos, bd], i) => (
							<tr key={criterio} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
								<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800">
									{criterio}
								</td>
								<td className="px-4 py-2.5 text-zinc-400 border-b border-zinc-800">{archivos}</td>
								<td className="px-4 py-2.5 text-green-400 border-b border-zinc-800">{bd}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Ventajas del Enfoque de BD</h3>
			<ul className="space-y-2 text-zinc-300">
				{[
					[
						'Vision centralizada, compartida y unica de los datos',
						'Una BD es creada para ser compartida por todos los usuarios que requieran sus datos; cada unidad funcional tiene su propia vista (view).',
					],
					[
						'Minimizacion de la redundancia',
						'Al integrar los archivos en una sola estructura logica, cada dato se almacena en un solo lugar. La redundancia existente es controlada.',
					],
					[
						'Independencia de los datos de los programas',
						'Permite cambiar la definicion y organizacion de los datos sin necesidad de alterar los programas de aplicacion.',
					],
					[
						'Estandarizacion',
						'El DBA tiene autoridad para definir y fijar los estandares de los datos: convenciones de nombres, controles de calidad, procedimientos uniformes.',
					],
					[
						'Integracion y seguridad de datos',
						'El DBA establece controles de calidad. El DBMS define perfiles de acceso y reglas de validacion para la integridad del dato.',
					],
					[
						'Facilidades para el diseno y desarrollo de aplicaciones',
						'Se reduce el costo y tiempo para nuevas aplicaciones, ya que el desarrollador no necesita gestionar los archivos — el DBMS lo hace.',
					],
				].map(([titulo, desc]) => (
					<li key={titulo} className="flex gap-2">
						<span className="text-green-400 font-bold mt-0.5 shrink-0">✓</span>
						<div>
							<span className="font-medium text-zinc-200">{titulo}:</span> {desc}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export function Topic13() {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-zinc-100">1.3 Tipos de Bases de Datos</h2>

			<p className="text-zinc-300 leading-relaxed">
				Las BD se pueden clasificar de distintas formas dependiendo de 6 criterios principales:
			</p>

			{/* Criterio 1 */}
			<section>
				<h3 className="text-base font-semibold text-zinc-200 mb-3">
					1. Segun la estructura de datos utilizada
				</h3>
				<div className="overflow-x-auto rounded-md border border-zinc-700">
					<table className="w-full text-sm border-collapse">
						<thead>
							<tr className="bg-zinc-800">
								<th className="text-left px-4 py-2 text-zinc-300 font-semibold border-b border-zinc-700">
									Tipo
								</th>
								<th className="text-left px-4 py-2 text-zinc-300 font-semibold border-b border-zinc-700">
									Descripcion
								</th>
								<th className="text-left px-4 py-2 text-zinc-300 font-semibold border-b border-zinc-700">
									Ejemplos
								</th>
							</tr>
						</thead>
						<tbody>
							{[
								[
									'Jerarquica',
									'Datos organizados como un arbol (padre-hijos). Un padre puede tener 0 o mas hijos, un hijo solo un padre.',
									'IMS de IBM',
								],
								[
									'Reticular',
									'Basada en un grafo. Un nodo hijo puede tener mas de un padre (imposible en jerarquica). Usa frameworks como RDF.',
									'RDF (Resource Description Framework)',
								],
								[
									'Relacional',
									'Datos en relaciones o tablas bidimensionales (filas y columnas). La mas usada actualmente.',
									'Oracle, PostgreSQL, MySQL, SQL Server',
								],
								[
									'Orientada a Objeto',
									'Estructura base es un objeto con atributos y metodos. Mayor flexibilidad para datos complejos (geometricos, etc.).',
									'Usada en Sistemas de Informacion Geografica (SIG)',
								],
								[
									'Multidimensional',
									'Datos en hipercubos con multiples dimensiones (> 2). Usada principalmente en Inteligencia de Negocios y Data Warehouse.',
									'OLAP Cubes',
								],
							].map(([tipo, desc, ej], i) => (
								<tr key={tipo} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
									<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800 whitespace-nowrap">
										{tipo}
									</td>
									<td className="px-4 py-2.5 text-zinc-400 border-b border-zinc-800">{desc}</td>
									<td className="px-4 py-2.5 text-zinc-500 border-b border-zinc-800 text-xs">
										{ej}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* Criterio 2 */}
			<section>
				<h3 className="text-base font-semibold text-zinc-200 mb-3">
					2. Segun el nivel organizacional que apoyan
				</h3>
				<div className="space-y-2">
					{[
						{
							tipo: 'BD Operacional (Transaccional - OLTP)',
							desc: 'Apoya los niveles operacionales. Registra las transacciones del dia a dia. Soporte de los sistemas OLTP. Actualmente suelen ser BD relacionales.',
							color: 'border-blue-700 bg-blue-950/20',
						},
						{
							tipo: 'BD de Gestion (Data Warehouse, Data Mart - OLAP)',
							desc: 'Apoya los niveles tactico y estrategico. Entrega informacion y conocimiento a los tomadores de decisiones. Puede ser relacional o multidimensional (DW o Data Marts).',
							color: 'border-purple-700 bg-purple-950/20',
						},
						{
							tipo: 'BD Estrategica (Data Warehouse - OLAP, Data Mining)',
							desc: 'Apoya el nivel estrategico. Permite obtener conocimiento via algoritmos de Data Mining (Mineria de Datos). Enfoque descriptivo y predictivo.',
							color: 'border-amber-700 bg-amber-950/20',
						},
					].map((item) => (
						<div key={item.tipo} className={`border rounded-md p-3 ${item.color}`}>
							<p className="text-sm font-semibold text-zinc-200 mb-1">{item.tipo}</p>
							<p className="text-sm text-zinc-400">{item.desc}</p>
						</div>
					))}
				</div>

				<div className="mt-4 overflow-x-auto rounded-md border border-zinc-700">
					<table className="w-full text-sm border-collapse">
						<thead>
							<tr className="bg-zinc-800">
								<th className="text-left px-4 py-2 text-zinc-300 font-semibold border-b border-zinc-700">
									Criterio
								</th>
								<th className="text-left px-4 py-2 text-zinc-300 font-semibold border-b border-zinc-700">
									OLTP (Operacional)
								</th>
								<th className="text-left px-4 py-2 text-zinc-300 font-semibold border-b border-zinc-700">
									OLAP (Analitico)
								</th>
							</tr>
						</thead>
						<tbody>
							{[
								['Objetivo', 'Registrar transacciones', 'Analizar y tomar decisiones'],
								['Tipo de dato', 'Detallado, actual', 'Agregado, historico'],
								['Operaciones', 'INSERT, UPDATE, DELETE, SELECT', 'SELECT con agregaciones'],
								['Volumen', 'Muchas transacciones pequenas', 'Pocas consultas sobre grandes volumenes'],
								['Estructura', 'BD Relacional', 'BD Multidimensional (Data Warehouse)'],
								['Sistemas', 'TPS, MIS (SIA)', 'DSS (Decision Support Systems)'],
							].map(([criterio, oltp, olap], i) => (
								<tr key={criterio} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
									<td className="px-4 py-2.5 text-zinc-200 font-medium border-b border-zinc-800">
										{criterio}
									</td>
									<td className="px-4 py-2.5 text-zinc-400 border-b border-zinc-800">{oltp}</td>
									<td className="px-4 py-2.5 text-zinc-400 border-b border-zinc-800">{olap}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* Criterio 3 */}
			<section>
				<h3 className="text-base font-semibold text-zinc-200 mb-3">
					3. Segun el tipo de dato almacenado
				</h3>
				<ul className="space-y-2 text-zinc-300">
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-blue-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">Estructurados y precisos:</span> BD
							Relacional. Todas las filas tienen el mismo tipo y largo; las columnas son del mismo
							tipo de dato.
						</div>
					</li>
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-purple-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">Agregados:</span> BD Multidimensional.
							Valores que resumen transacciones (ej: suma de ventas por trimestre, sucursal y
							categoria de producto).
						</div>
					</li>
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-green-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">Semiestructurados:</span> BD de documentos
							(XML, JSON). Usadas en Sistemas de Informacion Geografica (SIG), bibliotecas, etc.
						</div>
					</li>
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-amber-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">No estructurados:</span> BD NoSQL (Not
							Only SQL). No requieren estructuras rigidas. Nacen con el Big Data y las redes
							sociales. Ejemplos: MongoDB, Redis, Cassandra, CouchDB.
						</div>
					</li>
				</ul>
			</section>

			{/* Criterio 4 */}
			<section>
				<h3 className="text-base font-semibold text-zinc-200 mb-3">
					4. Segun la ubicacion de la copia principal de los datos
				</h3>
				<ul className="space-y-2 text-zinc-300">
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-blue-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">
								Basada en memoria principal — in-memory (1 nivel):
							</span>{' '}
							datos en RAM. Acceso muy rapido, pero volatil (se pierden si el sistema falla). Usada
							en IoT. Ejemplos: VoltDB, Oracle in-memory, Apache Spark.
						</div>
					</li>
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-green-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">Basada en disco (2 niveles):</span> nivel
							1 es la memoria principal (temporal), nivel 2 es el disco (permanente). Forma de
							trabajo de los RDBMS tradicionales.
						</div>
					</li>
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-amber-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">
								Basada en almacenamiento terciario (3 niveles):
							</span>{' '}
							agrega un nivel 3 de almacenamiento offline (disco externo, pendrive, cinta
							magnetica).
						</div>
					</li>
				</ul>
			</section>

			{/* Criterio 5 */}
			<section>
				<h3 className="text-base font-semibold text-zinc-200 mb-3">
					5. Segun el numero de procesadores
				</h3>
				<ul className="space-y-1 text-zinc-300">
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-zinc-400 font-bold">→</span>
						<span>
							<span className="font-medium text-zinc-200">Serial (secuencial):</span> un solo
							procesador. Forma mas tradicional.
						</span>
					</li>
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-zinc-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">Paralela:</span> multiples procesadores
							para procesar en paralelo distintas partes de una consulta.
							<ul className="list-disc list-inside ml-4 mt-1 space-y-0.5 text-zinc-400 text-sm">
								<li>MC — Memoria Compartida</li>
								<li>NC — Nada Compartido</li>
								<li>DC — Disco Compartido</li>
								<li>AC — Arquitectura Hibrida (Algo Compartido)</li>
							</ul>
							<p className="text-sm text-zinc-500 mt-1">
								Ejemplo: Apache Spark permite programar clusters con paralelismo de datos implicito.
							</p>
						</div>
					</li>
				</ul>
			</section>

			{/* Criterio 6 */}
			<section>
				<h3 className="text-base font-semibold text-zinc-200 mb-3">
					6. Segun el numero de sitios
				</h3>
				<ul className="space-y-2 text-zinc-300">
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-blue-400 font-bold">→</span>
						<span>
							<span className="font-medium text-zinc-200">Centralizada:</span> todos los datos en un
							solo sitio (servidor central).
						</span>
					</li>
					<li className="flex gap-2">
						<span className="shrink-0 mt-0.5 text-green-400 font-bold">→</span>
						<div>
							<span className="font-medium text-zinc-200">Distribuida:</span> datos distribuidos en
							multiples sitios conectados por red.
							<ul className="list-disc list-inside ml-4 mt-1 text-zinc-400 text-sm">
								<li>
									<span className="text-zinc-300">Homogenea:</span> todos los nodos usan el mismo
									DBMS.
								</li>
								<li>
									<span className="text-zinc-300">Heterogenea:</span> los nodos usan distintos
									DBMS.
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</section>

			{/* BD Relacional en profundidad */}
			<section className="border-t border-zinc-800 pt-6">
				<h3 className="text-base font-semibold text-zinc-200 mb-3">
					BD Relacional: conceptos fundamentales
				</h3>
				<p className="text-zinc-300 leading-relaxed mb-4">
					Las BD relacionales nacen en la decada de los 70, cuando Edgar Codd (IBM) propuso un modelo
					basado en la teoria matematica de relaciones. Una BD Relacional es un{' '}
					<span className="font-medium text-zinc-100">
						conjunto de tablas (relations) asociadas (relationships) entre si.
					</span>
				</p>

				<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 mb-4">
					{[
						['Relacion / Tabla', 'Estructura que almacena datos de un mismo tipo de entidad.'],
						['Tupla / Fila / Registro', 'Una instancia de la entidad. Identificada univocamente por la PK.'],
						['Atributo / Columna / Campo', 'Caracteristica de la entidad. Cada columna tiene un tipo de dato.'],
						['Dominio', 'Conjunto de valores validos para un atributo.'],
						['PRIMARY KEY (PK)', 'Campo(s) que identifican univocamente cada fila. No puede ser NULL.'],
						['FOREIGN KEY (FK)', 'Campo que referencia la PK de otra tabla para establecer la asociacion. Puede ser NULL.'],
					].map(([termino, def]) => (
						<div key={termino} className="p-3 bg-zinc-900 border border-zinc-800 rounded-md">
							<p className="text-xs font-semibold text-blue-300 mb-1">{termino}</p>
							<p className="text-xs text-zinc-400">{def}</p>
						</div>
					))}
				</div>

				<Callout type="warning" title="Relation vs Relationship">
					Son terminos distintos. <span className="font-semibold">Relation</span> es la estructura de
					datos de este modelo — equivale a una tabla.{' '}
					<span className="font-semibold">Relationship</span> es la asociacion entre las tablas, que
					se implementa a traves de atributos compartidos gracias a los conceptos de PRIMARY KEY y
					FOREIGN KEY.
				</Callout>

				<Callout type="warning" title="NULL">
					Valor especial que representa que aun no se conoce o no aplica el valor para ese atributo.
					No es cero ni blanco. Una PRIMARY KEY no puede ser NULL. Una FOREIGN KEY si puede ser NULL.
				</Callout>

				<h4 className="text-sm font-semibold text-zinc-300 mt-4 mb-2">Ejemplo SQL</h4>
				<pre className="bg-zinc-900 border border-zinc-800 rounded-md p-4 text-xs text-green-300 overflow-x-auto font-mono">
					{`CREATE TABLE ALUMNO
(
  RUT             char(9) primary key,
  ROL             char(8),
  NOMBRE          varchar(35) not null,
  INGRESO_CARRERA date,
  EGRESO_CARRERA  date
);

CREATE TABLE SOLICITUD
(
  CODSOL      number(4) primary key,
  FECHA       date,
  MOTIVO      varchar(50),
  RUT_ALUMNO  char(9) foreign key references ALUMNO(RUT)
);`}
				</pre>
			</section>
		</div>
	)
}

export function Topic14() {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-zinc-100">1.4 Proceso de Diseno de BD</h2>

			<h3 className="text-base font-semibold text-zinc-200">
				BD en el desarrollo de Sistemas de Informacion (SI)
			</h3>
			<p className="text-zinc-300 leading-relaxed">
				Un Sistema de Informacion (SI) es un conjunto de aplicaciones (software), datos, recursos
				materiales (equipos) y personas (usuarios) que interactuan para procesar datos y convertirlos
				en informacion relevante para una organizacion. Para desarrollar un SI se siguen estas etapas:
			</p>
			<div className="flex gap-1 flex-wrap my-3">
				{['Analisis', 'Diseno', 'Construccion', 'Implementacion', 'Mantenimiento'].map(
					(etapa, i, arr) => (
						<div key={etapa} className="flex items-center gap-1">
							<span className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-300">
								{etapa}
							</span>
							{i < arr.length - 1 && <span className="text-zinc-600">→</span>}
						</div>
					),
				)}
			</div>
			<p className="text-zinc-400 text-sm">
				Las etapas donde la BD tiene mayor impacto son{' '}
				<span className="text-zinc-300">Analisis</span> (donde se logra el modelo de datos
				conceptual) y <span className="text-zinc-300">Diseno</span> (donde se convierte ese modelo en
				uno implementable en el DBMS).
			</p>

			<h3 className="text-base font-semibold text-zinc-200 mt-4">
				Las 3 etapas del trabajo con BD
			</h3>

			<div className="space-y-4">
				<div className="border border-red-800 bg-red-950/20 rounded-md p-4">
					<p className="text-sm font-semibold text-red-300 mb-2">
						1. Modelamiento de Datos{' '}
						<span className="text-xs font-normal text-zinc-500">(rara vez)</span>
					</p>
					<p className="text-sm text-zinc-300">
						Captura los requerimientos de informacion de los usuarios y los traduce en un{' '}
						<span className="font-medium">modelo de datos conceptual</span> — un diagrama dibujado
						con alguna notacion estandar donde quedan reflejadas las entidades y asociaciones mas
						relevantes de la realidad.
					</p>
				</div>

				<div className="border border-blue-800 bg-blue-950/20 rounded-md p-4">
					<p className="text-sm font-semibold text-blue-300 mb-2">
						2. Diseno / Creacion de la BD{' '}
						<span className="text-xs font-normal text-zinc-500">(rara vez)</span>
					</p>
					<p className="text-sm text-zinc-300">
						Transforma el modelo conceptual en un{' '}
						<span className="font-medium">modelo de datos logico</span>, luego se escribe en el
						lenguaje que entiende el DBMS: comandos{' '}
						<span className="font-mono text-blue-300">DDL</span> (CREATE TABLE) para crear el
						Diccionario de Datos (Schema o esqueleto de la BD). En SQL esto se realiza a traves de
						CREATE TABLE; para cambios posteriores se usa ALTER TABLE.
					</p>
				</div>

				<div className="border border-green-800 bg-green-950/20 rounded-md p-4">
					<p className="text-sm font-semibold text-green-300 mb-2">
						3. Uso / Operacion de la BD{' '}
						<span className="text-xs font-normal text-zinc-500">(frecuentemente)</span>
					</p>
					<p className="text-sm text-zinc-300">
						Usuarios finales acceden constantemente via queries (
						<span className="font-mono text-green-300">SELECT</span>) y desarrolladores mantienen la
						BD via <span className="font-mono text-green-300">DML</span> (INSERT, UPDATE, DELETE). El
						DBA asegura la calidad de los datos y el manejo optimo de las consultas.
					</p>
				</div>
			</div>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">
				Niveles organizacionales y tipos de SI
			</h3>
			<p className="text-zinc-300 text-sm leading-relaxed mb-3">
				Los SI y las BD deben satisfacer los requerimientos de informacion de todos los niveles de la
				organizacion. Los requerimientos en cada nivel son bastante diferentes:
			</p>

			<div className="overflow-x-auto rounded-md border border-zinc-700">
				<table className="w-full text-xs border-collapse">
					<thead>
						<tr className="bg-zinc-800">
							<th className="text-left px-3 py-2 text-zinc-400 font-medium border-b border-zinc-700"></th>
							<th className="text-center px-3 py-2 text-blue-300 font-semibold border-b border-zinc-700">
								Nivel Estrategico
							</th>
							<th className="text-center px-3 py-2 text-purple-300 font-semibold border-b border-zinc-700">
								Nivel Tactico
							</th>
							<th className="text-center px-3 py-2 text-green-300 font-semibold border-b border-zinc-700">
								Nivel Operacional
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							['Decision que apoya', 'Planificacion a largo plazo', 'Control gerencial', 'Control operacional'],
							['Tipo de decision', 'No estructurada', 'Semiestructurada', 'Estructurada'],
							['Modelo mas usado', 'Predictivo', 'Descriptivo', 'Normativo'],
							['Fuente', 'Medio ambiente', 'Registros internos', 'Operacion interna'],
							['Exactitud', 'Razonable', 'Buena', 'Exacta'],
							['Amplitud', 'Resumida', 'Detallada', 'Muy detallada'],
							['Frecuencia', 'A solicitud', 'Periodica', 'Tiempo real'],
							['Rango de Tiempo', 'Anos', 'Anos', 'Meses'],
							['Uso', 'Prediccion', 'Control', 'Accion diaria'],
						].map(([fila, est, tac, ope], i) => (
							<tr key={fila} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/50'}>
								<td className="px-3 py-2 text-zinc-400 font-medium border-b border-zinc-800">
									{fila}
								</td>
								<td className="px-3 py-2 text-zinc-300 border-b border-zinc-800 text-center">
									{est}
								</td>
								<td className="px-3 py-2 text-zinc-300 border-b border-zinc-800 text-center">
									{tac}
								</td>
								<td className="px-3 py-2 text-zinc-300 border-b border-zinc-800 text-center">
									{ope}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h3 className="text-base font-semibold text-zinc-200 mt-6">Tipos de SI: OLTP vs OLAP</h3>

			<div className="grid gap-3 sm:grid-cols-2">
				<div className="border border-blue-700 bg-blue-950/20 rounded-md p-4">
					<p className="text-sm font-bold text-blue-300 mb-2">OLTP — Online Transaction Processing</p>
					<p className="text-sm text-zinc-300 mb-2">
						SI que automatizan los procesos de nivel operacional (transacciones del negocio). Por
						ejemplo, en un banco: apertura de cuentas, depositos, giros, pagos.
					</p>
					<ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside">
						<li>SI Operacionales (TPS — Transaction Processing Systems)</li>
						<li>SI Administrativos (MIS — Management Information Systems)</li>
					</ul>
				</div>
				<div className="border border-amber-700 bg-amber-950/20 rounded-md p-4">
					<p className="text-sm font-bold text-amber-300 mb-2">OLAP — Online Analytic Processing</p>
					<p className="text-sm text-zinc-300 mb-2">
						SI que apoyan el nivel estrategico. Decisiones a largo plazo con alto grado de
						incertidumbre: poner un nuevo producto en el mercado, abrir una nueva sucursal.
					</p>
					<ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside">
						<li>DSS (Decision Support Systems)</li>
						<li>Se apoyan en BD multidimensionales (Data Warehouse)</li>
					</ul>
				</div>
			</div>

			<h3 className="text-base font-semibold text-zinc-200 mt-4">
				Data Warehouse y Business Intelligence
			</h3>

			<Callout type="definition" title="Data Warehouse">
				&ldquo;Almacen&rdquo; donde las organizaciones pueden depositar todos aquellos datos con
				importancia critica para la toma de decisiones. Integra datos de los distintos sistemas OLTP
				de la organizacion. Se compone de 3 elementos:
				<ul className="list-disc list-inside mt-2 space-y-1">
					<li>
						<span className="font-medium">ETL (Extract, Transform, Load):</span> herramientas de
						software que extraen, transforman y cargan datos desde fuentes operacionales y externas.
					</li>
					<li>Un warehouse (almacen) para almacenar los datos seleccionados.</li>
					<li>Herramientas para analizar los datos del warehouse (OLAP, Data Mining).</li>
				</ul>
			</Callout>

			<p className="text-zinc-300 text-sm leading-relaxed">
				Los sistemas OLTP van registrando transacciones en el tiempo. Esos datos, cuando pierden
				vigencia operacional, pasan a conformar{' '}
				<span className="font-medium text-zinc-100">archivos historicos</span>. Con el tiempo se
				generan grandes volumenes de datos — una &ldquo;mina de oro&rdquo; para inferir el futuro via
				analisis estadistico.
			</p>

			<Callout type="example" title="Business Intelligence (BI)">
				Concepto integrador que engloba el Data Warehouse, los sistemas OLAP y los algoritmos de Data
				Mining (redes neuronales, arboles de decision, analisis estadistico). El objetivo es generar
				conocimiento que permita rentabilizar mejor a la organizacion a partir de sus datos
				historicos.
			</Callout>
		</div>
	)
}
