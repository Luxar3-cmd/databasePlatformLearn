import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { keymap } from '@codemirror/view'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

interface SqlEditorProps {
	value: string
	onChange: (val: string) => void
	onExecute: () => void
}

export function SqlEditor({ value, onChange, onExecute }: SqlEditorProps) {
	const executeKeymap = keymap.of([
		{
			key: 'Mod-Enter',
			run: () => {
				onExecute()
				return true
			},
		},
	])

	return (
		<div className="rounded-md overflow-hidden border border-zinc-700">
			<CodeMirror
				value={value}
				height="200px"
				theme={okaidia}
				extensions={[executeKeymap, sql()]}
				onChange={onChange}
			/>
		</div>
	)
}
