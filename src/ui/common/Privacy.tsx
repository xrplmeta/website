import { Heading, Stack, Text } from '../x'

export default function Privacy(){
	return (
		<Stack className="page privacy">
			<Stack className="section page-width">
				<Heading>Privacy Policy</Heading>
				<Text>
					This site does not track or store any personal information about its visitors.
					Cookies are not being used, unless explicitly wished by the user.
				</Text>
			</Stack>
		</Stack>
	)
}
