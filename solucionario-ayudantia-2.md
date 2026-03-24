# Solucionario — Ayudantía 2: Modelos de Datos + SQL Práctico

**Dominio:** Los Pollos Hermanos — Cadena de restaurantes

---

## Parte A — Modelos de Datos

### A1: Niveles de Abstracción

| Nivel | Subtítulo | Descripción | Ejemplo (Los Pollos Hermanos) |
|-------|-----------|-------------|-------------------------------|
| **Realidad** | Tipos de Entidades | Lo que observamos en el mundo real: personas, objetos, lugares, eventos y sus relaciones | Existen "productos" y "locales". Un producto "se ofrece en" un local. Un empleado "realiza" ventas de productos. |
| **Diccionario de Datos** | Definiciones de Registros (Metadatos) | Las entidades se convierten en definiciones formales: nombres de campos, tipos, restricciones (DDL) | `producto(id_producto INT PK, nombre VARCHAR(100) NOT NULL, precio DECIMAL(8,2), id_tipo INT FK, id_local INT FK)` |
| **Base de Datos** | Ocurrencias de Registros (Valores) | Las definiciones se llenan con datos concretos: filas en tablas, valores reales | `(1, 'Pollo Frito Original', 8990.00, 1, 1)` |

#### Tipos de Asociaciones

| Tipo | Cardinalidad | Ejemplo | Lectura |
|------|-------------|---------|---------|
| Una | 1:1 | Local ↔ Licencia de Operación | Un local tiene exactamente una licencia |
| Muchas | 1:N | Local → Productos | Un local tiene muchos productos |
| Condicional | 0..1 | Empleado → Supervisor | Un empleado puede no tener supervisor |
| Bidireccional | M:N | Empleado ↔ Producto (vía venta) | Muchos empleados venden muchos productos |
| Recursiva | 1:N (self) | Empleado supervisa a Empleado | Un empleado puede supervisar a otro |
| Múltiple | N:M + 1:N | Empleado-Local con dos asociaciones | "trabaja en" y "es gerente de" |

---

### A2: Tipos de Modelos

| Modelo | Nivel | Audiencia | Descripción | Ejemplo |
|--------|-------|-----------|-------------|---------|
| **Conceptual** | Alto nivel | Cliente/usuario | Representación abstracta de la realidad. Diagrama E-R o UML del sistema | Entidad "Producto" con atributos: id, nombre, precio. Conectado a "Local" con asociación "se ofrece en" (N:1) y a "Tipo Producto" con asociación "pertenece a" (N:1) |
| **Lógico** | Traducción DBMS | Diseñador/DBA | Traducción al modelo del DBMS (relacional = tablas con PK/FK) | `producto(id_producto PK, nombre NOT NULL, precio DECIMAL, id_tipo FK→tipo_producto, id_local FK→local)` |
| **Físico** | Implementación | DBMS/desarrollador | Código SQL real: CREATE TABLE con tipos, ENGINE, restricciones | Ver DDL completo abajo |

---

### A3: Semántica — 8 Conceptos Fundamentales

| Concepto | Pregunta clave | Definición | Ejemplo |
|----------|---------------|------------|---------|
| **Cardinalidad** | ¿Cuántas entidades se relacionan entre sí? | Define el número de instancias que participan en una asociación (1:1, 1:N, M:N) | Local tiene 1..N productos. Un producto pertenece a exactamente 1 local |
| **Grado** | ¿Cuántos tipos de entidades participan? | El número de tipos de entidad involucrados: unaria (1), binaria (2), ternaria (3) | Unaria: Empleado "supervisa a" Empleado. Binaria: Empleado-Producto (venta). Ternaria: Empleado-Producto-Local |
| **Dependencia Existencial** | ¿Puede existir X sin Y? | Una entidad débil no puede existir sin su entidad fuerte. Se implementa con FK obligatoria + PK compuesta | Venta no existe sin Empleado ni Producto → entidad débil. Su PK incluye id_empleado e id_producto como FK |
| **Tiempo** | ¿Cuándo se puede insertar/modificar? | Restricciones sobre cuándo los datos pueden crearse o modificarse (temporalidad) | ¿Se puede registrar una venta con fecha futura? Restricción temporal sobre INSERT |
| **Unicidad** | ¿Qué identifica unívocamente a cada entidad? | Determina los atributos que identifican de forma única cada instancia: PK, UNIQUE, llaves candidatas | Alias identifica al empleado. Nombre identifica al local. Ambos llevan UNIQUE constraint |
| **Herencia** | ¿Hay tipos/subtipos (IS-A)? | Generalización/especialización: una superclase con atributos comunes y subclases con atributos propios | Persona → {Empleado, Gerente, Proveedor}. Persona tiene nombre y RUT. Empleado tiene alias adicional |
| **Categorización** | ¿Herencia selectiva? | Similar a herencia pero una entidad elige de qué superclase hereda (herencia selectiva, interfaces) | Un Producto puede categorizarse como Pollo, Acompañamiento, Bebida o Postre, con atributos diferentes según tipo |
| **Agregación** | ¿X es parte de Y (IS-PART-OF)? | Una entidad es componente de otra. Composición: si el todo se destruye, las partes también. Agregación: las partes sobreviven | Productos son parte del Menú del Local (agregación). Si el local cierra, los productos pueden ofrecerse en otro local |

