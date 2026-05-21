import path from 'node:path'
import { spawn } from 'node:child_process'
import chokidar from 'chokidar'
import esbuild from 'esbuild'
import type { ChildProcess } from 'node:child_process'
import type { Plugin, PluginBuild } from 'esbuild'

const devMode = process.argv.includes('--dev')
let devServer: ChildProcess | undefined
let restartTimer: NodeJS.Timeout | undefined

function launchDevServer(): void {
	const child = spawn(
		'npx',
		['tsx', 'server.ts', '--port', '8080'],
		{
			stdio: 'inherit'
		}
	)

	devServer = child

	child.on('exit', () => {
		if (devServer === child) {
			devServer = undefined
		}
	})
}

function restartDevServer(reason: string, delay?: number): void {
	if (restartTimer)
		clearTimeout(restartTimer)

	restartTimer = setTimeout(() => {
		try {
			if(devServer){
				devServer.kill()
				console.log()
			}
		} catch {}

		if(reason){
			console.log(reason)
			console.log()
		}

		launchDevServer()
	}, delay)
}

const devPlugin: Plugin = {
	name: 'notify-rebuild',
	setup(build: PluginBuild) {
		build.onEnd(() => {
			restartDevServer(`website compiled ${new Date().toISOString()}`)
		})
	}
}

const ctx = await esbuild.context({
	platform: 'browser',
	entryPoints: ['./src/index.tsx'],
	jsx: 'automatic',
	loader: {
		'.svg': 'text',
		'.js': 'jsx'
	},
	outdir: './static',
	bundle: true,
	alias: {
		react: path.join(process.cwd(), 'node_modules/react/index.js'),
		'react/jsx-runtime': path.join(process.cwd(), 'node_modules/react/jsx-runtime.js')
	},
	plugins: [
		{
			name: 'res-exclude',
			setup(build: PluginBuild) {
				build.onResolve({ filter: /\.(png|jpg|gif|ttf)$/ }, () => ({
					external: true
				}))
			}
		},
		devMode ? devPlugin : undefined
	].filter((plugin): plugin is Plugin => Boolean(plugin))
})

if(devMode){
	const relevantEvents = new Set(['add', 'change', 'unlink'])
	const watchTargets = ['static', 'src', 'server.ts']
		.map((target) => path.join(process.cwd(), target))
	
	const serverWatcher = chokidar.watch(watchTargets, {
		ignoreInitial: true,
		persistent: true
	})

	serverWatcher.on('all', (event, changedPath) => {
		if (!relevantEvents.has(event)) {
			return
		}

		const relativePath = path.relative(process.cwd(), changedPath)

		restartDevServer(
			`server restart due to ${event} in ${relativePath}`,
			150
		)
	})

	await ctx.watch()
}else{
	await ctx.rebuild()
	console.log(`website compiled`)
	process.exit(0)
}
