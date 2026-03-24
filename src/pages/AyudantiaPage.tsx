import { Suspense, lazy } from 'react'
import { useParams } from 'react-router'

const AYUDANTIAS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
	'2': lazy(() => import('@/components/ayudantias/ay2/Ayudantia2Page')),
}

export default function AyudantiaPage() {
	const { id } = useParams<{ id: string }>()
	const Component = id ? AYUDANTIAS[id] : undefined

	if (!Component) {
		return (
			<div className="text-stone-400 p-6">
				<p>Ayudantia no encontrada</p>
			</div>
		)
	}

	return (
		<Suspense fallback={<div className="text-stone-400 p-6">Cargando...</div>}>
			<Component />
		</Suspense>
	)
}
