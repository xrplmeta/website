import { useParams } from 'react-router'
import Back from '../common/Back'
import SelfPublish from './articles/SelfPublish'
import TrustLevel1 from './articles/TrustLevel1'
import TrustLevel2And3 from './articles/TrustLevel2And3'
import { Heading, Icon, Link, Stack, Text } from '../x'
import type { ReactNode } from 'react'
import './Docs.css'

export default function Docs(){
	const { article } = useParams()

	if(article === 'self-publish'){
		return (
			<Stack className="page issuers-docs">
				<Back to="/issuers/docs"/>
				<SelfPublish/>
			</Stack>
		)
	}

	if(article === 'trust-level-1'){
		return (
			<Stack className="page issuers-docs">
				<Back to="/issuers/docs"/>
				<TrustLevel1/>
			</Stack>
		)
	}

	if(article === 'trust-level-2-and-3'){
		return (
			<Stack className="page issuers-docs">
				<Back to="/issuers/docs"/>
				<TrustLevel2And3/>
			</Stack>
		)
	}

	return (
		<Stack className="page issuers-docs">
			<Stack className="section page-width">
				<Heading>Documentation</Heading>
				<Text>
					You can find various articles below that will explain how to properly get your token,
					NFT or project listed and shown on apps.
				</Text>
				<Stack className="articles">
					<Article
						to="/issuers/docs/self-publish"
						icon="toml"
						title="How to publish an xrp-ledger.toml file"
					>
						A three step guide on how to put metadata about your token into a .toml file,
						publish said file and link it on the XRPL.
					</Article>
					<Article
						to="/issuers/docs/trust-level-1"
						icon="trust"
						title="How to gain Trust Level 1"
					>
						A guide on how quickly gain a basic level of trust and get your token&apos;s icon
						shown on most apps.
					</Article>
					<Article
						to="/issuers/docs/trust-level-2-and-3"
						icon="supertrust"
						title="How to gain Trust Level 2 and 3"
					>
						Explanation of the special trust levels two and three, and how to increase your
						chances of achieving them.
					</Article>
				</Stack>
			</Stack>
		</Stack>
	)
}

function Article({ to, icon, title, children }: {
	to: string
	icon: string
	title: string
	children: ReactNode
}){
	return (
		<Link to={to}>
			<Stack className="image">
				<Icon asset={icon}/>
			</Stack>
			<Stack className="content">
				<Heading secondary>{title}</Heading>
				<Text>{children}</Text>
			</Stack>
		</Link>
	)
}
