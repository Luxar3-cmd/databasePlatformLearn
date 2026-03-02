# Feature Research

**Domain:** Educational SQL / Database learning platform (university course companion)
**Researched:** 2026-03-02
**Confidence:** MEDIUM — platforms analyzed directly; student pain points from multiple community sources; UX expectations from platform reviews and HN discussions.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| In-browser SQL editor | Every major platform (SQLBolt, W3Schools, pgexercises, LearnSQL, Codecademy) provides this. Students expect to run SQL without installing anything. | MEDIUM | AlaSQL covers this for the project. Must support SELECT, JOIN, GROUP BY, subqueries at minimum. |
| Immediate feedback on exercises | Students expect to know instantly if their query is correct. Passive reading without execution = no learning signal. | MEDIUM | Compare result sets, not string equality. "Wrong" needs to show what was expected vs. what was returned. |
| Structured lesson progression | SQLBolt's sequential lesson model and pgexercises' category-based model are both expected. Users need a clear path, not a wall of content. | LOW | Sidebar navigation with unit/subsection structure satisfies this. |
| Preloaded sample database | Users expect a concrete dataset to query against. Exercises without data are abstract and frustrating. | LOW | The "universidad" schema (students, courses, professors, enrollments) must be defined once and reloaded between exercises. |
| Concept explanations before exercises | Every platform pairs theory with practice. Dumping exercises without context is a known dropout trigger. | LOW | The "Conceptos" subsection per unit handles this. Content fidelity to course material is the differentiator here. |
| Exercise solutions / show answer | W3Schools, SQLZoo, StrataScratch all offer "show answer". Students are blocked without it and quit. | LOW | Show only after N failed attempts or on explicit request. Showing too early removes learning friction. |
| Mobile-friendly responsive layout | Students access on phones and tablets. A broken mobile layout signals an abandoned product. | MEDIUM | Sidebar must collapse. Editor must be usable on small screens (this is genuinely hard with a SQL editor). |
| Dark mode | Standard expectation for developer/technical tools in 2025. Already required by project constraints. | LOW | Tailwind dark: classes. Already in PROJECT.md as the only theme. |
| Navigation between sections | Users expect breadcrumbs or sidebar highlighting to know where they are. Disorientation = abandonment. | LOW | Active state in sidebar, header showing current unit/section. |
| Quiz / self-assessment | Khan Academy, W3Schools, LearnSQL all include quizzes. Students expect to test themselves before exams. | MEDIUM | Multiple choice + fill-in-the-blank. Immediate feedback per question. Score at the end. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Course-specific content (INF-239 UTFSM) | Generic SQL platforms cover generic content. This platform mirrors the exact syllabus, terminology, and exam focus of INF-239. Students get content that matches what they'll be tested on. | HIGH | Requires transcribing and structuring official course materials (Clases 02-04, Unidad_1.pdf) faithfully. This is the #1 differentiator. |
| Guided exercises with step-by-step hints | StrataScratch does this; SQLBolt and pgexercises do not. Students stuck on a query need scaffolded help, not just the answer. | MEDIUM | 3-tier hint system: conceptual hint → partial query → full answer. Avoids spoiling while reducing friction. |
| Visual cheat sheet (not just text) | LearnSQL offers cheat sheets but they're text-heavy PDFs. A visual, structured quick-reference embedded in the platform reduces tab-switching. | MEDIUM | Comparison tables, ER diagram for the sample DB, syntax cards. Renders in the same UI, not a download. |
| Exercises pre-loaded with university dataset | Generic platforms use country clubs, movies, or orders. A dataset students recognize (facultades, ramos, alumnos) lowers cognitive load and makes exercises feel relevant. | LOW | Schema design is the critical decision here — must map to real INF-239 topics (ER modeling, normalization, relational algebra). |
| Unit-locked progression (visible roadmap) | Showing future units as locked but visible (SQLBolt does not do this) sets expectations and creates motivation. Students see the full course arc. | LOW | Locked states with unit names visible but non-navigable. Clear visual indicator of what's coming. |
| Bilingual-quality Spanish content | Most SQL platforms are English-only or poorly machine-translated. Content in idiomatic Spanish that matches the professor's terminology removes a friction layer for Spanish-speaking students. | LOW | Effort is in content authoring, not implementation. Already a project requirement. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| User authentication / accounts | "Students want to track their progress across sessions." | Requires backend, database, session management — triples complexity for a static site. Auth bugs are security bugs. Out of scope per PROJECT.md. | LocalStorage-based progress tracking per device. Opt-in, no account needed. |
| Real PostgreSQL backend | "AlaSQL doesn't support window functions / recursive CTEs." | Backend means servers, DevOps, connection pooling, cost. Destroys the static deploy model. For INF-239 U1, AlaSQL is sufficient. | Document AlaSQL limitations explicitly in the platform. Flag when an exercise intentionally omits advanced syntax. |
| Live collaborative editing | "Students could work together in the editor." | Real-time sync is a full engineering project (WebSockets, conflict resolution). No ROI for a course companion. | Link to SQL Fiddle or dbfiddle.uk for sharing queries. |
| Video lessons | "Khan Academy has videos." | Video production is a content bottleneck. High storage/CDN cost. Stale quickly. | High-quality written explanations with diagrams. Link to professor's official slides where appropriate. |
| AI SQL assistant / autocomplete | "Students want help writing queries." | Removes the learning friction that produces learning. Students who use AI to complete exercises don't learn. Creates a feature that actively undermines the product's purpose. | Hints system (3-tier) gives scaffolded help without writing the query for the student. |
| Leaderboards / gamification points | "Makes it more engaging." | Competitive pressure increases anxiety for struggling students. Gamification optimizes for metric (points) not goal (SQL understanding). | Show personal progress only. Completion indicators per section, not scores vs. peers. |
| Persistent server-side grade tracking | "Ayudante wants to see who completed what." | Requires backend, privacy considerations (student data), and ongoing maintenance. Scope creep. | Out of scope for v1. If needed in v2, it's a separate integration with Aula USM. |

