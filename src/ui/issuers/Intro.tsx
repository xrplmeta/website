import { Flex, Heading, Icon, Link, Stack, Text } from '../x'
import type { ReactNode } from 'react'
import './Intro.css'

export default function Intro(){
	return (
		<>
			<Stack className="section page-width splash">
				<Heading>Your Gateway to the XRP Ledger Ecosystem.</Heading>
				<Heading secondary>Made for your Convenience.</Heading>
			</Stack>
			<Stack className="section page-width intro">
				<Heading>Your Token: Seen Everywhere</Heading>
				<Text>
					XRPL Meta is a service that provides apps with metadata about assets on the ledger.
					It allows token- or NFT issuers, like yourself, to self-publish details about their
					projects. This is done in a decentralized manner. This means: you own your data.
				</Text>
				<Flex className="links"/>
			</Stack>
			<Stack className="section page-width showcase in-view">
				<Flex className="strip">
					<Case
						app="Xumm"
						icon="xumm"
						screen="xumm-screen"
						accent="xumm-screen-accent"
						desc="Mobile Wallet"
						href="https://xumm.app"
					>
						XUMM uses XRPL Meta for displaying token icons.
					</Case>
					<Case
						app="XDEX"
						icon="xdex"
						screen="xdex-screen"
						accent="xdex-screen-accent"
						desc="Trading App"
						href="https://xdex.com"
					>
						XDEX uses XRPL Meta for its token indices and market data.
					</Case>
					<Stack className="case placeholder">
						<Stack className="phone"/>
						<Flex>
							<Stack className="icon"/>
							<Stack>
								<label className="name">? ? ?</label>
								<label className="desc">&nbsp;</label>
							</Stack>
						</Flex>
						<Text>Announcement soon.</Text>
					</Stack>
				</Flex>
			</Stack>
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
