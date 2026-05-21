import { Flex, Heading, Icon, Link, Stack, Text } from '../x'
import type { ReactNode } from 'react'
import './Guide.css'

export default function Guide(){
	return (
		<Stack className="section page-width guide">
			<Heading>How to Add Your Data</Heading>
			<Text>There are two steps to properly establish your token on this network:</Text>
			<Stack className="steps">
				<Step icon="toml" title="Self-publish your data" to="/issuers/docs/self-publish">
					This is done by hosting an xrp-ledger.toml file on your token&apos;s website.
				</Step>
				<Step icon="trust" title="Gain trust from peers" to="/issuers/docs/trust-level-1">
					Your first step can be to absolve Know-Your-Customer (KYC).
				</Step>
			</Stack>
		</Stack>
	)
}

function Step({ icon, title, to, children }: {
	icon: string
	title: string
	to: string
	children: ReactNode
}){
	return (
		<Flex>
			<Icon asset={icon}/>
			<Stack>
				<Heading secondary>{title}</Heading>
				<Text>{children}</Text>
				<Link to={to}>
					<label>Learn how</label>
					<Icon asset="arrow-right-prosper"/>
				</Link>
			</Stack>
		</Flex>
	)
}
