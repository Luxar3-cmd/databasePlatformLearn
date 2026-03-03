import { useState, useRef } from 'react'
import { Topic11, Topic12, Topic13, Topic14 } from '@/content/units/u1/concepts'

const TOPICS = [
	{ id: '1.1', label: '1.1 Definicion de BD' },
	{ id: '1.2', label: '1.2 Enfoques' },
	{ id: '1.3', label: '1.3 Tipos de BD' },
	{ id: '1.4', label: '1.4 Proceso de Diseno' },
] as const

type TopicId = (typeof TOPICS)[number]['id']

export default function ConceptsSection() {
	const [activeTab, setActiveTab] = useState<TopicId>('1.1')
	const panelRef = useRef<HTMLDivElement>(null)

	function handleTabChange(id: TopicId) {
		setActiveTab(id)
		panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	const content: Record<TopicId, React.ReactNode> = {
		'1.1': <Topic11 />,
		'1.2': <Topic12 />,
		'1.3': <Topic13 />,
		'1.4': <Topic14 />,
	}

	return (
		<div>
			<div role="tablist" className="flex gap-1 border-b border-zinc-700 mb-6 overflow-x-auto">
				{TOPICS.map((t) => (
					<button
						key={t.id}
						role="tab"
						aria-selected={activeTab === t.id}
						onClick={() => handleTabChange(t.id)}
						className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
							activeTab === t.id
								? 'border-b-2 border-blue-500 text-blue-400'
								: 'text-zinc-400 hover:text-zinc-200'
						}`}
					>
						{t.label}
					</button>
				))}
			</div>

			<div ref={panelRef} role="tabpanel">
				{content[activeTab]}
			</div>
		</div>
	)
}
