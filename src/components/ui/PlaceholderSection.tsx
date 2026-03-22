import {
	BookOpen,
	PenTool,
	Terminal,
	CheckSquare,
	FileText,
	type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
	BookOpen,
	PenTool,
	Terminal,
	CheckSquare,
	FileText,
}

interface PlaceholderSectionProps {
	title: string
	description: string
	icon: string
}

export default function PlaceholderSection({ title, description, icon }: PlaceholderSectionProps) {
	const Icon = ICON_MAP[icon] ?? FileText

	return (
		<div className="flex items-center justify-center min-h-[400px] p-8">
			<div className="flex flex-col items-center text-center gap-4 p-12 bg-stone-900/50 border border-stone-800 rounded-lg max-w-md w-full">
				<Icon size={48} className="text-stone-500" />
				<h2 className="text-xl font-semibold text-stone-200">{title}</h2>
				<p className="text-stone-500">{description}</p>
			</div>
		</div>
	)
}
