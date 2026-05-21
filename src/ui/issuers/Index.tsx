import { Stack } from '../x'
import Benefits from './Benefits'
import Guide from './Guide'
import Help from './Help'
import Intro from './Intro'
import './Index.css'

export default function IssuersIndex(){
	return (
		<Stack className="page issuers overview">
			<Intro/>
			<Benefits/>
			<Guide/>
			<Help/>
		</Stack>
	)
}
