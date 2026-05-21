import { Stack } from '../x'
import Apps from './Apps'
import HowToUse from './HowToUse'
import Intro from './Intro'
import Trust from './Trust'

export default function DevsIndex(){
	return (
		<Stack className="page developers about">
			<Intro/>
			<HowToUse/>
			<Trust/>
			<Apps/>
		</Stack>
	)
}
