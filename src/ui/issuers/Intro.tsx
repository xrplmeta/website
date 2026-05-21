import { Flex, Heading, Icon, Link, Stack, Text } from '../x'
import type { ReactNode } from 'react'
import './Intro.css'
import UserApps from '../devs/UserApps'

export default function Intro(){
	return (
		<>
			<Stack className="section page-width splash">
				<Heading>Make Your XRPL Token Visible To The Ecosystem</Heading>
				<Heading secondary>Publish Once, Distribute To Many</Heading>
			</Stack>
			<Stack className="section page-width intro">
				<Heading>What XRPL Meta Is</Heading>
				<Text>
					XRPL Meta is a service that provides apps with metadata about assets on the ledger.
					It allows token- or NFT issuers, like yourself, to self-publish details about their
					projects. This is done in a decentralized manner. This means: you own your data.
				</Text>
				<Flex className="links"/>
			</Stack>
			<UserApps/>
		</>
	)
}

function Case({ app, icon, screen, accent, desc, href, children }: {
	app: string
	icon: string
	screen: string
	accent: string
	desc: string
	href: string
	children: ReactNode
}){
	return (
		<Stack className="case">
			<Stack className="phone">
				<Stack>
					<Icon asset={screen}/>
					<Icon asset={accent}/>
				</Stack>
			</Stack>
			<Flex>
				<Icon asset={icon}/>
				<Stack>
					<Link to={href} target="_blank">
						<Flex>
							<label className="name">{app}</label>
							<Icon asset="external-hint"/>
						</Flex>
					</Link>
					<label className="desc">{desc}</label>
				</Stack>
			</Flex>
			<Text>{children}</Text>
		</Stack>
	)
}
