import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X } from 'lucide-react'

mermaid.initialize({
	startOnLoad: false,
	theme: 'dark',
	themeVariables: {
		primaryColor: '#44403c',
		primaryTextColor: '#e7e5e4',
		primaryBorderColor: '#57534e',
		lineColor: '#a8a29e',
		secondaryColor: '#292524',
		tertiaryColor: '#1c1917',
		background: '#1c1917',
		mainBkg: '#292524',
		nodeBorder: '#57534e',
		clusterBkg: '#1c1917',
		titleColor: '#e7e5e4',
		edgeLabelBackground: '#292524',
	},
	er: { useMaxWidth: true, layoutDirection: 'TB' },
	fontFamily: 'JetBrains Mono, ui-monospace, monospace',
	fontSize: 14,
})

let idCounter = 0

const MIN_ZOOM = 0.5
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25

interface MermaidDiagramProps {
	code: string
	className?: string
}

// ─── hook de zoom/pan ─────────────────────────────────────────────────────────

function useZoomPan() {
	const [zoom, setZoom] = useState(1)
	const [panX, setPanX] = useState(0)
	const [panY, setPanY] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const [showScrollHint, setShowScrollHint] = useState(false)

	const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)
	const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	const clamp = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

	function reset() { setZoom(1); setPanX(0); setPanY(0) }

	// Zoom desde botones (sin posición de cursor — expande desde origen)
	function zoomBy(delta: number) {
		setZoom(prev => clamp(prev + delta))
	}

	function handleWheel(e: React.WheelEvent) {
		if (!e.ctrlKey && !e.metaKey) {
			if (hintTimer.current) clearTimeout(hintTimer.current)
			setShowScrollHint(true)
			hintTimer.current = setTimeout(() => setShowScrollHint(false), 1500)
			return
		}
		e.preventDefault()
		const rect = e.currentTarget.getBoundingClientRect()
		const cx = e.clientX - rect.left
		const cy = e.clientY - rect.top
		setZoom(prev => {
			const next = clamp(prev + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP))
			const scale = next / prev
			setPanX(px => cx - (cx - px) * scale)
			setPanY(py => cy - (cy - py) * scale)
			return next
		})
	}

	function handleMouseDown(e: React.MouseEvent) {
		if (zoom <= 1) return
		e.preventDefault()
		dragStart.current = { x: e.clientX, y: e.clientY, panX, panY }
		setIsDragging(true)
	}

	// Listeners en document: el drag no se corta si el cursor sale del elemento
	useEffect(() => {
		if (!isDragging) return
		function onMove(e: MouseEvent) {
			if (!dragStart.current) return
			setPanX(dragStart.current.panX + (e.clientX - dragStart.current.x))
			setPanY(dragStart.current.panY + (e.clientY - dragStart.current.y))
		}
		function onUp() { setIsDragging(false); dragStart.current = null }
		document.addEventListener('mousemove', onMove)
		document.addEventListener('mouseup', onUp)
		return () => {
			document.removeEventListener('mousemove', onMove)
			document.removeEventListener('mouseup', onUp)
		}
	}, [isDragging])

	useEffect(() => () => { if (hintTimer.current) clearTimeout(hintTimer.current) }, [])

	return { zoom, panX, panY, isDragging, showScrollHint, reset, zoomBy, handleWheel, handleMouseDown }
}

// ─── canvas que renderiza el SVG ──────────────────────────────────────────────

function DiagramCanvas({ code, className, idSuffix }: { code: string; className?: string; idSuffix: string }) {
	const containerRef = useRef<HTMLDivElement>(null)
	const idRef = useRef(`mermaid-${idSuffix}`)

	useEffect(() => {
		const el = containerRef.current
		if (!el) return
		let cancelled = false
		const id = idRef.current
		async function render() {
			try {
				document.getElementById(id)?.remove()
				const { svg } = await mermaid.render(id, code.replace(/\t/g, '    '))
				if (!cancelled && el) {
					el.innerHTML = svg
					const svgEl = el.querySelector('svg')
					if (svgEl) { svgEl.style.maxWidth = '100%'; svgEl.style.height = 'auto' }
				}
			} catch (err) {
				if (!cancelled && el)
					el.innerHTML = `<p class="text-red-400 text-sm">Error al renderizar diagrama: ${err instanceof Error ? err.message : ''}</p>`
			}
		}
		render()
		return () => { cancelled = true }
	}, [code])

	return <div ref={containerRef} className={className ?? ''} />
}

// ─── toolbar compartida ───────────────────────────────────────────────────────

function ZoomToolbar({ zoom, zoomBy, reset, positionClass }: {
	zoom: number
	zoomBy: (delta: number) => void
	reset: () => void
	positionClass: string
}) {
	return (
		<div className={`absolute ${positionClass} z-10 flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-900/90 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100`}>
			<button
				onClick={() => zoomBy(-ZOOM_STEP)}
				disabled={zoom <= MIN_ZOOM}
				aria-label="Alejar"
				title="Alejar"
				className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
			>
				<ZoomOut size={14} />
			</button>
			<span
				className="min-w-[2.75rem] text-center font-mono text-xs text-stone-400"
				aria-live="polite"
				aria-label={`Zoom ${Math.round(zoom * 100)} por ciento`}
			>
				{Math.round(zoom * 100)}%
			</span>
			<button
				onClick={() => zoomBy(ZOOM_STEP)}
				disabled={zoom >= MAX_ZOOM}
				aria-label="Acercar"
				title="Acercar"
				className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
			>
				<ZoomIn size={14} />
			</button>
			<div className="mx-0.5 h-3.5 w-px bg-stone-700" />
			<button
				onClick={reset}
				aria-label="Restablecer vista"
				title="Restablecer"
				className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
			>
				<RotateCcw size={14} />
			</button>
		</div>
	)
}