---

### A4: Notaciones de Modelado

#### Bachmann (1969)
- Rectángulos para entidades
- Flechas para asociaciones
- No muestra atributos explícitamente
- Buena para asociaciones sencillas

| Elemento | Visual | Descripción |
|----------|--------|-------------|
| Rectángulo | ▭ | Entidad |
| Flecha | → | Asociación 1:N |
| Doble flecha | ⇄ | M:N |

#### E-R Extendido (E-R-E)
- Doble rectángulo = Entidad débil
- Doble rombo = Asociación identificante
- Doble óvalo = Atributo multivaluado
- Óvalo punteado = Atributo derivado
- Cardinalidad con (min,max)

| Elemento | Visual | Descripción |
|----------|--------|-------------|
| Doble rectángulo | ⊞ | Entidad débil |
| Doble rombo | ◇◇ | Asociación identificante |
| Doble óvalo | ◯◯ | Multivaluado |
| Óvalo punteado | ◌ | Derivado |

#### Diagrama de Clases UML
- 3 compartimentos (nombre | atributos | métodos)
- Multiplicidades: 1, 0..1, 1..*, *
- Rombo negro = Composición
- Rombo blanco = Agregación
- Triángulo = Herencia

| Elemento | Visual | Descripción |
|----------|--------|-------------|
| Clase | ▭▭▭ | 3 compartimentos |
| Rombo negro | ◆ | Composición |
| Rombo blanco | ◇ | Agregación |
| Triángulo | △ | Herencia (IS-A) |

---

## Parte B — SQL Práctico

### B1: Taxonomía de Comandos SQL

#### DDL — Data Definition Language (Define la estructura)

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `CREATE` | Crea tablas, bases de datos u otros objetos | `CREATE TABLE producto (id_producto INT PRIMARY KEY, nombre VARCHAR(100) NOT NULL);` |
| `ALTER` | Modifica la estructura de una tabla existente | `ALTER TABLE empleado ADD COLUMN telefono VARCHAR(15);` |
| `DROP` | Elimina tablas u objetos completos | `DROP TABLE IF EXISTS venta;` |
| `TRUNCATE` | Elimina todos los registros sin borrar estructura | `TRUNCATE TABLE venta;` |

#### DML — Data Manipulation Language (Manipula datos — CRUD)

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `SELECT` | Consulta y recupera datos | `SELECT nombre, precio FROM producto;` |
| `INSERT` | Inserta nuevos registros | `INSERT INTO local (nombre, ciudad) VALUES ('Los Pollos Hermanos Albuquerque', 'Albuquerque');` |
| `UPDATE` | Modifica registros existentes | `UPDATE producto SET precio = 9990 WHERE id_producto = 1;` |
| `DELETE` | Elimina registros | `DELETE FROM venta WHERE id_empleado = 6;` |

#### DCL — Data Control Language (Controla permisos)

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `GRANT` | Otorga permisos | `GRANT SELECT ON pollos_hermanos.* TO 'mesero'@'localhost';` |
| `REVOKE` | Revoca permisos | `REVOKE INSERT ON pollos_hermanos.* FROM 'mesero'@'localhost';` |

#### TCL — Transaction Control Language (Controla transacciones)

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `COMMIT` | Confirma cambios | `START TRANSACTION; UPDATE producto SET precio = 9990 WHERE id_producto = 1; COMMIT;` |
| `ROLLBACK` | Revierte cambios | `START TRANSACTION; DELETE FROM venta WHERE id_empleado = 1; ROLLBACK;` |
| `SAVEPOINT` | Punto de guardado | `SAVEPOINT antes_de_eliminar;` |

---

### B2: CREATE TABLE — Construcción Progresiva

