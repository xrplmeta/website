import { Text } from '../x'
import './TrustLevels.css'

const rows = [
	['0', 'No trust at all. Default for all automatically detected tokens.'],
	['1', 'Issuing account absolved Know-Your-Customer (KYC) or other identity checks.'],
	['2', 'Manually vetted project. Trusted to not rugpull.'],
	['3', 'Endorsed Token. Seen as a great project by trusted Tokenlist publishers.']
]

export default function TrustLevels(){
	return (
		<table className="trust-levels">
			<thead>
				<tr>
					<th>Level</th>
					<th>Requirements</th>
				</tr>
			</thead>
			<tbody>
				{rows.map(([level, body]) => (
					<tr key={level}>
						<td>
							<label>{level}</label>
						</td>
						<td>
							<Text>{body}</Text>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
