import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import InfoGeneral from '@/pages/InfoGeneral'
import SectionPage from '@/pages/SectionPage'

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{ index: true, element: <InfoGeneral /> },
			{ path: 'unit/:unitId/:section', element: <SectionPage /> },
		],
	},
])
