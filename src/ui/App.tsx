import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router'
import DevsIndex from './devs/Index'
import DevsDocs from './devs/docs/Index'
import DevsTokens from './devs/Tokens'
import IssuersIndex from './issuers/Index'
import IssuersDocs from './issuers/Docs'
import IssuersTokens from './issuers/Tokens'
import TokenDetails from './common/TokenDetails'
import Privacy from './common/Privacy'
import { TokenBackend } from '../model/TokenBackend'
import { Absolute, Flex, Heading, Icon, Link, Stack, Text } from './x'
import type { ReactNode } from 'react'
import './App.css'

export default function App(){
	const tokens = useMemo(() => new TokenBackend('wss://s1.xrplmeta.org'), [])

	return (
		<BrowserRouter>
			<Frame tokens={tokens}/>
		</BrowserRouter>
	)
}

function Frame({ tokens }: { tokens: TokenBackend }){
	const [sectionModal, setSectionModal] = useState<'developer' | 'issuer'>()
	const [mobileMenu, setMobileMenu] = useState<ReactNode>()
	const location = useLocation()
	const navigate = useNavigate()
	const issuer = location.pathname.startsWith('/issuers')
	const year = new Date().getFullYear()

	useEffect(() => {
		document.body.classList.add('night')

		return () => document.body.classList.remove('night')
	}, [])

	function switchSection(path: string){
		navigate(path)
		setSectionModal(undefined)
	}

	return (
		<>
			<title>Token & NFT Metadata on the XRP Ledger - XRPL Meta</title>
			<header>
				<Flex>
					<button
						className="logo-button"
						onClick={() => setSectionModal(issuer ? 'issuer' : 'developer')}
					>
						<Flex className="logo">
							<Icon asset="logo"/>
							<Stack>
								<label>XRPL META</label>
								<Flex>
									<label className="issuers">for {issuer ? 'Issuers' : 'Developers'}</label>
									<Icon asset="chevron-down-prosper"/>
								</Flex>
							</Stack>
						</Flex>
					</button>
					<MainNav issuer={issuer} onMobileMenu={setMobileMenu}/>
				</Flex>
			</header>
			<Routes>
				<Route path="/" element={<DevsIndex/>}/>
				<Route path="/docs" element={<DevsDocs/>}/>
				<Route path="/docs/rest/:operation" element={<DevsDocs mode="rest"/>}/>
				<Route path="/docs/websocket/:operation" element={<DevsDocs mode="websocket"/>}/>
				<Route path="/tokens" element={<DevsTokens backend={tokens}/>}/>
				<Route path="/tokens/:token" element={<TokenDetails/>}/>
				<Route path="/issuers" element={<IssuersIndex/>}/>
				<Route path="/issuers/docs" element={<IssuersDocs/>}/>
				<Route path="/issuers/docs/:article" element={<IssuersDocs/>}/>
				<Route path="/issuers/tokens" element={<IssuersTokens backend={tokens}/>}/>
				<Route path="/privacy" element={<Privacy/>}/>
				<Route path="*" element={<Heading>Not Found</Heading>}/>
			</Routes>
			<footer>
				<Flex>
					<Stack>
						<Text>
							<span>Contact us on Twitter at </span>
							<Link to="https://twitter.com/xrplmeta">@xrplmeta</Link>
							<span>.</span>
						</Text>
						<Text>
							<span>This project is created and maintained by </span>
							<Link to="https://twitter.com/MwniTheDev">Marc-Emanuel Otto</Link>
							<span>.</span>
						</Text>
					</Stack>
					<Stack>
						<Link to="/privacy">Privacy Policy</Link>
						<label>{year} © XRPL META</label>
					</Stack>
				</Flex>
			</footer>
			{sectionModal && (
				<SectionModal
					active={sectionModal}
					onClose={() => setSectionModal(undefined)}
					onSwitch={switchSection}
				/>
			)}
			{mobileMenu && (
				<Absolute className="mobile-menu" onClick={() => setMobileMenu(undefined)}>
					<Stack className="backdrop"/>
					<Stack className="content">
						<nav>{mobileMenu}</nav>
					</Stack>
				</Absolute>
			)}
		</>
	)
}

function SectionModal({ active, onClose, onSwitch }: {
	active: 'developer' | 'issuer'
	onClose: () => void
	onSwitch: (path: string) => void
}){
	return (
		<div className="x-modal" onClick={onClose}>
			<div className="window" onClick={event => event.stopPropagation()}>
				<Stack className="modal">
					<Stack className="actions">
						<Flex className="button sheet verbose" onClick={() => onSwitch('/')}>
							<Icon asset="dot-prosper" className={active === 'developer' ? 'active' : ''}/>
							<Stack>
								<label>For Developers</label>
								<Text>All the details on how you can integrate this API into your app or project.</Text>
							</Stack>
							<Icon className="chevron" asset="chevron-right-white"/>
						</Flex>
						<Flex className="separator"/>
						<Flex className="button sheet verbose" onClick={() => onSwitch('/issuers')}>
							<Icon asset="dot-prosper" className={active === 'issuer' ? 'active' : ''}/>
							<Stack>
								<label>For Issuers</label>
								<Text>Quick guidance on how to get your token or NFTs represented the best way possible.</Text>
							</Stack>
							<Icon className="chevron" asset="chevron-right-white"/>
						</Flex>
					</Stack>
				</Stack>
			</div>
		</div>
	)
}

function MainNav({ issuer, onMobileMenu }: {
	issuer: boolean
	onMobileMenu: (children: ReactNode) => void
}){
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)

	useEffect(() => {
		const listener = () => setIsMobile(window.innerWidth < 640)

		window.addEventListener('resize', listener)

		return () => window.removeEventListener('resize', listener)
	}, [])

	const options = issuer ? (
		<>
			<Link to="/issuers" strict>Overview</Link>
			<Link to="/issuers/docs">Docs</Link>
			<Link to="/issuers/tokens">Tokens</Link>
			<Link className="twitter" to="https://twitter.com/xrplmeta">
				<Icon asset="twitter-white"/>
			</Link>
		</>
	) : (
		<>
			<Link to="/">Overview</Link>
			<Link to="/docs">Docs</Link>
			<Link to="/tokens">Tokens</Link>
			<Link className="github" to="https://github.com/Mwni/xrplmeta">
				<Icon asset="github-white"/>
			</Link>
		</>
	)

	return isMobile ? (
		<button className="burger" onClick={() => onMobileMenu(options)}>
			<Icon asset="menu-white"/>
		</button>
	) : (
		<nav>{options}</nav>
	)
}
