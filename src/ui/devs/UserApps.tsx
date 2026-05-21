import { Flex, Heading, Icon, Link, Stack, Text } from '../x'
import type { ReactNode } from 'react'
import './UserApps.css'

export default function UserApps(){
	return (
		<Stack className="section page-width users">
			<Heading>Who's Using It</Heading>
			<a id="apps"/>
			<Stack className="apps">
				<App icon="livenet" desc="Explorer" name="Official XRPL Explorer" href="https://livenet.xrpl.org/tokens">
					The official XRPL Explorer uses XRPL Meta for indexing all tokens.
				</App>
				<App icon="xaman" desc="Mobile Wallet" name="Xaman" href="https://xaman.app">
					Xaman uses XRPL Meta for displaying token icons.
				</App>
				<App icon="unhosted.exchange" desc="Trading Platform" name="DEX Trade xApp" href="https://xdex.com">
					The Xaman DEX Trade xApp uses XRPL Meta for listing all tradeable tokens.
				</App>
				<App icon="xdex" desc="Trading Platform" name="XDEX" href="https://xdex.com">
					XDEX uses XRPL Meta for all its market, token and NFT data.
				</App>
				<Flex className="placeholder">
					<Stack className="icon"/>
					<Stack>
						<label>Your app could be here.</label>
						<Text>
							<span>Tweet or contact us at </span>
							<Link to="https://x.com/xrplmeta">@xrplmeta</Link>
							<span>.</span>
						</Text>
					</Stack>
				</Flex>
			</Stack>
		</Stack>
	)
}

function App({ icon, desc, name, href, children }: {
	icon: string
	desc: string
	name: string
	href: string
	children: ReactNode
}){
	return (
		<Flex>
			<Icon className="app-icon" asset={icon}/>
			<Stack>
				<label className="desc">{desc}</label>
				<Link to={href} target="_blank">
					<Flex>
						<label className="name">{name}</label>
						<Icon asset="external-hint"/>
					</Flex>
				</Link>
				<Text>{children}</Text>
			</Stack>
		</Flex>
	)
}