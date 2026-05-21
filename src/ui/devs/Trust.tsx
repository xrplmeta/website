import TrustTable from '../common/Trust'
import { Heading, Link, Stack, Text } from '../x'

export default function Trust(){
	return (
		<Stack className="section page-width trust">
			<Heading>How Trust is established</Heading>
			<Text>
				Anyone can create a token and publish its metadata. The token could be a scam, and the
				metadata could contain offensive or illegal material. The way XRPL Meta protects from bad
				actors, is by assigning a trust level to each token.
			</Text>
			<TrustTable/>
			<Heading secondary>Trust Lists</Heading>
			<Text>
				<span>
					The way trust level 2 and 3 are established is through so called "Trust Lists".
					These lists can be published by anyone, and are automatically scraped by 
				</span>
				<span> </span>
				<Link to="https://github.com/xrplmeta/node">XRPL Meta Nodes</Link>
				<span>
					. However, only the lists of trusted publishers have the ability set the trust level
					for any token. All lists are expected to follow the
				</span>
				<span> </span>
				<Link to="https://github.com/XRPLF/XRPL-Standards/discussions/71">XLS-26 Standard</Link>
				<span>.</span>
			</Text>
		</Stack>
	)
}
