import { Flex, Heading, Icon, Link, Stack, Text } from '../x'
import './Intro.css'

const tokenFeatures = [
	'List of all tokens on the XRPL',
	'Icons, Names, Descriptions',
	'Weblinks for Infos and Community',
	'KYC status, Trust level',
	'Market: Price, Volume, Unique Traders, etc',
	'Statistics: Trustlines, Supply, Whales, etc',
	'Scam, Spam and other Warnings',
	'Historical Statistics'
]

const ledgerFeatures = [
	'Lookup Ledger Index by Time',
	'Get Fees and Transaction Counts',
	'Historical Statistics',
	'Time Series of Statistics'
]

export default function Intro(){
	return (
		<>
			<Stack className="section page-width splash">
				<Heading>The API for Asset Metadata on the XRP Ledger.</Heading>
				<Heading secondary>Free and Decentralized.</Heading>
			</Stack>
			<Stack className="section page-width intro">
				<Heading>An Extension to the XRP Ledger</Heading>
				<Text>
					XRPL Meta provides the data that is not obtainable by the standard rippled API.
					It makes the data available through a JSON REST and WebSocket API, just like rippled.
					It connects to any number of rippled nodes and tracks updates in real time.
					Historical data is being backfilled.
				</Text>
				<Flex className="links">
					<Link className="button" to="https://github.com/Mwni/xrplmeta">
						<Icon asset="github-white"/>
						<label>Source Code</label>
						<Icon asset="external-white"/>
					</Link>
				</Flex>
			</Stack>
			<Stack className="section page-width features">
				<Flex className="dual-col">
					<Stack>
						<Tile asset="token" title="Token Data" items={tokenFeatures}/>
					</Stack>
					<Stack>
						<Tile asset="ledger" iconClass="ledger" title="Ledger Data" items={ledgerFeatures}/>
						<Stack className="tile issuers-note">
							<Flex>
								<Heading secondary>Are you a token issuer?</Heading>
								<Link to="/issuers">
									<label>Yes</label>
									<Icon asset="chevron-right-prosper"/>
								</Link>
							</Flex>
							<Heading/>
							<Text>Learn how to get your token listed on the network.</Text>
						</Stack>
					</Stack>
				</Flex>
			</Stack>
		</>
	)
}

function Tile({ asset, iconClass, title, items, pending, disabled, note }: {
	asset: string
	iconClass?: string
	title: string
	items: string[]
	pending?: boolean
	disabled?: boolean
	note?: string
}){
	return (
		<Stack className={`tile ${pending ? 'nft' : ''}`}>
			<Flex>
				<Icon asset={`${asset}-white`} className={iconClass}/>
				<Heading secondary>{title}</Heading>
				<Link to="/docs" disabled={disabled}>
					<label>Docs</label>
					<Icon asset="chevron-right-prosper"/>
				</Link>
			</Flex>
			<Stack className="checklist">
				{items.map(item => (
					<Flex key={item}>
						<Icon asset={pending ? 'hourglass-warn' : 'tick-prosper'}/>
						<Text>{item}</Text>
					</Flex>
				))}
			</Stack>
			{note && <Text>{note}</Text>}
		</Stack>
	)
}
