import { Absolute, Flex, Icon } from '../x'

export default function Search({ input, oninput, placeholder }: {
	input?: string
	oninput: (value?: string) => void
	placeholder?: string
}){
	return (
		<Absolute className={`search ${input ? 'active' : ''}`}>
			<Flex>
				<Icon asset="search-hint"/>
			</Flex>
			<input
				type="text"
				value={input || ''}
				onChange={event => oninput(event.target.value || undefined)}
				placeholder={placeholder}
			/>
		</Absolute>
	)
}