**Paso 1: Tabla catálogo simple**
```sql
CREATE TABLE IF NOT EXISTS tipo_producto (
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB;
```

**Paso 2: Catálogo con columnas extra**
```sql
CREATE TABLE IF NOT EXISTS local (
    id_local INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    ciudad VARCHAR(50) NOT NULL
) ENGINE=InnoDB;
```

**Paso 3: Entidad independiente**
```sql
CREATE TABLE IF NOT EXISTS empleado (
    id_empleado INT PRIMARY KEY AUTO_INCREMENT,
    alias VARCHAR(30) NOT NULL UNIQUE,
    cargo VARCHAR(50) NOT NULL
) ENGINE=InnoDB;
```

**Paso 4: Tabla con claves foráneas**
```sql
CREATE TABLE IF NOT EXISTS producto (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(8,2) NOT NULL,
    id_tipo INT NOT NULL,
    id_local INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo_producto(id_tipo),
    FOREIGN KEY (id_local) REFERENCES local(id_local)
) ENGINE=InnoDB;
```

**Paso 5: PK compuesta (relación M:N)**
```sql
CREATE TABLE IF NOT EXISTS venta (
    id_empleado INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY (id_empleado, id_producto),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
) ENGINE=InnoDB;
```

---

### B3: Orden de INSERT — Dependencias FK

| Capa | Nombre | Tablas | Descripción |
|------|--------|--------|-------------|
| 1 | Catálogos (sin FK) | `tipo_producto` | No dependen de ninguna otra tabla |
| 2 | Entidades con columnas extra | `local` | Catálogos con más columnas |
| 3 | Entidades independientes | `empleado` | Sin FK |
| 4 | Entidades con FK | `producto` | Referencian catálogos y entidades |
| 5 | Intersección (M:N) | `venta` | Necesitan que ambas entidades existan |

#### Datos de población completos

**Capa 1 — tipo_producto (4 registros)**
```sql
INSERT INTO tipo_producto VALUES (1, 'Pollo');
INSERT INTO tipo_producto VALUES (2, 'Acompañamiento');
INSERT INTO tipo_producto VALUES (3, 'Bebida');
INSERT INTO tipo_producto VALUES (4, 'Postre');
```

**Capa 2 — local (5 registros)**
```sql
INSERT INTO local VALUES (1, 'Los Pollos Hermanos Albuquerque', 'Albuquerque');
INSERT INTO local VALUES (2, 'Los Pollos Hermanos El Paso', 'El Paso');
INSERT INTO local VALUES (3, 'Los Pollos Hermanos Santa Fe', 'Santa Fe');
INSERT INTO local VALUES (4, 'Los Pollos Hermanos Phoenix', 'Phoenix');
INSERT INTO local VALUES (5, 'Los Pollos Hermanos Denver', 'Denver');
```

**Capa 3 — empleado (8 registros)**
```sql
INSERT INTO empleado VALUES (1, 'Heisenberg', 'Gerente de Operaciones');
INSERT INTO empleado VALUES (2, 'Cap''n Cook', 'Chef Principal');
INSERT INTO empleado VALUES (3, 'The Chicken Man', 'Director General');
INSERT INTO empleado VALUES (4, 'The Cleaner', 'Jefe de Logística');
INSERT INTO empleado VALUES (5, 'Saul Goodman', 'Asesor Legal');
INSERT INTO empleado VALUES (6, 'Badger', 'Cajero');
INSERT INTO empleado VALUES (7, 'Skinny Pete', 'Repartidor');
INSERT INTO empleado VALUES (8, 'Combo', 'Asistente de Cocina');
```

**Capa 4 — producto (8 registros)**
```sql
INSERT INTO producto VALUES (1, 'Pollo Frito Original', 8990, 1, 1);
INSERT INTO producto VALUES (2, 'Combo Gus Especial', 12990, 1, 1);
INSERT INTO producto VALUES (3, 'Nuggets Los Pollos', 5990, 1, 2);
INSERT INTO producto VALUES (4, 'Curly Fries', 3490, 2, 1);
INSERT INTO producto VALUES (5, 'Ensalada Hermanos', 4990, 2, 3);
INSERT INTO producto VALUES (6, 'Batido Azul', 2990, 3, 1);
INSERT INTO producto VALUES (7, 'Limonada Heisenberg', 1990, 3, 2);
INSERT INTO producto VALUES (8, 'Flan del Desierto', 3990, 4, 4);
```

