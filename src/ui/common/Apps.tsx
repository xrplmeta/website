import { Flex, Icon, Link, Stack, Text } from '../x'
import type { ReactNode } from 'react'

export default function Apps(){
	return (
		<Stack className="apps">
			<App icon="xumm" desc="Mobile Wallet" name="XUMM" href="https://xumm.app">
				XUMM uses XRPL Meta for displaying token icons.
			</App>
			<App icon="xdex" desc="Trading Platform" name="XDEX" href="https://xdex.com">
				XDEX uses XRPL Meta for all its market, token and NFT data.
			</App>
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
			<Icon asset={icon}/>
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
