import { Flex, Stack, Text } from '../x'

const rows = [
	['Level 0', 'No trust at all. Default for all automatically detected tokens.'],
	['Level 1', 'The issuing account of the token has absolved Know-Your-Customer (KYC) or other identity checks.'],
	['Level 2', 'Anyone of the trusted Tokenlist publishers has checked out the team and vision behind a token and deems it trustworthy.'],
	['Level 3', 'Same as Level 2, with the addition that the Tokenlist publisher endorses the project.']
]

export default function TrustTable(){
	return (
		<Stack className="trust-table">
			{rows.map(([level, body]) => (
				<Flex key={level}>
					<label>{level}</label>
					<Text>{body}</Text>
				</Flex>
			))}
		</Stack>
	)
}