**Capa 5 — venta (15 registros)**
```sql
INSERT INTO venta VALUES (1, 1, 15, '2024-03-01');
INSERT INTO venta VALUES (1, 2, 8, '2024-03-05');
INSERT INTO venta VALUES (1, 4, 5, '2024-03-10');
INSERT INTO venta VALUES (1, 5, 3, '2024-03-15');
INSERT INTO venta VALUES (2, 1, 10, '2024-03-02');
INSERT INTO venta VALUES (2, 3, 6, '2024-03-08');
INSERT INTO venta VALUES (3, 2, 25, '2024-03-03');
INSERT INTO venta VALUES (3, 1, 12, '2024-03-12');
INSERT INTO venta VALUES (4, 5, 3, '2024-03-04');
INSERT INTO venta VALUES (4, 6, 4, '2024-03-09');
INSERT INTO venta VALUES (5, 7, 2, '2024-03-06');
INSERT INTO venta VALUES (8, 8, 7, '2024-03-07');
INSERT INTO venta VALUES (8, 4, 3, '2024-03-11');
INSERT INTO venta VALUES (8, 6, 5, '2024-03-14');
INSERT INTO venta VALUES (8, 7, 4, '2024-03-16');
```

> **Nota:** Badger (id=6) y Skinny Pete (id=7) no tienen ventas — esto es intencional para el ejercicio de LEFT JOIN + IS NULL.

#### Error demo
```sql
-- INCORRECTO: id_tipo = 99 no existe en tipo_producto
INSERT INTO producto VALUES (1, 'Pollo X', 9990, 99, 1);
-- Error: Foreign key constraint fails
```
El id_tipo = 99 no existe en la tabla tipo_producto. La FK rechaza la inserción.

---

### B4: SELECT Progresivo — 8 Consultas

#### 1. SELECT + WHERE + ORDER BY
**Pregunta:** Listar todos los productos con precio mayor a 5000, ordenados de más caro a más barato.

```sql
SELECT nombre, precio
FROM producto
WHERE precio > 5000
ORDER BY precio DESC
```
**Filas esperadas:** 3

**Explicación:** WHERE filtra filas que cumplan una condición. ORDER BY ordena el resultado; DESC invierte el orden (de mayor a menor).

---

#### 2. INNER JOIN (2 tablas)
**Pregunta:** Lo mismo, pero mostrando el nombre del tipo de producto en vez del id_tipo.

```sql
SELECT p.nombre, tp.nombre AS tipo, p.precio
FROM producto p
INNER JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo
WHERE p.precio > 5000
ORDER BY p.precio DESC
```
**Filas esperadas:** 3

**Explicación:** INNER JOIN conecta dos tablas usando una columna en común (típicamente PK-FK). Solo retorna filas donde existe coincidencia en ambas tablas.

---

#### 3. INNER JOIN (3+ tablas)
**Pregunta:** Ver nombre del producto, tipo, local y ciudad — todo con nombres legibles.

```sql
SELECT p.nombre AS producto, tp.nombre AS tipo, l.nombre AS local, l.ciudad, p.precio
FROM producto p
INNER JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo
INNER JOIN local l ON p.id_local = l.id_local
ORDER BY p.precio DESC
```
**Filas esperadas:** 8

**Explicación:** Puedes encadenar múltiples INNER JOIN en una sola consulta. Cada JOIN agrega columnas de una tabla adicional.

---

#### 4. COUNT + GROUP BY
**Pregunta:** ¿Cuántos productos hay por cada tipo?

```sql
SELECT tp.nombre AS tipo, COUNT(*) AS total_productos
FROM producto p
INNER JOIN tipo_producto tp ON p.id_tipo = tp.id_tipo
GROUP BY tp.nombre
```
**Filas esperadas:** 4

**Explicación:** GROUP BY agrupa filas con el mismo valor. Las funciones de agregación como COUNT(*) operan sobre cada grupo. Todo lo que aparece en SELECT y no es función de agregación debe estar en GROUP BY.

---

#### 5. COUNT + GROUP BY + HAVING
**Pregunta:** ¿Qué empleados han realizado menos de 3 ventas?

```sql
SELECT e.alias, COUNT(*) AS total_ventas
FROM venta v
INNER JOIN empleado e ON v.id_empleado = e.id_empleado
GROUP BY e.alias
HAVING COUNT(*) < 3
```
**Filas esperadas:** 4

**Explicación:** HAVING es el WHERE de los grupos. WHERE filtra filas antes de agrupar; HAVING filtra grupos después de agrupar. Solo HAVING puede usar funciones de agregación.

