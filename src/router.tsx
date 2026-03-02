import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import { useParams } from 'react-router'

function InfoGeneral() {
	return (
		<div className="text-zinc-100">
			<h1 className="text-2xl font-bold mb-4">Informacion General</h1>
			<p className="text-zinc-400">Bienvenido a BDD Lab UTFSM — Ayudantia INF-239</p>
		</div>
	)
}

function SectionPage() {
	const { unitId, section } = useParams()
	return (
		<div className="text-zinc-100">
			<h1 className="text-2xl font-bold mb-4">
				Unidad: {unitId} — Seccion: {section}
			</h1>
			<p className="text-zinc-400">Contenido proximamente</p>
		</div>
	)
}

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ index: true, element: <InfoGeneral /> },
			{ path: 'unit/:unitId/:section', element: <SectionPage /> },
		],
	},
])
