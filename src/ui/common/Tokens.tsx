import { useEffect, useReducer } from 'react'
import Pager from './Pager'
import Search from './Search'
import { formatValue, Token, TokenBackend } from '../../model/TokenBackend'
import { Flex, Icon, Link, Stack } from '../x'
import './Tokens.css'

export default function Tokens({ backend }: { backend: TokenBackend }){
	const [, redraw] = useReducer(value => value + 1, 0)

	useEffect(() => {
		const off = backend.on(redraw)

		void backend.load()

		return off
	}, [backend])

	return (
		<Stack className="tokens">
			<Search input={backend.nameFilter} oninput={input => backend.setNameFilter(input)}/>
			<Flex className="head">
				<Stack>Token</Stack>
				<Stack>7 Day Trading Volume</Stack>
				<Stack>Trustlines</Stack>
			</Flex>
			{backend.list ? (
				<>
					<Stack className={`list ${backend.loading ? 'loading' : ''}`}>
						{backend.list.map(token => (
							<Entry token={token} key={`${token.currency}:${token.issuer}`}/>
						))}
					</Stack>
					{backend.pages > 1 && (
						<Pager
							page={backend.page}
							pages={backend.pages}
							onpage={page => {
								backend.setPage(page)
								window.scrollTo(0, 100)
							}}
						/>
					)}
				</>
			) : (
				<Stack className="list placeholder">
					{Array.from({ length: 8 }, (_, index) => <EntryPlaceholder key={index}/>) }
				</Stack>
			)}
		</Stack>
	)
}

function Entry({ token }: { token: Token }){
	const icon = token.meta?.token?.icon || token.meta?.issuer?.icon

	return (
		<Flex className="entry">
			<Link to={`/tokens/${token.currency}:${token.issuer}`}>
				{icon ? (
					<Icon className="icon" src={icon}/>
				) : (
					<Icon className="icon placeholder" asset="token-placeholder-white"/>
				)}
			</Link>
			<Stack className="name">
				<Link to={`/tokens/${token.currency}:${token.issuer}`}>
					<label>{token.currency}</label>
					<label>{token.issuer}</label>
				</Link>
			</Stack>
			<Stack className="volume">
				{formatValue(token.metrics?.volume_7d ?? 0)} XRP
			</Stack>
			<Stack className="trustlines">
				{(token.metrics?.trustlines ?? 0).toLocaleString('en')}
			</Stack>
		</Flex>
	)
}

function EntryPlaceholder(){
	return (
		<Flex className="entry placeholder">
			<Stack className="icon"/>
			<Stack className="name">
				<label/>
			</Stack>
			<Stack className="volume">
				<label/>
			</Stack>
			<Stack className="trustlines">
				<label/>
			</Stack>
		</Flex>
	)
}