---

## Feature Dependencies

```
[SQL Editor (AlaSQL)]
    └──required by──> [Guided Exercises]
    └──required by──> [Exercise Feedback]

[Sample Database Schema]
    └──required by──> [SQL Editor]
    └──required by──> [Guided Exercises]

[Lesson Content (Conceptos)]
    └──required by──> [Guided Exercises] (exercises reference concepts explained)
    └──enhances──>    [Cheat Sheet] (cheat sheet summarizes lesson content)

[Unit Navigation Structure]
    └──required by──> [All subsections] (Conceptos, Ejercicios, Editor, Quiz, Cheat Sheet)

[Quiz]
    └──enhances──> [Conceptos] (quiz reinforces content from lessons)
    └──independent of──> [SQL Editor] (quiz is MCQ, not free-form SQL)

[Exercise Feedback]
    └──required by──> [Guided Exercises]
    └──requires──>    [SQL Editor]

[Hint System]
    └──enhances──> [Guided Exercises]
    └──independent of──> [Quiz]
```

### Dependency Notes

- **SQL Editor requires Sample Database Schema:** The schema must be defined and loaded before any exercise can run. This is a hard dependency — schema design should happen in phase 1.
- **Guided Exercises require both Editor and Lesson Content:** Exercises that reference concepts from the lesson assume the student has read the conceptual section. Navigation order matters.
- **Quiz is independent of the SQL Editor:** MCQ-based self-assessment does not require the AlaSQL engine. Can be built and tested separately.
- **Hint System enhances Exercises without blocking them:** A basic "show answer" is table stakes; a full 3-tier hint system is a differentiator that can be added incrementally.

---

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed for the INF-239 U1 ayudantia.

- [ ] Unit navigation sidebar (U1 active, U2-U6 locked but visible) — orients students, signals the full course arc
- [ ] Conceptos section U1 (1.1–1.4 per official syllabus) — theory before practice
- [ ] Sample database preloaded in AlaSQL (universidad schema) — exercises need data to run against
- [ ] SQL Editor with 6 guided exercises — the core practice loop
- [ ] Exercise feedback (correct/incorrect + expected vs. actual) — essential learning signal
- [ ] Quiz (10+ MCQ with immediate per-question feedback + end score) — self-assessment before exams
- [ ] Cheat Sheet (visual summary of U1 definitions and ER concepts) — reference card students will reuse
- [ ] Dark mode + responsive layout with collapsible sidebar — table stakes UX

### Add After Validation (v1.x)

Features to add once core is working and students are using it.

- [ ] 3-tier hint system for exercises — trigger: students report getting stuck and guessing answers
- [ ] LocalStorage progress tracking (which exercises/quiz completed) — trigger: students ask "where was I?"
- [ ] U2 content unlock (Modelo Relacional) — trigger: course advances to U2 in the semester

