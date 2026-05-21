import { Heading, Stack, Text } from '../x'

export default function Benefits(){
	return (
		<Stack className="section page-width benefits">
			<Heading>
				<span>Less Work for You,</span>
				<br/>
				<span>More Clarity for Everyone</span>
			</Heading>
			<Text>
				There currently exists no standardized way of publishing icons, descriptions, weblinks
				and other metadata about tokens on the XRPL. This project changes this. By providing a
				uniform way of writing and reading metadata, you, the token issuer, only have to publish
				this data once. And every app developer can be assured, that the data they are using is legitimate.
			</Text>
		</Stack>
	)
}
