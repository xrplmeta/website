import createSocket from '@xrplkit/socket'
import { EventEmitter } from '@mwni/events'


export default ({ node }) => {
	let events = new EventEmitter()
	let loading = false
	let list
	let socket

	function require(){
		if(!socket)
			socket = createSocket({ url: node })
	}

	async function loadAndSubscribePage(index){
		list = await socket.request({
			command: 'tokens',
			decode_currency: true,
			limit: 100,
			offset: index * 100
		})

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

		async loadPage(index){
			loading = true
			require()
			await loadAndSubscribePage(index)
			loading = false
		}
	}
}