### Future Consideration (v2+)

Features to defer until the platform proves its value across multiple units.

- [ ] Exercises for all 6 units — defer: content production bottleneck, not a tech problem
- [ ] Instructor view (which sections students visited) — defer: requires rethinking the no-backend constraint
- [ ] Advanced SQL topics (window functions, recursive CTEs) — defer: AlaSQL limitations and out of U1 scope
- [ ] Print-friendly / exportable cheat sheet — defer: low value relative to effort

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| In-browser SQL editor (AlaSQL) | HIGH | MEDIUM | P1 |
| Sample university database schema | HIGH | LOW | P1 |
| Guided exercises with feedback | HIGH | MEDIUM | P1 |
| Conceptos section (U1 content) | HIGH | LOW (content work, not tech) | P1 |
| Unit navigation sidebar | HIGH | LOW | P1 |
| Quiz with immediate feedback | HIGH | MEDIUM | P1 |
| Cheat Sheet visual reference | MEDIUM | MEDIUM | P1 |
| Dark mode + responsive layout | MEDIUM | LOW | P1 |
| Exercise solutions / show answer | HIGH | LOW | P1 |
| Unit lock/unlock progression | MEDIUM | LOW | P2 |
| 3-tier hint system | MEDIUM | MEDIUM | P2 |
| LocalStorage progress tracking | MEDIUM | LOW | P2 |
| Collapsible mobile sidebar | MEDIUM | MEDIUM | P2 |
| Bilingual Spanish content quality | HIGH | LOW (authoring) | P1 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | SQLBolt | pgexercises | W3Schools SQL | Khan Academy | Our Approach |
|---------|---------|-------------|---------------|--------------|--------------|
| In-browser SQL execution | Yes | Yes (server-side) | Yes (WebSQL) | Yes | AlaSQL client-side — no backend needed |
| Immediate feedback | Yes | Yes | Yes | Yes | Yes — compare result sets |
| Course-specific content | No (generic SQL) | No (country club dataset) | No (generic) | No (generic) | Yes — INF-239 syllabus and terminology |
| Spanish content | No | No | Partial | Partial | Yes — fully in Spanish |
| Hint system | No | Partial (see expected output) | Show answer | No | 3-tier hints (P2 feature) |
| Cheat sheet | No | No | Partial | No | Yes — visual, embedded |
| Quiz / MCQ | No | No | Yes (basic) | Yes | Yes — 10+ questions with feedback |
| Progress tracking | No | No | Yes (login required) | Yes (login required) | LocalStorage (no account) — v1.x |
| Mobile responsive | Partial | Partial | Yes | Yes | Yes — collapsible sidebar |
| Dark mode | No | No | No | No | Yes — only theme |
| University-relevant dataset | No | No | No | No | Yes — facultades, ramos, alumnos |

---

## Sources

- [SQLBolt](https://sqlbolt.com/) — direct platform analysis (HIGH confidence)
- [pgexercises.com](https://pgexercises.com/) — direct platform analysis (HIGH confidence)
- [W3Schools SQL TryIt Editor](https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all) — feature descriptions from search (MEDIUM confidence)
- [Khan Academy SQL course blog post](https://cs-blog.khanacademy.org/2015/05/just-released-full-introductory-sql.html) — feature descriptions (MEDIUM confidence)
- [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/sql-in-mode/index.html) — feature descriptions from search (MEDIUM confidence)
- [LearnSQL.com review (EduReviewer, 2025)](https://edureviewer.com/courses/learnsql-review/) — feedback mechanism details (MEDIUM confidence)
- [HN: Challenges students face learning SQL](https://news.ycombinator.com/item?id=28348524) — student pain points (MEDIUM confidence, community-sourced)
- [StrataScratch platform review](https://www.stratascratch.com/blog/a-comprehensive-review-of-online-platforms-for-sql-practice/) — hint/solution UX patterns (MEDIUM confidence)
- [Mimo: Best SQL courses 2026](https://mimo.org/blog/best-sql-courses) — 2026 student expectations (MEDIUM confidence)
- [Rivery: How to practice SQL 2026](https://rivery.io/blog/how-to-practice-sql/) — platform comparisons (MEDIUM confidence)

---

*Feature research for: Educational SQL learning platform (INF-239 UTFSM course companion)*
*Researched: 2026-03-02*
