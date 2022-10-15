import createSocket from '@xrplkit/socket'
import { EventEmitter } from '@mwni/events'


const tokensPerPage = 100


export default ({ node }) => {
	let events = new EventEmitter()
	let loading = false
	let page = 0
	let nameFilter
	let list
	let total
	let socket

	function require(){
		if(!socket)
			socket = createSocket({ url: node })
	}

	async function loadAndSubscribe(){
		loading = true

		let { tokens, count } = await socket.request({
			command: 'tokens',
			name_like: nameFilter,
			decode_currency: true,
			limit: tokensPerPage,
			offset: page * tokensPerPage
		})

		list = tokens
		total = count
		loading = false

		events.emit('update')
	}

	return {
		events,

		get loading(){
			return loading
		},

		get list(){
			return list
		},

		get page(){
			return page
		},

		get pages(){
			return Math.ceil(total / tokensPerPage)
		},

		get nameFilter(){
			return nameFilter
		},

		setNameFilter(term){
			nameFilter = term ? term : undefined
			loadAndSubscribe()
		},

		setPage(index){
			page = index
			loadAndSubscribe()
		},

		async load(){
			require()
			await loadAndSubscribe()
		}
	}
}