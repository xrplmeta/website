import fs from 'node:fs'
import minimist from 'minimist'
import { Hono, Context } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

export function initServer(port: number){
	const app = new Hono()
	const root = import.meta.dirname

	app.use('/static/*', serveStatic({ root }))

	app.get('/*', async (c: Context) => {
		return c.html(
			fs.readFileSync(`${root}/src/index.html`, 'utf-8')
		)
	})

	serve({ fetch: app.fetch, port })
	console.log(`listening on port ${port}`)
}

const args = minimist(process.argv.slice(2))

initServer(args.port || 80)