import { Heading, Link, Stack, Text } from '../../x'

export default function TrustLevel1(){
	return (
		<Stack className="section page-width">
			<Heading>Gain Trust Level 1</Heading>
			<Text>
				A quick way to establish basic trust amongst peers is to absolve Know-Your-Customer (KYC)
				and link it to your token&apos;s issuing account. By putting down name and address, an issuer,
				like yourself, shows good faith and agrees to take personal responsibility for the actions
				made in the project&apos;s name.
			</Text>
			<Stack className="spacer"/>
			<Text>There are two XRPL compatible KYC providers:</Text>
			<Text>
				<Link to="https://support.xumm.app/hc/en-us/articles/4474074425746-KYC-and-Xumm" target="_blank">Xumm KYC</Link>
				<br/>
				<Link to="https://global.id" target="_blank">GlobaliD KYC</Link>
			</Text>
			<Stack className="spacer"/>
			<Text>
				<span>Please note however, that the GlobaliD KYC needs to be linked to your issuing account in an extra step. </span>
				<span>This is explained in detail in the </span>
				<Link to="https://support.xumm.app/hc/en-us/articles/4403121678226">Xumm Documentation</Link>
				<span>.</span>
			</Text>
			<Heading secondary>What happens then</Heading>
			<Text>
				<span>After absolving the KYC process, it may take up to 24 hours for the </span>
				<Link to="https://github.com/xrplworks/xrplmeta">XRPL Meta Servers</Link>
				<span> to register the changes and update your trust level.</span>
			</Text>
		</Stack>
	)
}
