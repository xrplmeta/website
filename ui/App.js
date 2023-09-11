import { Router } from '@architekt/router'
import { Component, Headline, Root } from '@architekt/ui'
import Stylesheet from './App.scss'
import Header from './Header.js'


export default Component(() => {
	Stylesheet()
	Root({ class: 'night' }, () => {
		Router(() => {
			Header()
		})
	})
})