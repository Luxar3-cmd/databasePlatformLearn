export interface QuizQuestion {
	id: string
	topic: '1.1' | '1.2' | '1.3' | '1.4'
	question: string
	options: string[]
	correctIndex: number
	explanation: string
}

export const U1_QUIZ: QuizQuestion[] = [
	// Topic 1.1: Dato, Informacion, BD, DBMS
	{
		id: 'q1',
		topic: '1.1',
		question: 'La nota "4.7" sacada en INF-239 es un dato. ¿Que la convierte en informacion?',
		options: [
			'Guardarlo en una base de datos',
			'Interpretarlo en contexto: es la nota final del curso, y defines si pasas o no',
			'Escribirlo en un archivo .txt',
			'Que el profe lo ingrese al sistema academico',
		],
		correctIndex: 1,
		explanation: 'El dato "4.7" por si solo es solo un numero. La informacion surge cuando le damos contexto y significado: es tu nota final, el minimo para pasar es 4.0, por lo tanto aprobaste. Sin contexto, el dato no sirve de nada.',
	},
	{
		id: 'q2',
		topic: '1.1',
		question: '¿Cual es la diferencia principal entre una base de datos y un DBMS?',
		options: [
			'No hay diferencia, son lo mismo',
			'La base de datos es el software y el DBMS son los datos',
			'La base de datos es la coleccion de datos; el DBMS es el software que la gestiona',
			'El DBMS solo existe en la nube',
		],
		correctIndex: 2,
		explanation: 'La BD son los datos en si (las tablas, filas, relaciones). El DBMS es el software que te permite crear, consultar y modificar esos datos. PostgreSQL es un DBMS; la base de datos de la UTFSM con los alumnos es una BD.',
	},
	{
		id: 'q3',
		topic: '1.1',
		question: 'Spotify guarda que canciones escuchaste. ¿Como se llama la propiedad que garantiza que esos datos son correctos y no estan corrompidos?',
		options: [
			'Disponibilidad',
			'Integridad de datos',
			'Redundancia controlada',
			'Concurrencia',
		],
		correctIndex: 1,
		explanation: 'La integridad de datos garantiza que la informacion almacenada es correcta, consistente y confiable. Si Spotify dice que escuchaste 3000 minutos de Bad Bunny en 2024, esos datos deben ser precisos, no estar corruptos ni duplicados.',
	},
	// Topic 1.2: Enfoque archivos vs BD, redundancia, inconsistencia
	{
		id: 'q4',
		topic: '1.2',
		question: 'La DRG (Direccion de Registro) de la UTFSM guarda el RUT de un alumno en el archivo de "matrículas.xlsx" y en "pagos.xlsx". Si el alumno cambia su correo, ¿que problema clasico del enfoque de archivos ocurre?',
		options: [
			'Falta de seguridad',
			'Redundancia que genera inconsistencia — el correo queda distinto en cada archivo',
			'El archivo se corrompe automaticamente',
			'No se puede abrir el Excel en Linux',
		],
		correctIndex: 1,
		explanation: 'La redundancia (mismo dato en multiples archivos) es inofensiva mientras todo sea identico. El problema real es cuando se actualiza en un archivo pero no en otro: inconsistencia. El DBMS resuelve esto con un unico punto de verdad para cada dato.',
	},
	{
		id: 'q5',
		topic: '1.2',
		question: '¿Cual es el principal problema de que cada departamento de una empresa tenga su propio archivo de clientes?',
		options: [
			'Los archivos ocupan mucho espacio en disco',
			'No se pueden abrir al mismo tiempo',
			'Los datos quedan aislados por departamento y es dificil cruzar informacion entre ellos',
			'Los archivos de texto plano son mas lentos que Excel',
		],
		correctIndex: 2,
		explanation: 'Este es el problema de "silos de datos" o dependencia de datos/programas. Ventas tiene sus clientes, soporte tiene los suyos, y no hay forma facil de cruzarlos sin exportar y fusionar manualmente. Una BD centralizada elimina este problema.',
	},
	{
		id: 'q6',
		topic: '1.2',
		question: 'En el enfoque de archivos tradicional, un desarrollador cambia el formato del archivo de alumnos de .csv a .json. ¿Que pasa con todos los programas que lean ese archivo?',
		options: [
			'Se actualizan automaticamente',
			'Hay que modificar cada programa que lea ese archivo — esto es dependencia programa-datos',
			'Solo hay que actualizar el programa principal',
			'El sistema operativo maneja la conversion transparentemente',
		],
		correctIndex: 1,
		explanation: 'En el enfoque de archivos existe una fuerte dependencia entre los programas y la estructura fisica de los datos. Si cambias el formato, tienes que reescribir todos los programas que lo usan. El DBMS abstrae esta dependencia: cambias el esquema interno y las aplicaciones se mantienen igual.',
	},
	// Topic 1.3: Tipos BD segun criterios, relacional, NoSQL, OLTP/OLAP
	{
		id: 'q7',
		topic: '1.3',
		question: 'Netflix guarda el perfil de usuario, su lista de favoritos y su historial. Los datos tienen relaciones claras entre si. ¿Que tipo de base de datos se adapta mejor a este caso?',
		options: [
			'Base de datos de documentos (MongoDB)',
			'Base de datos relacional (PostgreSQL, MySQL)',
			'Base de datos de grafos (Neo4j)',
			'Base de datos clave-valor (Redis)',
		],
		correctIndex: 1,
		explanation: 'Cuando los datos tienen estructura clara y relaciones bien definidas (usuario -> perfil -> historial -> pelicula), una BD relacional es la opcion natural. Las tablas con PK/FK modelan exactamente estas relaciones. Netflix en la practica usa una combinacion, pero para este tipo de datos las relacionales son el punto de partida.',
	},
	{
		id: 'q8',
		topic: '1.3',
		question: 'El sistema de ventas del Falabella procesa miles de transacciones por hora: compras, devoluciones, pagos. ¿Que tipo de sistema de BD corresponde?',
		options: [
			'OLAP (Online Analytical Processing)',
			'Data Warehouse',
			'OLTP (Online Transaction Processing)',
			'Base de datos de series temporales',
		],
		correctIndex: 2,
		explanation: 'OLTP esta disenado para muchas transacciones pequenas y rapidas en tiempo real: INSERT, UPDATE, SELECT de pocas filas. Es lo que necesita Falabella para registrar cada venta al instante. OLAP en cambio es para consultas analiticas complejas sobre datos historicos.',
	},
	{
		id: 'q9',
		topic: '1.3',
		question: 'Twitter necesita almacenar millones de tweets, cada uno con estructura variable (algunos tienen imagen, otros video, otros solo texto). ¿Que tipo de BD es mas adecuada?',
		options: [
			'Base de datos relacional con esquema fijo',
			'Base de datos de documentos (NoSQL) que permite esquemas flexibles',
			'Base de datos columnar para analisis',
			'Archivo CSV por fecha',
		],
		correctIndex: 1,
		explanation: 'Las BD de documentos (como MongoDB) permiten que cada documento tenga distintos campos. Un tweet con imagen tiene campos diferentes a uno de solo texto. Forzar esto en un esquema relacional fijo generaria muchas columnas nulas, lo que es ineficiente y dificil de mantener.',
	},
	// Topic 1.4: Proceso de diseno, etapas, DW, ETL
	{
		id: 'q10',
		topic: '1.4',
		question: 'El equipo de TI de la UTFSM quiere disenar la BD para el sistema de matriculas. ¿En que etapa del diseno identifican las entidades (Alumno, Carrera, Ramo) y sus relaciones, sin preocuparse de como se implementara en SQL?',
		options: [
			'Diseno Fisico',
			'Diseno Logico',
			'Diseno Conceptual (Modelo E-R)',
			'Normalizacion',
		],
		correctIndex: 2,
		explanation: 'El diseno conceptual usa el Modelo Entidad-Relacion (E-R) para capturar que entidades existen y como se relacionan, completamente independiente del DBMS elegido. Es el "mapa del territorio" antes de construir nada. El diseno logico traduce eso a tablas, y el fisico decide indexos, particiones, etc.',
	},
	{
		id: 'q11',
		topic: '1.4',
		question: 'Un Data Warehouse consolida datos de ventas de los ultimos 10 anos para que los directivos de Cencosud analicen tendencias. ¿Cual de estas afirmaciones describe mejor un DW?',
		options: [
			'Es una BD transaccional que procesa compras en tiempo real',
			'Es un repositorio integrado, historico y orientado al analisis de datos de multiples fuentes',
			'Es un sistema de archivos Excel centralizado',
			'Es una base de datos NoSQL para datos no estructurados',
		],
		correctIndex: 1,
		explanation: 'Un Data Warehouse no se usa para transacciones del dia a dia. Se usa para analisis estrategico: tendencias de ventas, comportamiento de clientes, proyecciones. Integra datos de multiples sistemas (ERP, CRM, e-commerce) y los guarda historicamente para consultas tipo OLAP.',
	},
	{
		id: 'q12',
		topic: '1.4',
		question: 'El proceso ETL en un Data Warehouse extrae datos de SAP, los limpia (elimina duplicados y errores) y los carga en el DW. ¿Que significa ETL?',
		options: [
			'Execute, Transfer, Load',
			'Extract, Transform, Load',
			'Extract, Test, Link',
			'Encode, Transfer, Log',
		],
		correctIndex: 1,
		explanation: 'ETL es el proceso de tres pasos para poblar un Data Warehouse: Extract (extraer datos de los sistemas fuente), Transform (limpiar, homogeneizar y transformar los datos a un formato comun), y Load (cargar los datos ya procesados en el DW). Sin ETL, el DW tendria datos sucios e inconsistentes.',
	},
	{
		id: 'q13',
		topic: '1.4',
		question: '¿Cual es el orden correcto de las etapas del diseno de una base de datos?',
		options: [
			'Fisico -> Logico -> Conceptual',
			'Logico -> Conceptual -> Fisico',
			'Conceptual -> Logico -> Fisico',
			'Conceptual -> Fisico -> Logico',
		],
		correctIndex: 2,
		explanation: 'El diseno sigue una secuencia top-down: primero el Conceptual (que entidades y relaciones existen, sin tecnicismos), luego el Logico (como se representan en tablas y columnas, con tipos de datos), y finalmente el Fisico (como se implementa concretamente en un DBMS especifico, con indexos y particiones).',
	},
]
