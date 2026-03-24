import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import InfoGeneral from '@/pages/InfoGeneral'
import SectionPage from '@/pages/SectionPage'
import AyudantiaPage from '@/pages/AyudantiaPage'
import CheatsheetPage from '@/pages/CheatsheetPage'

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ index: true, element: <InfoGeneral /> },
			{ path: 'unit/:unitId/:section', element: <SectionPage /> },
			{ path: 'ayudantia/:id', element: <AyudantiaPage /> },
			{ path: 'cheatsheet/:id', element: <CheatsheetPage /> },
		],
	},
])
