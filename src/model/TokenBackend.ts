export type Token = {
	currency: string
	issuer: string
	meta: {
		token: { icon?: string }
		issuer: { icon?: string }
	}
	metrics: {
		volume_7d: string | number
		trustlines: number
	}
}

const tokensPerPage = 100

type Listener = () => void

export class TokenBackend {
	loading = false
	page = 0
	nameFilter?: string
	list?: Token[]
	total = 0
	private socket?: WebSocket
	private nextId = 1
	private pending = new Map<number, { resolve: (value: any) => void, reject: (reason?: unknown) => void }>()
	private listeners = new Set<Listener>()

	constructor(private node: string){}

	get pages(){
		return Math.ceil(this.total / tokensPerPage)
	}

	on(listener: Listener){
		this.listeners.add(listener)
		return () => this.listeners.delete(listener)
	}

	setNameFilter(term?: string){
		this.nameFilter = term || undefined
		this.page = 0
		void this.loadAndSubscribe()
	}

	setPage(index: number){
		this.page = index
		void this.loadAndSubscribe()
	}

	async load(){
		await this.requireSocket()
		await this.loadAndSubscribe()
	}

	private emit(){
		for(const listener of this.listeners)
			listener()
	}

	private async loadAndSubscribe(){
		this.loading = true
		this.emit()

		try{
			const { tokens, count } = await this.request({
				command: 'tokens',
				name_like: this.nameFilter,
				decode_currency: true,
				limit: tokensPerPage,
				offset: this.page * tokensPerPage
			})

			this.list = tokens
			this.total = count
		}catch(error){
			console.error(error)
			this.list = []
			this.total = 0
		}finally{
			this.loading = false
			this.emit()
		}
	}

	private async request(payload: Record<string, unknown>){
		const socket = await this.requireSocket()
		const id = this.nextId++

		return await new Promise<any>((resolve, reject) => {
			this.pending.set(id, { resolve, reject })
			socket.send(JSON.stringify({ id, ...payload }))
		})
	}

	private async requireSocket(){
		if(this.socket?.readyState === WebSocket.OPEN)
			return this.socket

		this.socket = new WebSocket(this.node)
		this.socket.addEventListener('message', event => {
			const message = JSON.parse(event.data)
			const pending = this.pending.get(message.id)

			if(!pending)
				return

			this.pending.delete(message.id)
			if(message.error)
				pending.reject(message.error)
			else
				pending.resolve(message.result ?? message)
		})

		await new Promise<void>((resolve, reject) => {
			this.socket!.addEventListener('open', () => resolve(), { once: true })
			this.socket!.addEventListener('error', reject, { once: true })
		})

		return this.socket
	}
}

export function formatValue(value: string | number){
	const number = Number(value)
	if(!Number.isFinite(number))
		return '0'
	return Intl.NumberFormat('en', { maximumFractionDigits: 2, notation: Math.abs(number) > 999_999 ? 'compact' : 'standard' }).format(number)
}
