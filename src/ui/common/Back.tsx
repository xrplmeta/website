import { useNavigate } from 'react-router'
import { Icon, Stack } from '../x'

export default function Back({ to }: { to?: string }){
	const navigate = useNavigate()

	return (
		<Stack className="page-width">
			<button className="back" onClick={() => to ? navigate(to) : navigate(-1)}>
				<Icon asset="arrow-left-hint"/>
				<label>Back to list</label>
			</button>
		</Stack>
	)
}
