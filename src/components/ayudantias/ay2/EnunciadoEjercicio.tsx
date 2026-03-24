import { useState } from 'react'
import { ChevronDown, ChevronUp, Store, ShoppingBag, UserCheck, Receipt, MapPin } from 'lucide-react'
import { Callout } from '@/components/ui/Callout'
import { MermaidDiagram } from '@/components/ui/MermaidDiagram'

const ER_DIAGRAM = `erDiagram
    TIPO_PRODUCTO ||--o{ PRODUCTO : "clasifica"
    LOCAL ||--o{ PRODUCTO : "ofrece"
    EMPLEADO ||--o{ VENTA : "realiza"
    PRODUCTO ||--o{ VENTA : "se vende en"
    TIPO_PRODUCTO {
        int id_tipo PK
        string nombre UK
    }
    LOCAL {
        int id_local PK
        string nombre UK
        string ciudad
    }
    PRODUCTO {
        int id_producto PK
        string nombre
        decimal precio
        int id_tipo FK
        int id_local FK
    }
    EMPLEADO {
        int id_empleado PK
        string alias UK
        string cargo
    }
    VENTA {
        int id_empleado PK
        int id_producto PK
        int cantidad
        date fecha
    }`

function FormField({ label, required, placeholder, className }: { label: string; required?: boolean; placeholder?: string; className?: string }) {
	return (
		<div className={`flex flex-col gap-1 ${className ?? ''}`}>
			<span className="text-stone-400 text-xs">
				{label} {required && <span className="text-red-400">(*)</span>}
			</span>
			<div className="bg-stone-800 border border-stone-700 rounded px-2 py-1.5 text-stone-500 text-xs min-h-[28px]">
				{placeholder ?? ''}
			</div>
		</div>
	)
}

function FormSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
	return (
		<div className="border border-stone-700 rounded-md overflow-hidden">
			<div className="bg-amber-950/30 border-b border-stone-700 px-4 py-2 flex items-center gap-2">
				{icon}
				<span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{title}</span>
			</div>
			<div className="bg-stone-900 p-4">
				{children}
			</div>
		</div>
	)
}

