import { Operation } from 'docier/rest'
import { Heading, Stack } from '../../x'

export default function Rest({ descriptor }: { descriptor: any }){
	return (
		<Stack className="section page-width rest endpoint">
			<Heading>{descriptor.title}</Heading>
			<Operation {...descriptor}/>
		</Stack>
	)
}
