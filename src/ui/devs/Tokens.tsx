import TokensList from '../common/Tokens'
import { TokenBackend } from '../../model/TokenBackend'
import { Heading, Link, Stack, Text } from '../x'

export default function DevsTokens({ backend }: { backend: TokenBackend }){
	return (
		<Stack className="page developers tokens">
			<Stack className="section page-width">
				<Heading>Tokens on the XRPL</Heading>
				<Text>
					<span>Below you can browse all issued tokens that are currently on the XRP Ledger. </span>
					<span>This list is in realtime and provided by </span>
					<Link to="/docs">our API</Link>
					<span>.</span>
				</Text>
				<Stack className="spacer"/>
				<TokensList backend={backend}/>
			</Stack>
		</Stack>
	)
}
