import { Heading, Link, Stack, Text } from '../../x'
import './SelfPublish.css'

const exampleToml = `[[ISSUERS]]
address = "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr"
name = "CasinoCoin"

[[TOKENS]]
issuer = "rCSCManTZ8ME9EoLrSHHYKW8PPwWMgkwr"
currency = "CSC"
name = "CasinoCoin"
desc = "CasinoCoin (CSC) is a digital currency, developed specifically for the regulated gaming industry."
icon = "https://xumm.app/assets/icons/currencies/ex-csc-3.png"

[[TOKENS.WEBLINKS]]
url = "https://casinocoin.im"
type = "website"
title = "Official Website"

[[TOKENS.WEBLINKS]]
url = "https://casinocoin.info"
type = "website"
title = "Token Info Dashboard"

[[TOKENS.WEBLINKS]]
url = "https://twitter.com/CasinoCoin"
type = "socialmedia"`

const exampleURL = `https://{DOMAIN}/.well-known/xrp-ledger.toml`

const exampleURLs = `https://example.com/.well-known/xrp-ledger.toml
https://xrp.services.example.com/.well-known/xrp-ledger.toml`

const exampleAccountSet = `{
    "TransactionType": "AccountSet",
    "Account" : "ISSUING_ADDRESS_HERE",
    "Domain": "HEX_ENCODED_DOMAIN_HERE"
}`

export default function SelfPublish(){
	return (
		<Stack className="section page-width self-publish">
			<Heading>Publish an xrp-ledger.toml File</Heading>
			<Text>You will need:</Text>
			<ul>
				<li>A web domain and a server or webspace with FTP access.</li>
				<li>Signing access to your token&apos;s issuing account.</li>
			</ul>
			<Heading secondary>Step 1: Craft the xrp-ledger.toml file</Heading>
			<Text>
				<span>The file should follow the </span>
				<Link to="https://github.com/XRPLF/XRPL-Standards/tree/master/XLS-0026-iou-token-metadata">XLS-26 Standard</Link>
				<span>. Below is an example.</span>
			</Text>
			<Stack className="docier snippet">
				<pre>{exampleToml}</pre>
			</Stack>
			<Heading secondary>Step 2: Upload the xrp-ledger.toml file</Heading>
			<Text>Place the file on your webserver so that it is available at the following URL:</Text>
			<pre className="snippet">{exampleURL}</pre>
			<Text>
				The {'{DOMAIN}'} is your domain name, including any subdomains. For example, you could serve
				the file from either of the following URLs:
			</Text>
			<pre className="snippet">{exampleURLs}</pre>
			<Heading secondary>Step 3: Set the Domain field on the issuing account</Heading>
			<Text>
				<span>To link your domain and the .toml file to your token&apos;s issuing account, its </span>
				<Link to="https://xrpl.org/accountroot.html#accountroot-fields" target="_blank">Domain field</Link>
				<span> has to point to your domain. </span>
				<span>This can be done using the </span>
				<Link to="https://xrpl.org/accountset.html#accountset" target="_blank">AccountSet</Link>
				<span> transaction on the ledger. Below is a snippet how this transaction should look like.</span>
			</Text>
			<Stack className="docier snippet">
				<pre>{exampleAccountSet}</pre>
			</Stack>
			<Text>
				<span>For your convenience, you can use one of the following apps to set the domain field:</span>
			</Text>
			<Text>
				<Link to="https://xrpl.services">xrpl.services</Link>
				<br/>
				<Link to="https://xrptoolkit.com">xrptoolkit.com</Link>
			</Text>
			<Heading secondary>What happens then</Heading>
			<Text>
				<span>Once your domain field is set, the </span>
				<Link to="https://github.com/xrplworks/xrplmeta">XRPL Meta Servers</Link>
				<span> will scrape your xrp-ledger.toml file within the next 10 minutes and update your token&apos;s data.</span>
			</Text>
		</Stack>
	)
}