export default function EnunciadoEjercicio() {
	const [diagramOpen, setDiagramOpen] = useState(true)

	return (
		<div className="flex flex-col gap-8">
			{/* ═══════════════════════════════════════════════════════════════
			    SECTION 1: HEADER
			    ═══════════════════════════════════════════════════════════════ */}
			<div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
				<div className="flex items-center gap-2 mb-1">
					<span className="px-2 py-0.5 rounded border text-xs font-semibold bg-amber-950/30 border-amber-700/50 text-amber-400">
						INF-239
					</span>
					<span className="text-stone-500 text-xs">Bases de Datos — UTFSM</span>
				</div>
				<h2 className="font-serif text-xl font-semibold text-stone-100 mt-3">
					Ejercicio Practico — Los Pollos Hermanos
				</h2>
				<p className="text-stone-400 text-sm mt-1">
					Modelamiento de Bases de Datos y Consultas SQL
				</p>
			</div>

			{/* ═══════════════════════════════════════════════════════════════
			    SECTION 2: DESCRIPCION DEL PROBLEMA
			    ═══════════════════════════════════════════════════════════════ */}
			<div className="flex flex-col gap-4">
				<h3 className="font-serif text-base font-semibold text-stone-100">
					1. Descripcion del Problema
				</h3>
				<div className="flex flex-col gap-3 text-stone-300 text-sm leading-relaxed">
					<p>
						La cadena de restaurantes <strong className="text-stone-100">Los Pollos Hermanos</strong>, reconocida por su pollo frito y su impecable servicio, necesita digitalizar la gestion de sus locales, productos, empleados y ventas. Actualmente la informacion se maneja en formularios en papel y hojas de calculo, lo que dificulta generar reportes y tomar decisiones. Se requiere disenar e implementar una base de datos relacional que permita registrar la informacion de los locales de la franquicia, su menu de productos (con tipos y precios), los empleados que trabajan en la cadena, y las ventas realizadas por cada empleado.
					</p>
				</div>
			</div>

			{/* ═══════════════════════════════════════════════════════════════
			    SECTION 3: FORMULARIO VISUAL
			    ═══════════════════════════════════════════════════════════════ */}
			<div className="flex flex-col gap-4">
				<h3 className="font-serif text-base font-semibold text-stone-100">
					2. Formulario de Registro
				</h3>

				<div className="border-2 border-amber-700/50 rounded-lg overflow-hidden">
					<div className="bg-amber-950/40 border-b-2 border-amber-700/50 px-5 py-3 text-center">
						<h4 className="text-amber-400 font-bold text-sm uppercase tracking-widest">
							Registro Los Pollos Hermanos
						</h4>
						<p className="text-stone-500 text-xs mt-1">Formulario oficial de registro</p>
					</div>

					<div className="bg-stone-950 p-5 flex flex-col gap-5">
						<FormSection title="Datos del Local" icon={<Store size={14} className="text-amber-400" />}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
								<FormField label="Nombre Local" required />
								<FormField label="Ciudad" required />
							</div>
						</FormSection>

						<FormSection title="Datos del Producto" icon={<ShoppingBag size={14} className="text-amber-400" />}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
								<FormField label="Nombre Producto" required />
								<FormField label="Precio" required placeholder="$" />
								<FormField label="Tipo Producto" required />
								<FormField label="Local" required />
							</div>
						</FormSection>

						<FormSection title="Datos del Empleado" icon={<UserCheck size={14} className="text-amber-400" />}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
								<FormField label="Alias" required />
								<FormField label="Cargo" required />
							</div>
						</FormSection>

						<FormSection title="Registro de Venta" icon={<Receipt size={14} className="text-amber-400" />}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
								<FormField label="Empleado" required />
								<FormField label="Producto" required />
								<FormField label="Cantidad" required />
								<FormField label="Fecha" required placeholder="dd/mm/aaaa" />
							</div>
						</FormSection>
					</div>
				</div>
			</div>

			{/* ═══════════════════════════════════════════════════════════════
			    SECTION 4: CONSIDERACIONES
			    ═══════════════════════════════════════════════════════════════ */}
			<div className="flex flex-col gap-4">
				<h3 className="font-serif text-base font-semibold text-stone-100">
					3. Consideraciones
				</h3>

				<Callout type="definition" title="Reglas y restricciónes del dominio">
					<ul className="flex flex-col gap-2.5 list-disc list-inside marker:text-blue-400/60">
						<li>
							Los campos marcados con <strong className="text-stone-100">(*)</strong> son obligatorios (NOT NULL).
						</li>
						<li>
							Los tipos de producto son valores fijos: <strong className="text-stone-100">Pollo</strong>, <strong className="text-stone-100">Acompañamiento</strong>, <strong className="text-stone-100">Bebida</strong>, <strong className="text-stone-100">Postre</strong>.
						</li>
						<li>
							Los locales de la franquicia son:
							<ol className="mt-2 ml-4 flex flex-col gap-1 list-decimal list-inside text-stone-400">
								<li className="flex items-center gap-2">
									<MapPin size={12} className="text-stone-600 shrink-0" />
									<span>Los Pollos Hermanos Albuquerque</span>
								</li>
								<li className="flex items-center gap-2">
									<MapPin size={12} className="text-stone-600 shrink-0" />
									<span>Los Pollos Hermanos El Paso</span>
								</li>
								<li className="flex items-center gap-2">
									<MapPin size={12} className="text-stone-600 shrink-0" />
									<span>Los Pollos Hermanos Santa Fe</span>
								</li>
								<li className="flex items-center gap-2">
									<MapPin size={12} className="text-stone-600 shrink-0" />
									<span>Los Pollos Hermanos Phoenix</span>
								</li>
								<li className="flex items-center gap-2">
									<MapPin size={12} className="text-stone-600 shrink-0" />
									<span>Los Pollos Hermanos Denver</span>
								</li>
							</ol>
						</li>
						<li>
							El <strong className="text-stone-100">alias</strong> de cada empleado es unico (UNIQUE).
						</li>
						<li>
							El <strong className="text-stone-100">nombre</strong> de cada local y tipo de producto es unico (UNIQUE).
						</li>
						<li>
							Un producto pertenece a un solo tipo y se asocia a un solo local.
						</li>
						<li>
							Un empleado puede vender multiples productos y un producto puede ser vendido por multiples empleados (<strong className="text-stone-100">relacion M:N</strong> a traves de la tabla de ventas).
						</li>
						<li>
							Los precios se registran en pesos chilenos con dos decimales (<code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">DECIMAL</code>).
						</li>
					</ul>
				</Callout>
			</div>

			{/* ═══════════════════════════════════════════════════════════════
			    SECTION 5: RESTRICCIONES Y COMO VERIFICARLAS
			    ═══════════════════════════════════════════════════════════════ */}
			<div className="flex flex-col gap-4">
				<h3 className="font-serif text-base font-semibold text-stone-100">
					4. Restricciones y Como Verificarlas
				</h3>

				<Callout type="warning" title="Tipos de restricciónes">
					<div className="flex flex-col gap-4">
						<div>
							<p className="font-semibold text-stone-100 mb-2">Restricciones DDL (se implementan en CREATE TABLE)</p>
							<p className="mb-2">
								Estas restricciónes se definen directamente en la estructura de la tabla y el motor de base de datos las hace cumplir automaticamente al insertar o modificar datos:
							</p>
							<ul className="flex flex-col gap-1.5 list-disc list-inside ml-2 marker:text-orange-400/60">
								<li><code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">NOT NULL</code> — Garantiza que un campo obligatorio siempre tenga valor.</li>
								<li><code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">UNIQUE</code> — Garantiza que no haya duplicados. Ejemplo: el alias del empleado y el nombre del local deben ser unicos.</li>
								<li><code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">FOREIGN KEY</code> — Garantiza la integridad referencial entre tablas. Ejemplo: el id_tipo en producto debe existir en la tabla tipo_producto.</li>
								<li><code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">DEFAULT</code> — Asigna un valor por defecto cuando no se especifica uno al insertar.</li>
							</ul>
						</div>

						<div>
							<p className="font-semibold text-stone-100 mb-2">Consultas de verificacion</p>
							<p className="mb-2">
								Algunas reglas de negocio se verifican con consultas SQL sobre los datos ya insertados:
							</p>
							<ul className="flex flex-col gap-1.5 list-disc list-inside ml-2 marker:text-orange-400/60">
								<li>
									<strong className="text-stone-100">Empleados sin ventas</strong> — Que empleados no han registrado ninguna venta. Para verificar esto, necesitas buscar empleados que no aparezcan en la tabla de ventas.
								</li>
								<li>
									<strong className="text-stone-100">Empleados con ventas altas</strong> — Que empleados han vendido mas de 20 unidades en total. Para verificar esto, necesitas sumar las cantidades de venta agrupadas por empleado y filtrar los que superen el umbral.
								</li>
							</ul>
						</div>

						<p className="text-stone-400 text-xs italic border-t border-orange-500/20 pt-3">
							Nota: No se espera que implementen triggers o stored procedures. Las restricciónes de negocio se verifican ejecutando consultas SELECT después del poblamiento, como parte de la evidencia de la Parte 4.
						</p>
					</div>
				</Callout>
			</div>

			{/* ═══════════════════════════════════════════════════════════════
			    SECTION 6: ACTIVIDADES SOLICITADAS
			    ═══════════════════════════════════════════════════════════════ */}
			<div className="flex flex-col gap-6">
				<h3 className="font-serif text-base font-semibold text-stone-100">
					5. Actividades Solicitadas
				</h3>

				{/* Parte 1 */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold shrink-0">
							1
						</span>
						<h4 className="font-serif text-sm font-semibold text-stone-100">
							Parte 1 — Modelo Conceptual (ER)
						</h4>
					</div>
					<div className="ml-10 flex flex-col gap-2 text-stone-300 text-sm leading-relaxed">
						<p>
							Construir el modelo conceptual a partir del formulario de registro y las reglas de negocio descritas anteriormente. El modelo debe incluir:
						</p>
						<ul className="flex flex-col gap-1.5 list-disc list-inside ml-2 marker:text-stone-600">
							<li>Todas las <strong className="text-stone-100">entidades</strong> con sus atributos e identificadores (claves primarias).</li>
							<li>Las <strong className="text-stone-100">relaciones</strong> entre entidades con sus cardinalidades correctas (1:1, 1:N, N:M).</li>
							<li>Indicar claramente que atributos son <strong className="text-stone-100">obligatorios</strong> y cuales son <strong className="text-stone-100">opcionales</strong> segun el formulario.</li>
							<li>Identificar las <strong className="text-stone-100">entidades debiles</strong> (aquellas cuya existencia depende de otra entidad).</li>
						</ul>
						<div className="bg-stone-800/50 border border-stone-700 rounded px-3 py-2 mt-1">
							<p className="text-stone-400 text-xs">
								<strong className="text-stone-300">Entregable:</strong> Diagrama ER en notacion UML (Diagrama de Clases) o E-R Extendido con notacion pata de gallo (crow's foot).
							</p>
						</div>
					</div>
				</div>

				{/* Parte 2 */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold shrink-0">
							2
						</span>
						<h4 className="font-serif text-sm font-semibold text-stone-100">
							Parte 2 — Modelo Logico Relacional
						</h4>
					</div>
					<div className="ml-10 flex flex-col gap-2 text-stone-300 text-sm leading-relaxed">
						<p>
							Transformar el modelo conceptual (ER) al modelo logico relacional. Esto implica definir cada tabla con:
						</p>
						<ul className="flex flex-col gap-1.5 list-disc list-inside ml-2 marker:text-stone-600">
							<li><strong className="text-stone-100">Claves primarias</strong> (PK) — simples o compuestas segun corresponda.</li>
							<li><strong className="text-stone-100">Claves foraneas</strong> (FK) — con referencia a la tabla y columna origen.</li>
							<li><strong className="text-stone-100">Tipos de dato</strong> — INT, VARCHAR(n), DATE, DECIMAL(p,s), etc.</li>
							<li><strong className="text-stone-100">Restricciones</strong> — NOT NULL, UNIQUE, DEFAULT.</li>
						</ul>
						<div className="bg-stone-800/50 border border-stone-700 rounded px-3 py-2 mt-1">
							<p className="text-stone-400 text-xs">
								<strong className="text-stone-300">Entregable:</strong> Diagrama relacional (esquema de tablas con flechas FK) + diccionario de datos (tabla que describe cada columna, tipo, restricción y descripción).
							</p>
						</div>
					</div>
				</div>

				{/* Parte 3 */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold shrink-0">
							3
						</span>
						<h4 className="font-serif text-sm font-semibold text-stone-100">
							Parte 3 — Script DDL (Definicion de Datos)
						</h4>
					</div>
					<div className="ml-10 flex flex-col gap-2 text-stone-300 text-sm leading-relaxed">
						<p>
							Implementar la base de datos en MySQL utilizando sentencias <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">CREATE TABLE</code>. El script debe:
						</p>
						<ul className="flex flex-col gap-1.5 list-disc list-inside ml-2 marker:text-stone-600">
							<li>Usar <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">ENGINE=InnoDB</code> en todas las tablas (para soporte de FK).</li>
							<li>Crear primero las tablas de catalogos: <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">tipo_producto</code>, <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">local</code>.</li>
							<li>Luego crear las tablas principales: <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">producto</code>, <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">empleado</code>.</li>
							<li>Finalmente la tabla de relacion: <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">venta</code>.</li>
							<li>Incluir todas las restricciónes NOT NULL, UNIQUE, FOREIGN KEY y DEFAULT pertinentes.</li>
							<li>El script debe ser ejecutable sin errores en un ambiente MySQL limpio.</li>
						</ul>
						<div className="bg-stone-800/50 border border-stone-700 rounded px-3 py-2 mt-1">
							<p className="text-stone-400 text-xs">
								<strong className="text-stone-300">Entregable:</strong> Archivo <code className="text-amber-400">.sql</code> con el script DDL completo (5 tablas), ejecutable sin errores.
							</p>
						</div>
					</div>
				</div>

				{/* Parte 4 */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold shrink-0">
							4
						</span>
						<h4 className="font-serif text-sm font-semibold text-stone-100">
							Parte 4 — Poblamiento DML (Manipulacion de Datos)
						</h4>
					</div>
					<div className="ml-10 flex flex-col gap-2 text-stone-300 text-sm leading-relaxed">
						<p>
							Poblar la base de datos con datos de prueba coherentes y suficientes para demostrar que el modelo funciona correctamente. Cantidades minimas requeridas:
						</p>
						<div className="overflow-x-auto">
							<table className="w-full text-xs border border-stone-700 rounded-md overflow-hidden">
								<thead>
									<tr className="bg-amber-950/30">
										<th className="text-left text-amber-400 font-semibold px-3 py-2 border-b border-stone-700">Tabla</th>
										<th className="text-left text-amber-400 font-semibold px-3 py-2 border-b border-stone-700">Minimo de registros</th>
									</tr>
								</thead>
								<tbody className="text-stone-300">
									<tr className="border-b border-stone-800"><td className="px-3 py-1.5">tipo_producto</td><td className="px-3 py-1.5">4</td></tr>
									<tr className="border-b border-stone-800"><td className="px-3 py-1.5">local</td><td className="px-3 py-1.5">5</td></tr>
									<tr className="border-b border-stone-800"><td className="px-3 py-1.5">producto</td><td className="px-3 py-1.5">8</td></tr>
									<tr className="border-b border-stone-800"><td className="px-3 py-1.5">empleado</td><td className="px-3 py-1.5">8</td></tr>
									<tr><td className="px-3 py-1.5">venta</td><td className="px-3 py-1.5">15</td></tr>
								</tbody>
							</table>
						</div>
						<p className="mt-1">
							Ademas del poblamiento, se debe incluir <strong className="text-stone-100">evidencia</strong> de que los datos son correctos:
						</p>
						<ul className="flex flex-col gap-1.5 list-disc list-inside ml-2 marker:text-stone-600">
							<li><code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">SELECT COUNT(*)</code> de cada tabla para verificar las cantidades minimas.</li>
							<li><code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">SELECT</code> con <code className="text-amber-400 bg-stone-800 px-1 rounded text-xs">JOIN</code> para verificar que las relaciones estan correctas.</li>
						</ul>
						<div className="bg-stone-800/50 border border-stone-700 rounded px-3 py-2 mt-1">
							<p className="text-stone-400 text-xs">
								<strong className="text-stone-300">Entregable:</strong> Archivo <code className="text-amber-400">.sql</code> con INSERT statements + consultas de evidencia con sus resultados.
							</p>
						</div>
					</div>
				</div>

				{/* Parte 5 */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold shrink-0">
							5
						</span>
						<h4 className="font-serif text-sm font-semibold text-stone-100">
							Parte 5 — Consultas SQL
						</h4>
					</div>
					<div className="ml-10 flex flex-col gap-2 text-stone-300 text-sm leading-relaxed">
						<p>
							Escribir las siguientes 8 consultas SQL. Cada consulta debe ejecutarse correctamente sobre la base de datos poblada en la parte anterior.
						</p>

						<div className="flex flex-col gap-2 mt-1">
							{[
								{
									num: 1,
									title: 'Productos caros ordenados por precio',
									desc: 'Listar todos los productos con precio mayor a $5.000, ordenados por precio de mayor a menor.',
								},
								{
									num: 2,
									title: 'Productos con nombre del tipo',
									desc: 'Mostrar el nombre del producto, su precio y el nombre del tipo de producto al que pertenece.',
								},
								{
									num: 3,
									title: 'Ventas con detalle completo',
									desc: 'Mostrar el alias del empleado, el nombre del producto, el nombre del tipo de producto, la cantidad vendida y la fecha de cada venta.',
								},
								{
									num: 4,
									title: 'Cantidad de productos por tipo',
									desc: 'Contar cuantos productos hay registrados por cada tipo de producto. Incluir tipos que no tengan productos asociados (con conteo 0).',
								},
								{
									num: 5,
									title: 'Empleados con pocas ventas',
									desc: 'Listar los empleados que tienen menos de 3 ventas registradas. Mostrar alias, cargo y cantidad de ventas.',
								},
								{
									num: 6,
									title: 'Productos sobre el promedio',
									desc: 'Listar los productos cuyo precio supera el precio promedio de todos los productos. Mostrar nombre, precio y la diferencia respecto al promedio.',
								},
								{
									num: 7,
									title: 'Empleados sin ventas',
									desc: 'Listar todos los empleados que no han registrado ninguna venta. Mostrar alias y cargo.',
								},
								{
									num: 8,
									title: 'Empleados con mas de 20 unidades vendidas',
									desc: 'Mostrar los empleados cuya suma total de unidades vendidas supera las 20. Incluir alias, cargo y total de unidades.',
								},
							].map(q => (
								<div key={q.num} className="flex gap-3 items-start bg-stone-900 border border-stone-800 rounded-md px-4 py-3">
									<span className="flex items-center justify-center w-5 h-5 rounded bg-stone-800 text-stone-400 text-xs font-mono font-bold shrink-0 mt-0.5">
										{q.num}
									</span>
									<div>
										<p className="text-stone-100 text-sm font-semibold">{q.title}</p>
										<p className="text-stone-400 text-xs mt-0.5 leading-relaxed">{q.desc}</p>
									</div>
								</div>
							))}
						</div>

						<div className="bg-stone-800/50 border border-stone-700 rounded px-3 py-2 mt-1">
							<p className="text-stone-400 text-xs">
								<strong className="text-stone-300">Entregable:</strong> Archivo <code className="text-amber-400">.sql</code> con las 8 consultas numeradas y comentadas + resultados de ejecución.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* ═══════════════════════════════════════════════════════════════
			    SECTION 7: DIAGRAMA ER
			    ═══════════════════════════════════════════════════════════════ */}
			<div className="flex flex-col gap-4">
				<h3 className="font-serif text-base font-semibold text-stone-100">
					6. Diagrama ER de Referencia
				</h3>
				<p className="text-stone-400 text-sm leading-relaxed">
					El siguiente diagrama muestra el esquema entidad-relacion completo del sistema en notacion pata de gallo (crow's foot). Usarlo como referencia para validar su modelo conceptual y logico.
				</p>

				<div className="border border-stone-700 rounded-md overflow-hidden">
					<button
						onClick={() => setDiagramOpen(v => !v)}
						className="w-full flex items-center justify-between px-4 py-2.5 bg-stone-800 hover:bg-stone-700 transition-colors text-sm font-medium text-stone-300"
					>
						<span>Diagrama ER del esquema (pata de gallo)</span>
						{diagramOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</button>
					{diagramOpen && (
						<div className="bg-stone-900 p-4 animate-fade-in">
							<MermaidDiagram code={ER_DIAGRAM} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
