import type { Exercise } from '@/types/sql'

export const U1_EXERCISES: Exercise[] = [
	{
		id: 'u1-ex-1',
		title: 'Explorar alumnos',
		description: 'Obtener todos los alumnos ordenados por apellido',
		hint: 'Usa SELECT * con ORDER BY sobre la columna apellido',
		solution: 'SELECT * FROM alumnos ORDER BY apellido',
		initialQuery: 'SELECT * FROM alumnos',
		difficulty: 'basico',
	},
	{
		id: 'u1-ex-2',
		title: 'Filtrar por nota',
		description: 'Obtener nombre y apellido de los alumnos con nota mayor o igual a 5.0 en alguna inscripcion',
		hint: 'Necesitas un JOIN entre alumnos e inscripciones, y un WHERE sobre la nota',
		solution: 'SELECT DISTINCT a.nombre, a.apellido FROM alumnos a JOIN inscripciones i ON a.id = i.alumno_id WHERE i.nota >= 5.0',
		initialQuery: 'SELECT * FROM inscripciones WHERE nota >= 5.0',
		difficulty: 'basico',
	},
	{
		id: 'u1-ex-3',
		title: 'Asignaturas por departamento',
		description: "Listar las asignaturas del departamento de Informatica con su codigo y creditos",
		hint: 'JOIN entre asignaturas y departamentos, filtrando por nombre del departamento',
		solution: "SELECT asig.codigo, asig.nombre, asig.creditos FROM asignaturas asig JOIN departamentos d ON asig.departamento_id = d.id WHERE d.nombre = 'Informatica'",
		difficulty: 'intermedio',
	},
	{
		id: 'u1-ex-4',
		title: 'Conteo de inscripciones',
		description: 'Contar cuantos alumnos estan inscritos en cada asignatura, mostrando el codigo de la asignatura',
		hint: 'Usa GROUP BY sobre el codigo de asignatura con COUNT',
		solution: 'SELECT asig.codigo, COUNT(*) as total_inscritos FROM inscripciones i JOIN asignaturas asig ON i.asignatura_id = asig.id GROUP BY asig.codigo',
		difficulty: 'intermedio',
	},
	{
		id: 'u1-ex-5',
		title: 'Promedio por asignatura',
		description: 'Calcular el promedio de notas por asignatura, mostrando solo las que tengan promedio sobre 4.0',
		hint: 'Usa AVG con GROUP BY y filtra con HAVING (no WHERE, porque filtras sobre el agregado)',
		solution: 'SELECT asig.codigo, AVG(i.nota) as promedio FROM inscripciones i JOIN asignaturas asig ON i.asignatura_id = asig.id GROUP BY asig.codigo HAVING AVG(i.nota) > 4.0',
		difficulty: 'avanzado',
	},
	{
		id: 'u1-ex-6',
		title: 'Profesores y sus asignaturas',
		description: 'Listar todos los profesores con el nombre de su departamento, ordenados por departamento y apellido',
		hint: 'JOIN entre profesores y departamentos, con ORDER BY en dos columnas',
		solution: 'SELECT p.nombre, p.apellido, d.nombre as departamento FROM profesores p JOIN departamentos d ON p.departamento_id = d.id ORDER BY d.nombre, p.apellido',
		difficulty: 'avanzado',
	},
]
