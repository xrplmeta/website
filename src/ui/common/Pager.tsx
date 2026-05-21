import { Flex } from '../x'

const buttonCount = 5

export default function Pager({ page, pages, onpage }: {
	page: number
	pages: number
	onpage: (page: number) => void
}){
	const current = page + 1
	const startPage = Math.max(
		1,
		Math.min(current - Math.floor(buttonCount / 2), Math.max(1, pages - buttonCount + 1))
	)
	const buttons = Array.from({ length: Math.min(buttonCount, pages) }, (_, index) => startPage + index)

	return (
		<Flex className="pager">
			{buttons.map(index => (
				<button
					key={index}
					className={index === current ? 'active' : ''}
					onClick={() => onpage(index - 1)}
				>
					{index}
				</button>
			))}
		</Flex>
	)
}
