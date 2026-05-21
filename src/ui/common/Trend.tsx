import { useEffect, useRef } from 'react'

type Point = {
	t: number
	v: string | number
}

type Series = {
	gapless: (range: number) => Point[]
	at: (index: number) => Point | undefined
	on?: (event: string, listener: () => void) => void
	off?: (event: string, listener: () => void) => void
}

export default function Trend({ series, range }: { series: Series, range: number }){
	const container = useRef<HTMLDivElement>(null)
	const canvas = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		function draw(){
			const node = container.current
			const target = canvas.current

			if(!node || !target)
				return

			const bounds = node.getBoundingClientRect()
			const res = window.devicePixelRatio || 1

			target.width = bounds.width * res
			target.height = bounds.height * res
			target.style.width = `${bounds.width}px`
			target.style.height = `${bounds.height}px`

			const ctx = target.getContext('2d')

			if(!ctx)
				return

			const points = series.gapless(-range).map(point => ({
				t: point.t,
				v: Number(point.v)
			}))
			const first = series.at(-range)
			const last = points.at(-1)

			if(!first || !last || points.length === 0)
				return

			const style = window.getComputedStyle(node)
			const up = last.v > Number(first.v)
			const color = style.getPropertyValue(up ? '--color-prosper' : '--color-excite') || '#19ff83'
			const minDate = Number(first.t)
			const maxDate = Number(last.t)
			const minValue = Math.min(...points.map(point => point.v))
			const maxValue = Math.max(...points.map(point => point.v))

			ctx.clearRect(0, 0, target.width, target.height)
			ctx.strokeStyle = color
			ctx.lineWidth = 2 * res
			ctx.beginPath()

			points.forEach((point, index) => {
				const x = ((point.t - minDate) / Math.max(1, maxDate - minDate)) * target.width
				const y = (1 - ((point.v - minValue) / Math.max(1, maxValue - minValue))) * target.height

				if(index)
					ctx.lineTo(x, y)
				else
					ctx.moveTo(x, y)
			})

			ctx.stroke()
		}

		draw()
		series.on?.('update', draw)
		window.addEventListener('resize', draw)

		return () => {
			series.off?.('update', draw)
			window.removeEventListener('resize', draw)
		}
	}, [series, range])

	return (
		<div ref={container} className="chart" style={{ position: 'relative' }}>
			<canvas ref={canvas} style={{ position: 'absolute', top: 0, right: 0 }}/>
		</div>
	)
}
