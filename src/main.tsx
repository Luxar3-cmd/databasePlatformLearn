import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import '@fontsource/inter'
import '@fontsource/jetbrains-mono'
// @ts-expect-error -- fontsource CSS import
import '@fontsource-variable/source-serif-4'
import './index.css'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
