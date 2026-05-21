import TokensList from '../common/Tokens'
import { TokenBackend } from '../../model/TokenBackend'
import { Heading, Stack, Text } from '../x'

export default function IssuersTokens({ backend }: { backend: TokenBackend }){
	return (
		<Stack className="page developers tokens">
			<Stack className="section page-width">
				<Heading>Tokens on the XRPL</Heading>
				<Text>
					Below you can browse all issued tokens that are currently on the XRP Ledger.
					Use this to look up your own token and confirm all necessary metadata is there.
				</Text>
				<Stack className="spacer"/>
				<TokensList backend={backend}/>
			</Stack>
		</Stack>
	)
}