// ─── componente público ───────────────────────────────────────────────────────

const prefersReducedMotion = typeof window !== 'undefined'
	&& window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function MermaidDiagram({ code, className }: MermaidDiagramProps) {
	const idRef = useRef(`${++idCounter}`)
	const fsIdRef = useRef(`fs-${idRef.current}`)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const closeBtnRef = useRef<HTMLButtonElement>(null)
	const prevFocusRef = useRef<HTMLElement | null>(null)

	const { zoom, panX, panY, isDragging, showScrollHint, reset, zoomBy, handleWheel, handleMouseDown } = useZoomPan()

	// Focus management
	useEffect(() => {
		if (isFullscreen) {
			closeBtnRef.current?.focus()
		} else {
			prevFocusRef.current?.focus()
			prevFocusRef.current = null
		}
	}, [isFullscreen])

	// Body scroll lock
	useEffect(() => {
		if (!isFullscreen) return
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => { document.body.style.overflow = prev }
	}, [isFullscreen])

	// Cerrar con Escape
	useEffect(() => {
		if (!isFullscreen) return
		function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setIsFullscreen(false) }
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [isFullscreen])

	function openFullscreen() {
		prevFocusRef.current = document.activeElement as HTMLElement
		setIsFullscreen(true)
	}

	return (
		<div className="group relative">
			{/* Zona interactiva inline */}
			<div
				className={`overflow-hidden select-none ${zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
			>
				<div style={{
					transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
					transformOrigin: '0 0',
					transition: (isDragging || prefersReducedMotion) ? 'none' : 'transform 0.15s ease',
				}}>
					<DiagramCanvas code={code} className={className} idSuffix={idRef.current} />
				</div>
			</div>

			{/* Toolbar inline — zoom + fullscreen */}
			<div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-900/90 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
				<button
					onClick={() => zoomBy(-ZOOM_STEP)}
					disabled={zoom <= MIN_ZOOM}
					aria-label="Alejar"
					title="Alejar"
					className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ZoomOut size={14} />
				</button>
				<span
					className="min-w-[2.75rem] text-center font-mono text-xs text-stone-400"
					aria-live="polite"
					aria-label={`Zoom ${Math.round(zoom * 100)} por ciento`}
				>
					{Math.round(zoom * 100)}%
				</span>
				<button
					onClick={() => zoomBy(ZOOM_STEP)}
					disabled={zoom >= MAX_ZOOM}
					aria-label="Acercar"
					title="Acercar"
					className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ZoomIn size={14} />
				</button>
				<div className="mx-0.5 h-3.5 w-px bg-stone-700" />
				<button onClick={reset} aria-label="Restablecer vista" title="Restablecer" className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200">
					<RotateCcw size={14} />
				</button>
				<div className="mx-0.5 h-3.5 w-px bg-stone-700" />
				<button
					onClick={openFullscreen}
					aria-label="Ver en pantalla completa"
					title="Pantalla completa"
					className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
				>
					<Maximize2 size={14} />
				</button>
			</div>

			{/* Hint Ctrl+scroll */}
			{showScrollHint && (
				<div role="status" className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-stone-700 bg-stone-900/90 px-3 py-1.5 text-xs text-stone-400">
					Ctrl + scroll para hacer zoom
				</div>
			)}

			{/* Fullscreen overlay */}
			{isFullscreen && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Diagrama en pantalla completa"
					className="fixed inset-0 z-50 flex flex-col bg-stone-950 p-6"
				>
					<div className="group relative min-h-0 flex-1 overflow-hidden rounded-lg border border-stone-800 bg-stone-900 p-4">
						<FullscreenCanvas code={code} className={className} idSuffix={fsIdRef.current} />
						<button
							ref={closeBtnRef}
							onClick={() => setIsFullscreen(false)}
							aria-label="Cerrar pantalla completa"
							title="Cerrar (Esc)"
							className="absolute right-3 top-3 z-20 rounded-lg border border-stone-700 bg-stone-900 p-1.5 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
						>
							<X size={16} />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

// ─── visor fullscreen con estado propio ───────────────────────────────────────

function FullscreenCanvas({ code, className, idSuffix }: { code: string; className?: string; idSuffix: string }) {
	const { zoom, panX, panY, isDragging, showScrollHint, reset, zoomBy, handleWheel, handleMouseDown } = useZoomPan()

	return (
		<>
			<div
				className={`h-full overflow-hidden select-none ${zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
			>
				<div style={{
					transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
					transformOrigin: '0 0',
					transition: (isDragging || prefersReducedMotion) ? 'none' : 'transform 0.15s ease',
				}}>
					<DiagramCanvas code={code} className={className} idSuffix={idSuffix} />
				</div>
			</div>

			<ZoomToolbar zoom={zoom} zoomBy={zoomBy} reset={reset} positionClass="bottom-3 right-12" />

			{showScrollHint && (
				<div role="status" className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-stone-700 bg-stone-900/90 px-3 py-1.5 text-xs text-stone-400">
					Ctrl + scroll para hacer zoom
				</div>
			)}
		</>
	)
}