---

#### 6. Subconsulta en WHERE
**Pregunta:** ¿Qué productos tienen un precio mayor al promedio?

```sql
SELECT nombre, precio
FROM producto
WHERE precio > (SELECT AVG(precio) FROM producto)
ORDER BY precio DESC
```
**Filas esperadas:** 3

**Explicación:** Una subconsulta es un SELECT dentro de otro SELECT. Cuando retorna un solo valor (escalar), se puede usar directamente en WHERE con operadores de comparación. AVG() calcula el promedio.

---

#### 7. LEFT JOIN + IS NULL
**Pregunta:** ¿Qué empleados no tienen ninguna venta registrada?

```sql
SELECT e.alias, e.cargo
FROM empleado e
LEFT JOIN venta v ON e.id_empleado = v.id_empleado
WHERE v.id_empleado IS NULL
```
**Filas esperadas:** 2 (Badger y Skinny Pete)

**Explicación:** LEFT JOIN retorna todas las filas de la tabla izquierda, incluso si no tienen coincidencia en la derecha (rellena con NULL). Combinado con WHERE ... IS NULL, encuentra registros sin relación: el patrón clásico para "encontrar lo que falta".

---

#### 8. SUM + GROUP BY + HAVING
**Pregunta:** ¿Qué empleados han vendido más de 20 unidades en total?

```sql
SELECT e.alias, SUM(v.cantidad) AS total_vendido
FROM venta v
INNER JOIN empleado e ON v.id_empleado = e.id_empleado
GROUP BY e.alias
HAVING SUM(v.cantidad) > 20
```
**Filas esperadas:** 2

**Explicación:** SUM() suma los valores de una columna dentro de cada grupo. Puedes combinar múltiples funciones de agregación (COUNT, SUM, AVG, etc.) en un mismo SELECT y filtrar con HAVING sobre cualquiera de ellas.

---

### B5: Checklist Pre-Entrega

1. **ENGINE=InnoDB en todas las tablas** — Sin esto MySQL no crea FK. La rúbrica lo pide explícito.
2. **Insertar catálogos primero** — Orden: catálogos → padres → hijos → intersección.
3. **WHERE vs HAVING** — WHERE filtra filas ANTES de GROUP BY. HAVING filtra grupos DESPUÉS.
4. **Comentar cada consulta** — Comentario breve explicando qué hace y por qué.
5. **Incluir evidencia de ejecución** — Capturas o SELECT de verificación.
6. **NOT NULL en campos obligatorios** — Todos los campos con (*) deben ser NOT NULL.
7. **Usar tablas catálogo, no ENUM** — La rúbrica requiere tablas separadas. ENUM causa pérdida de puntos.
8. **Nombre Discord correcto** — Formato: Nombre + Apellido. -20 puntos por apodo/nombre incompleto.
9. **Script DDL sin errores** — Probar en BD limpia (DROP + CREATE). Script falla = 0 puntos en ese ítem.
10. **Entender cada consulta** — En defensa van a preguntar por el razonamiento.

---

## Esquema Completo — Los Pollos Hermanos

```
TIPO_PRODUCTO ||--o{ PRODUCTO : "clasifica"
LOCAL         ||--o{ PRODUCTO : "ofrece"
EMPLEADO      ||--o{ VENTA    : "realiza"
PRODUCTO      ||--o{ VENTA    : "se vende en"
```

### Diccionario de Datos

| Tabla | Columna | Tipo | Restricción |
|-------|---------|------|-------------|
| **tipo_producto** | id_tipo | INT | PK |
| | nombre | VARCHAR(30) | NOT NULL UNIQUE |
| **local** | id_local | INT | PK |
| | nombre | VARCHAR(50) | NOT NULL UNIQUE |
| | ciudad | VARCHAR(50) | NOT NULL |
| **empleado** | id_empleado | INT | PK |
| | alias | VARCHAR(30) | NOT NULL UNIQUE |
| | cargo | VARCHAR(50) | NOT NULL |
| **producto** | id_producto | INT | PK |
| | nombre | VARCHAR(100) | NOT NULL |
| | precio | DECIMAL(8,2) | NOT NULL |
| | id_tipo | INT | NOT NULL, FK → tipo_producto |
| | id_local | INT | NOT NULL, FK → local |
| **venta** | id_empleado | INT | PK, FK → empleado |
| | id_producto | INT | PK, FK → producto |
| | cantidad | INT | NOT NULL |
| | fecha | DATE | NOT NULL |
