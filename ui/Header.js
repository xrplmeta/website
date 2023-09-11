import { Fragment, HStack, Icon, Text, VStack, WebLink } from '@architekt/ui'
import { Link } from '@architekt/router'
import Stylesheet from './Header.scss'
import logo from '../assets/icons/logo.svg'
import chevronDown from '../assets/icons/chevron-down.svg'
import twitterLogo from '../assets/icons/twitter.svg'
import githubLogo from '../assets/icons/github.svg'


export default Fragment(() => {
	Stylesheet()
	VStack({ class: 'header' }, () => {
		HStack({ class: 'content' }, () => {
			Link({ path: '/' }, () => {
				HStack({ class: 'brand' }, () => {
					Icon({
						class: 'logo',
						asset: logo
					})
					Text({
						class: 'name',
						text: 'XRPL META'
					})
				})
			})
			HStack({ class: 'nav' }, () => {
				Link({ class: 'multi', path: 'developers' }, () => {
					HStack(() => {
						Text({
							text: 'For Developers'
						})
						Icon({
							class: 'arrow',
							asset: chevronDown
						})
					})
				})
				Link({ class: 'multi', path: 'issuers' }, () => {
					HStack(() => {
						Text({
							text: 'For Issuers'
						})
						Icon({
							class: 'arrow',
							asset: chevronDown
						})
					})
				})
				Link({
					class: 'simple',
					path: 'tokens',
					text: 'Tokens'
				})
				Link({
					class: 'simple',
					path: 'nfts',
					text: 'NFTs'
				})
				WebLink({ url: 'https://twitter.com/xrplmeta' }, () => {
					Icon({
						asset: twitterLogo
					})
				})
				WebLink({ url: 'https://github.com/xrplmeta' }, () => {
					Icon({
						asset: githubLogo
					})
				})
			})
		})
	})
})