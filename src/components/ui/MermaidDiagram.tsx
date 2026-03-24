import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

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

interface MermaidDiagramProps {
	code: string
	className?: string
}

export function MermaidDiagram({ code, className }: MermaidDiagramProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const idRef = useRef(`mermaid-${++idCounter}`)

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

		return () => {
			cancelled = true
		}
	}, [code])

	return (
		<div
			ref={containerRef}
			className={`overflow-x-auto ${className ?? ''}`}
		/>
	)
}
