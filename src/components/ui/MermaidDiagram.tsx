import { useEffect, useRef, useState, useCallback } from 'react'
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
	er: {
		useMaxWidth: true,
		layoutDirection: 'TB',
	},
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
				const existing = document.getElementById(id)
				if (existing) existing.remove()

				const normalized = code.replace(/\t/g, '    ')
				const { svg } = await mermaid.render(id, normalized)
				if (!cancelled && el) {
					el.innerHTML = svg
					const svgEl = el.querySelector('svg')
					if (svgEl) {
						svgEl.style.maxWidth = '100%'
						svgEl.style.height = 'auto'
					}
				}
			} catch (err) {
				if (!cancelled && el) {
					el.innerHTML = `<p class="text-red-400 text-sm">Error al renderizar diagrama: ${err instanceof Error ? err.message : ''}</p>`
				}
			}
		}

		render()

		return () => { cancelled = true }
	}, [code])

	return (
		<div
			ref={containerRef}
			className={className ?? ''}
		/>
	)
}

function ZoomableView({ code, className, idSuffix }: { code: string; className?: string; idSuffix: string }) {
	const [zoom, setZoom] = useState(1)
	const [panX, setPanX] = useState(0)
	const [panY, setPanY] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)

	const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

	const reset = useCallback(() => {
		setZoom(1)
		setPanX(0)
		setPanY(0)
	}, [])

	function handleWheel(e: React.WheelEvent) {
		e.preventDefault()
		setZoom(z => clampZoom(z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)))
	}

	function handleMouseDown(e: React.MouseEvent) {
		if (zoom <= 1) return
		e.preventDefault()
		setIsDragging(true)
		dragStart.current = { x: e.clientX, y: e.clientY, panX, panY }
	}

	function handleMouseMove(e: React.MouseEvent) {
		if (!isDragging || !dragStart.current) return
		const dx = e.clientX - dragStart.current.x
		const dy = e.clientY - dragStart.current.y
		setPanX(dragStart.current.panX + dx)
		setPanY(dragStart.current.panY + dy)
	}

	function handleMouseUp() {
		setIsDragging(false)
		dragStart.current = null
	}

	const canDrag = zoom > 1

	return (
		<div className="relative">
			{/* Toolbar */}
			<div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-900/90 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
				<button
					onClick={() => setZoom(z => clampZoom(z - ZOOM_STEP))}
					className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
					title="Alejar"
				>
					<ZoomOut size={14} />
				</button>
				<span className="min-w-[2.5rem] text-center font-mono text-xs text-stone-400">
					{Math.round(zoom * 100)}%
				</span>
				<button
					onClick={() => setZoom(z => clampZoom(z + ZOOM_STEP))}
					className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
					title="Acercar"
				>
					<ZoomIn size={14} />
				</button>
				<div className="mx-0.5 h-3.5 w-px bg-stone-700" />
				<button
					onClick={reset}
					className="rounded p-1 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
					title="Restablecer"
				>
					<RotateCcw size={14} />
				</button>
			</div>

			{/* Diagram */}
			<div
				className={`overflow-hidden ${canDrag ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				<div
					style={{
						transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
						transformOrigin: 'top center',
						transition: isDragging ? 'none' : 'transform 0.15s ease',
					}}
				>
					<DiagramCanvas code={code} className={className} idSuffix={idSuffix} />
				</div>
			</div>
		</div>
	)
}

export function MermaidDiagram({ code, className }: MermaidDiagramProps) {
	const idRef = useRef(`${++idCounter}`)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const fsIdRef = useRef(`fs-${idRef.current}`)

	useEffect(() => {
		if (!isFullscreen) return
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') setIsFullscreen(false)
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [isFullscreen])

	return (
		<div className="group relative">
			{/* Fullscreen button */}
			<button
				onClick={() => setIsFullscreen(true)}
				className="absolute top-2 left-2 z-10 rounded p-1 border border-stone-700 bg-stone-900/90 text-stone-400 opacity-0 transition-opacity hover:bg-stone-700 hover:text-stone-200 group-hover:opacity-100"
				title="Pantalla completa"
			>
				<Maximize2 size={14} />
			</button>

			<ZoomableView code={code} className={className} idSuffix={idRef.current} />

			{/* Fullscreen overlay */}
			{isFullscreen && (
				<div className="fixed inset-0 z-50 flex flex-col bg-stone-950/97 p-6">
					<div className="mb-4 flex justify-end">
						<button
							onClick={() => setIsFullscreen(false)}
							className="rounded-lg border border-stone-700 bg-stone-900 p-2 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
							title="Cerrar (Esc)"
						>
							<X size={18} />
						</button>
					</div>
					<div className="group relative min-h-0 flex-1 overflow-auto rounded-lg border border-stone-800 bg-stone-900 p-4">
						<ZoomableView code={code} className={className} idSuffix={fsIdRef.current} />
					</div>
				</div>
			)}
		</div>
	)
}
