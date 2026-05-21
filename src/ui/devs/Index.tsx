import { Stack } from '../x'
import UserApps from './UserApps'
import HowToUse from './HowToUse'
import Intro from './Intro'
import Trust from './Trust'

export default function DevsIndex(){
	return (
		<Stack className="page developers about">
			<Intro/>
			<HowToUse/>
			<Trust/>
			<UserApps/>
		</Stack>
	)
}
