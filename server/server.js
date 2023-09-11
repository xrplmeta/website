import dotenv from 'dotenv'
import Koa from 'koa'
import server from 'app:server'


dotenv.config()

let koa = new Koa()

koa.use(
	await server({ ssr: true })
)

koa.listen(process.env.PORT)
