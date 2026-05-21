import { useParams } from 'react-router'
import { Command, Procedure } from 'docier/websocket'
import { Endpoint, Operation } from 'docier/rest'
import { rest, websocket } from '../../../defs/apis.js'
import Back from '../../common/Back'
import { Flex, Heading, Icon, Link, Stack, Text } from '../../x'
import './Index.css'

export default function DevsDocs({ mode }: { mode?: 'rest' | 'websocket' }){
	const params = useParams()

	if(mode === 'rest'){
		const descriptor = rest.find(endpoint => endpoint.id === params.operation)

		return (
			<Stack className="page docs">
				<Back/>
				<Stack className="section page-width rest endpoint">
					<Heading>{descriptor?.title ?? 'Not Found'}</Heading>
					{descriptor && <Operation {...descriptor}/>}
				</Stack>
			</Stack>
		)
	}

	if(mode === 'websocket'){
		const descriptor = websocket.find(endpoint => endpoint.id === params.operation)

		return (
			<Stack className="page docs">
				<Back/>
				<Stack className="section page-width rest endpoint">
					<Heading>{descriptor?.title ?? 'Not Found'}</Heading>
					{descriptor && <Procedure {...descriptor}/>}
				</Stack>
			</Stack>
		)
	}

	return (
		<Stack className="page docs">
			<Stack className="section page-width">
				<Heading>Documentation</Heading>
				<Text>
					<span>All endpoints below are shown using the public node URL. This can be replaced with any other node, including a </span>
					<Link to="/use">self-hosted node</Link>
					<span>.</span>
				</Text>
			</Stack>
			<Stack className="section page-width rest list">
				<Heading>REST API</Heading>
				{rest.map(endpoint => (
					<Link key={endpoint.id} to={`/docs/rest/${endpoint.id}`}>
						<Endpoint {...endpoint}/>
					</Link>
				))}
			</Stack>
			<Stack className="section page-width websocket list">
				<Heading>WebSocket API</Heading>
				{websocket.map(endpoint => (
					<Link key={endpoint.id} to={`/docs/websocket/${endpoint.id}`}>
						<Command {...endpoint}/>
					</Link>
				))}
			</Stack>
			<Stack className="section page-width public-nodes">
				<Heading>Public Nodes</Heading>
				<Text>Feel free to use one of the publicly available nodes listed below.</Text>
				<Stack className="nodes">
					<Node domain="s1.xrplmeta.org" history="History: last 12 months"/>
					<Node domain="s2.xrplmeta.org" history="History: full history" offline/>
					<Node domain="sx.xrplmeta.org" history="Experimental NFT support" offline/>
				</Stack>
				<Text className="hint">Some nodes are still in development. More will be added soon.</Text>
			</Stack>
			<Stack className="section page-width self-hosted">
				<Heading>Host your own Node</Heading>
				<Text>
					If you prefer to be independent and have complete control over your API, you can install
					the XRPL Meta Node software on your machine or server. You will need:
				</Text>
				<ul>
					<li>Node.js version 14+</li>
					<li>NPM Package Manager</li>
					<li>At least 4 GB of disk storage</li>
				</ul>
				<Text>Run the following command to install it as a global program:</Text>
				<code>npm install -g xrplmeta</code>
				<Text>
					<span>You now can start your node by running the </span>
					<code>xrplmeta</code>
					<span> command. </span>
					<span>Visit the </span>
					<Link to="https://github.com/Mwni/xrplmeta">GitHub Repository</Link>
					<span> for additional instructions.</span>
				</Text>
			</Stack>
		</Stack>
	)
}

function Node({ domain, history, offline }: {
	domain: string
	history: string
	offline?: boolean
}){
	return (
		<Flex className={offline ? 'offline' : undefined}>
			<Icon asset="cube-white"/>
			<Stack>
				<label className="domain">{domain}</label>
				<label className="history">{history}</label>
			</Stack>
		</Flex>
	)
}
