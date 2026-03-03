export interface SolvedStep {
	step: number
	text: string
}

export interface SolvedExercise {
	id: string
	type: 'desventajas-archivos' | 'clasificar-bd' | 'niveles-organizacionales' | 'problemas-soluciones'
	title: string
	scenario: string
	steps: SolvedStep[]
}

export const U1_SOLVED_EXERCISES: SolvedExercise[] = [
	// --- Tipo 1: Desventajas del enfoque de archivos ---
	{
		id: 'solved-u1-01',
		type: 'desventajas-archivos',
		title: 'La biblioteca de la UTFSM y sus planillas',
		scenario:
			'La biblioteca de la UTFSM Casa Central tiene un archivo Excel por facultad: "Prestamos_Ingenieria.xlsx", "Prestamos_Ciencias.xlsx", etc. Cuando un alumno de Ingenieria devuelve un libro, la bibliotecaria actualiza solo su planilla. Un alumno de Ciencias que pide el mismo libro al dia siguiente lo obtiene porque su planilla dice que esta disponible. Identifica las desventajas del enfoque de archivos que aparecen aqui.',
		steps: [
			{
				step: 1,
				text: 'Piensa: hay varios archivos que guardan informacion del mismo libro (el catalogo). Eso es redundancia de datos — el mismo dato (disponibilidad del libro) existe en multiples lugares.',
			},
			{
				step: 2,
				text: 'Cuando se actualiza un archivo pero no los demas, los datos quedan inconsistentes. El libro aparece disponible en un archivo y prestado en otro — eso es inconsistencia de datos.',
			},
			{
				step: 3,
				text: 'No hay mecanismo para coordinar el acceso concurrente. Si dos bibliotecarias intentan prestar el mismo libro al mismo tiempo desde archivos separados, ambas pueden creer que esta disponible.',
			},
			{
				step: 4,
				text: 'Conclusion: este escenario ilustra tres desventajas clasicas del enfoque de archivos — redundancia, inconsistencia, y falta de control de concurrencia. Una BD centralizada mantendria un unico registro del estado de cada libro.',
			},
		],
	},
	{
		id: 'solved-u1-02',
		type: 'desventajas-archivos',
		title: 'Spotify y las playlists locales (version prehistorica)',
		scenario:
			'Imagina que Spotify en sus primeros dias guardara las playlists en archivos de texto por usuario: "playlist_juanito.txt", "playlist_maria.txt". Cada archivo tiene lineas como "Bohemian Rhapsody - Queen - rock". El equipo de analytics quiere saber cuantos usuarios escuchan rock. Para hacerlo, tienen que escribir un script especifico que lea el formato de ese archivo. Al mes siguiente, el equipo de recomendaciones quiere lo mismo, pero el formato del archivo cambio (ahora usa comas en vez de guiones). Identifica las desventajas del enfoque de archivos.',
		steps: [
			{
				step: 1,
				text: 'El formato de los datos esta embebido en el programa que los lee. Si el formato cambia, todos los programas que acceden al archivo deben actualizarse. Eso es dependencia datos-programas.',
			},
			{
				step: 2,
				text: 'Cada equipo (analytics, recomendaciones, etc.) escribe su propio codigo para leer el mismo archivo con el mismo dato. No hay una forma estandar de consultar — es lo que se llama falta de interfaz de consulta comun.',
			},
			{
				step: 3,
				text: 'Si el genero "rock" se escribe como "Rock", "rock", "ROCK" en distintos archivos, no hay forma de unificarlos facilmente. Eso es problema de inconsistencia de representacion — sin esquema, cada archivo puede tener su propio formato.',
			},
			{
				step: 4,
				text: 'Con una BD, el esquema define la estructura una vez. Todos los programas consultan con SQL estandar y el cambio de estructura se maneja con migraciones, no editando codigo de cada aplicacion.',
			},
		],
	},

	// --- Tipo 2: Clasificar tipos de BD ---
	{
		id: 'solved-u1-03',
		type: 'clasificar-bd',
		title: 'Netflix: clasifica su base de datos de catalogo',
		scenario:
			'Netflix necesita almacenar: el catalogo de peliculas y series (titulo, anio, duracion, descripcion), el historial de visualizacion de cada usuario (que vio, cuando, hasta que minuto llego), y las valoraciones (1-5 estrellas). El equipo tecnico debate que tipo de BD usar. Clasifica segun: modelo de datos, proposito y contenido.',
		steps: [
			{
				step: 1,
				text: 'Modelo de datos: El catalogo tiene estructura clara y relaciones fijas (pelicula tiene generos, actores, etc.). Un modelo relacional encaja bien para el catalogo. El historial tiene estructura semi-variable (puede tener subtitulos vistos, calidad de stream, etc.) — ahi podria convenir NoSQL documental.',
			},
			{
				step: 2,
				text: 'Proposito: El catalogo es principalmente de consulta (usuarios buscan peliculas) — OLTP con muchas lecturas. El historial y valoraciones son de escritura frecuente (cada reproduccion genera eventos) — tambien OLTP pero write-heavy.',
			},
			{
				step: 3,
				text: 'Contenido: El catalogo contiene datos operacionales (el negocio del dia a dia). Si Netflix quisiera analizar tendencias globales de consumo por region, necesitaria un Data Warehouse separado — eso seria OLAP.',
			},
			{
				step: 4,
				text: 'Conclusion: Netflix en la realidad usa una combinacion — MySQL/CockroachDB para datos operacionales estructurados, Cassandra (NoSQL) para el historial de visualizacion a escala masiva, y un DW separado para analytics. Ninguna BD unica resuelve todo.',
			},
		],
	},
	{
		id: 'solved-u1-04',
		type: 'clasificar-bd',
		title: 'Sistema academico UTFSM: clasifica la BD de inscripciones',
		scenario:
			'El sistema de inscripciones de la UTFSM guarda: datos de alumnos (rut, nombre, carrera), asignaturas (codigo, nombre, creditos, cupos), inscripciones (alumno + asignatura + semestre + nota), y horarios de clases. En periodo de inscripciones, miles de alumnos se conectan al mismo tiempo para inscribir ramos. El jefe de carrera usa otro sistema para ver estadisticas de reprobacion por semestre. Clasifica las dos BD segun modelo, proposito y contenido.',
		steps: [
			{
				step: 1,
				text: 'El sistema de inscripciones: Modelo relacional (hay relaciones claras: alumno inscribe asignatura, asignatura pertenece a departamento). Las tablas tienen esquema fijo y se necesitan JOINs para consultas como "alumnos con mas de 55 creditos aprobados".',
			},
			{
				step: 2,
				text: 'Proposito del sistema de inscripciones: OLTP — muchas transacciones cortas y concurrentes (inscribo ramo, cancelo ramo, actualizo nota). La concurrencia es critica: dos alumnos no pueden tomar el ultimo cupo.',
			},
			{
				step: 3,
				text: 'El sistema de estadisticas del jefe de carrera: Proposito OLAP — consultas complejas sobre datos historicos (promedio de reprobacion de los ultimos 5 semestres por asignatura). Pocas escrituras, mucha lectura agregada.',
			},
			{
				step: 4,
				text: 'Contenido: BD inscripciones = datos operacionales actuales. BD estadisticas = datos historicos consolidados (podria ser un Data Warehouse o incluso vistas materializadas sobre la BD operacional en una universidad mas pequena).',
			},
		],
	},

	// --- Tipo 3: Niveles organizacionales ---
	{
		id: 'solved-u1-05',
		type: 'niveles-organizacionales',
		title: 'Clinica Alemana: mapea roles a sistemas de informacion',
		scenario:
			'En Clinica Alemana trabajan: el Director General (revisa metricas mensuales: ingresos, ocupacion de camas, costos por departamento), los Medicos (consultan ficha clinica del paciente, registran diagnostico y receta), la Recepcion (agenda citas, verifica disponibilidad de medicos, registra llegada de pacientes), y el Gerente de RRHH (analiza rotacion de personal y proyecta contrataciones para el proximo anio). Mapea cada rol al nivel organizacional y tipo de SI correspondiente.',
		steps: [
			{
				step: 1,
				text: 'Recepcion → Nivel Operativo. Realiza transacciones del dia a dia: agendar cita, registrar llegada. El SI que usan es un Sistema de Procesamiento de Transacciones (TPS) — captura y procesa eventos operacionales en tiempo real.',
			},
			{
				step: 2,
				text: 'Medicos → Nivel Operativo tambien, pero especializado. Consultan y registran informacion clinica. Usan un Sistema de Informacion Clinica (tipo HIS - Hospital Information System), que es un TPS especializado en salud.',
			},
			{
				step: 3,
				text: 'Gerente de RRHH → Nivel Tactico (mandos medios). Analiza tendencias de rotacion para planificar contrataciones. Usa un Sistema de Informacion Gerencial (MIS) — consolida datos operativos en reportes periodicos para tomar decisiones departamentales.',
			},
			{
				step: 4,
				text: 'Director General → Nivel Estrategico. Toma decisiones de largo plazo basadas en metricas globales. Usa un Sistema de Soporte a Decisiones (DSS) o Executive Information System (EIS) — dashboards con KPIs de toda la organizacion.',
			},
			{
				step: 5,
				text: 'El patron clave: mientras mas arriba en la jerarquia, mas agregada y menos frecuente es la informacion. Operativo = datos atomicos en tiempo real. Estrategico = datos consolidados periodicos para decidir el rumbo.',
			},
		],
	},
	{
		id: 'solved-u1-06',
		type: 'niveles-organizacionales',
		title: 'Falabella.com: quien usa que sistema',
		scenario:
			'En Falabella e-commerce trabajan: el Bodeguero (registra entrada y salida de productos del inventario, confirma despachos), el Jefe de Categoria (revisa ventas semanales por producto para decidir que promover), el Analista de Pricing (ajusta precios diariamente segun demanda y competencia), y el CEO (evalua expansion a nuevos mercados latinoamericanos). Mapea cada rol a su nivel organizacional y tipo de SI.',
		steps: [
			{
				step: 1,
				text: 'Bodeguero → Nivel Operativo. Opera el TPS de inventario: cada movimiento de producto (entrada, salida, devolucion) es una transaccion que debe registrarse inmediatamente para que el stock sea preciso.',
			},
			{
				step: 2,
				text: 'Analista de Pricing → Nivel Operativo-Tactico. Aunque ajusta precios diariamente (parece operativo), sus decisiones se basan en analisis de datos. Usa herramientas de Business Intelligence (BI) con datos casi en tiempo real — un DSS liviano.',
			},
			{
				step: 3,
				text: 'Jefe de Categoria → Nivel Tactico. Revisa reportes semanales consolidados para decidir que productos promover. Usa un MIS — informes periodicos que agregan los datos del TPS de ventas.',
			},
			{
				step: 4,
				text: 'CEO → Nivel Estrategico. Evalua mercados, proyecta expansion. Usa un EIS o DSS estrategico con datos de multiples paises, proyecciones financieras y analisis de mercado — informacion altamente agregada y orientada al futuro.',
			},
		],
	},

	// --- Tipo 4: Problemas vs soluciones BD ---
	{
		id: 'solved-u1-07',
		type: 'problemas-soluciones',
		title: 'Hospital con datos duplicados de pacientes',
		scenario:
			'Un hospital guarda datos de pacientes en archivos separados por departamento. El departamento de Cardiologia tiene "Pacientes_Cardio.dat" y Traumatologia tiene "Pacientes_Trauma.dat". Juan Perez aparece en ambos con distintas direcciones (se cambio de domicilio y solo uno fue actualizado). El medico de Cardio ve la direccion incorrecta. Ademas, nadie sabe con certeza cuantos pacientes distintos tiene el hospital en total. Que soluciones ofrece una BD a estos problemas?',
		steps: [
			{
				step: 1,
				text: 'Problema 1: Redundancia — Juan Perez existe en multiples archivos. Solucion BD: centralizar los datos del paciente en una unica tabla Pacientes. Todos los departamentos referencian al mismo registro via FK. Si Juan actualiza su direccion, se actualiza en un solo lugar.',
			},
			{
				step: 2,
				text: 'Problema 2: Inconsistencia — el dato actualizado en un archivo no se refleja en el otro. Solucion BD: al existir una sola fuente de verdad, no puede haber inconsistencia entre "copias". La inconsistencia es imposible por diseno.',
			},
			{
				step: 3,
				text: 'Problema 3: Imposibilidad de consultas globales — no saben cuantos pacientes totales hay. Solucion BD: con una tabla centralizada, `SELECT COUNT(DISTINCT rut) FROM pacientes` responde en milisegundos. Con archivos separados, necesitas sumar y deduplicar manualmente.',
			},
			{
				step: 4,
				text: 'La BD no solo resuelve estos problemas — los previene estructuralmente. La redundancia minima es un principio de diseno de BD, no algo que depende de la disciplina de cada operador.',
			},
		],
	},
	{
		id: 'solved-u1-08',
		type: 'problemas-soluciones',
		title: 'Startup con acceso no controlado a datos sensibles',
		scenario:
			'Una startup de fintech guarda datos de transacciones de usuarios en un servidor de archivos compartido. Cualquier empleado puede acceder a cualquier archivo si sabe la ruta. El desarrollador junior que agrego la feature de reportes puede leer el archivo con numeros de tarjeta de credito. El soporte al cliente puede ver balances de todos los usuarios. No hay log de quien accedio a que. Identifica los problemas y como una BD los resuelve.',
		steps: [
			{
				step: 1,
				text: 'Problema 1: Sin control de acceso granular. En un sistema de archivos, el control es a nivel de archivo completo (puedes leer el archivo o no). Solucion BD: control de acceso a nivel de tabla, columna, o fila. El desarrollador junior puede leer la tabla de reportes pero no la de tarjetas. El soporte puede ver su propio usuario pero no el de otros (row-level security).',
			},
			{
				step: 2,
				text: 'Problema 2: Sin auditoria. No hay registro de quien accedio a que dato cuando. Solucion BD: los DBMS modernos tienen audit logs — cada query, cada acceso a datos sensibles queda registrado con timestamp y usuario. Critico para cumplir regulaciones como PCI-DSS (tarjetas de credito).',
			},
			{
				step: 3,
				text: 'Problema 3: Sin integridad de datos. Cualquiera puede editar un archivo y corromper datos (accidental o maliciosamente). Solucion BD: las transacciones garantizan atomicidad (o se hace todo o nada) y los constraints garantizan integridad (no puedes dejar un campo obligatorio vacio).',
			},
			{
				step: 4,
				text: 'En fintech, estos tres problemas no son opcionales de resolver — son requisitos regulatorios. Una BD bien configurada es la base tecnica para cumplir con seguridad de datos en industrias reguladas.',
			},
		],
	},
]
