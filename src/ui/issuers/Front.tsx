import { Heading, Icon, Link, Stack, Text } from '../x'

export default function Front(){
	return (
		<Stack className="section page-width">
			<Heading>How to get your Token listed</Heading>
			<Text>
				<span>To get your token&apos;s metadata onto the XRPL Meta network and shown on all </span>
				<Link to="/#apps">partnering apps</Link>
				<span>, you must do the two following steps.</span>
			</Text>
			<Heading secondary>1. Publish a xrp-ledger.toml File</Heading>
			<Text>
				<span>The </span>
				<Link to="https://xrpl.org/xrp-ledger-toml.html#xrp-ledgertoml-file">xrp-ledger.toml</Link>
				<span> file provides a way for token issuers to self-publish informations about themselves and their token. </span>
				<span>
					XRPL Meta automatically discovers these files. Any information you publish there will be
					shown on all partnering apps.
				</span>
			</Text>
			<Link className="doc-link" to="/issuers/docs/self-publish">
				<span>Learn how to publish a xrp-ledger.toml</span>
				<Icon asset="arrow-right-black"/>
			</Link>
			<Heading secondary>2. Become trusted</Heading>
			<Text>
				Many apps choose to not show the metadata of untrusted tokens. XRPL Meta establishes trust
				by assigning a &quot;trust level&quot; to each token.
			</Text>
			<Link className="doc-link" to="/issuers/docs/trust-level-1">
				<span>Learn how to increase your trust level</span>
				<Icon asset="arrow-right-black"/>
			</Link>
		</Stack>
	)
}
