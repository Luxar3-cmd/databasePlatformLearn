import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AppLayout() {
	const [isOpen, setIsOpen] = useState(false)
	const [collapsed, setCollapsed] = useState(false)

	return (
		<div className="flex h-screen bg-stone-950 overflow-hidden">
			{/* Mobile overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/50 lg:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			<Sidebar
				isOpen={isOpen}
				collapsed={collapsed}
				onToggleMobile={() => setIsOpen((v) => !v)}
				onToggleCollapse={() => setCollapsed((v) => !v)}
				onCloseMobile={() => setIsOpen(false)}
			/>

			<div className="flex flex-col flex-1 min-w-0">
				<Header onOpenMobile={() => setIsOpen(true)} />
				<main className="flex-1 overflow-auto p-6">
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	)
}
