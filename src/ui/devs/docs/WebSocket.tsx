import { Procedure } from 'docier/websocket'
import { Heading, Stack } from '../../x'

export default function WebSocketDocs({ descriptor }: { descriptor: any }){
	return (
		<Stack className="section page-width rest endpoint">
			<Heading>{descriptor.title}</Heading>
			<Procedure {...descriptor}/>
		</Stack>
	)
}
