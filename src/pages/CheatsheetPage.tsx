import { Suspense, lazy } from 'react'
import { useParams } from 'react-router'

const CHEATSHEETS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
	'sql': lazy(() => import('@/components/cheatsheets/SqlCheatsheet')),
}

export default function CheatsheetPage() {
	const { id } = useParams<{ id: string }>()
	const Component = id ? CHEATSHEETS[id] : undefined

	if (!Component) {
		return (
			<div className="text-stone-400 p-6">
				<p>Cheatsheet no encontrado</p>
			</div>
		)
	}

	return (
		<Suspense fallback={<div className="text-stone-400 p-6">Cargando...</div>}>
			<Component />
		</Suspense>
	)
}
