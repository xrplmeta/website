import { ExampleRequest } from 'docier/rest'
import { rest } from '../../defs/apis.js'
import { Heading, Link, Stack, Text } from '../x'
import './HowToUse.css'

export default function HowToUse(){
	return (
		<Stack className="section page-width how-to-use">
			<Heading>How to use it</Heading>
			<Text>
				<span>
					Simply call the desired API endpoint by either using HTTP GET, or establish a WebSocket
					connection for high frequency / high traffic requests. All available methods are explained
					in full detail in the
				</span>
				<span> </span>
				<Link to="/docs">API Documentation</Link>
				<span>.</span>
			</Text>
			<Heading secondary>Example Request</Heading>
			<Stack className="example-request">
				<ExampleRequest {...rest[1]} path="/v2/token/USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"/>
			</Stack>
		</Stack>
	)
}
