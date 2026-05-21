import { Heading, Link, Stack, Text } from '../x'

export default function Help(){
	return (
		<Stack className="section page-width help">
			<Heading>Need Help?</Heading>
			<Text>
				<span>Feel free to reach out to us on Twitter at </span>
				<Link to="https://twitter.com/xrplmeta">@xrplmeta</Link>
				<span> or check out the </span>
				<Link to="/issuers/docs">Frequently Asked Questions</Link>
				<span>.</span>
			</Text>
		</Stack>
	)
}
