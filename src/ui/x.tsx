import React from 'react'
import { useLocation, useMatch, useNavigate, useResolvedPath } from 'react-router'
import './x.css'

type ElementProps<T extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[T] & {
	secondary?: boolean
}

export function Stack({ className, ...props }: React.HTMLAttributes<HTMLDivElement>){
	return (
		<div {...props} className={join('x-stack', className)}/>
	)
}

export function Flex({ className, ...props }: React.HTMLAttributes<HTMLDivElement>){
	return (
		<div {...props} className={join('x-flex', className)}/>
	)
}

export function Absolute({ className, ...props }: React.HTMLAttributes<HTMLDivElement>){
	return (
		<div {...props} className={join('x-absolute', className)}/>
	)
}

export function Heading({ className, secondary, ...props }: ElementProps<'span'>){
	return (
		<span
			{...props}
			secondary={secondary ? '' : undefined}
			className={join('x-heading', className)}
		/>
	)
}

export function Text({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>){
	return (
		<p {...props} className={join('x-text', className)}/>
	)
}

type IconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	asset?: string
	multicolor?: boolean
}

const pngAssets = new Set(['xumm', 'xdex'])

export function Icon({ asset, src, className, alt = '', multicolor: _multicolor, ...props }: IconProps){
	const resolved = src ?? (asset ? `/static/${asset}.${pngAssets.has(asset) ? 'png' : 'svg'}` : undefined)

	return (
		<img
			{...props}
			alt={alt}
			src={resolved}
			className={join('x-icon', className)}
		/>
	)
}

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
	to?: string
	strict?: boolean
	disabled?: boolean
}

export function Link({ to = '#', strict, className, children, target, disabled, onClick, ...props }: LinkProps){
	const location = useLocation()
	const navigate = useNavigate()
	const href = resolveHref(to, location.pathname)
	const isExternal = /^https?:\/\//.test(href)
	const resolved = useResolvedPath(isExternal ? '/' : href)
	const match = useMatch({ path: resolved.pathname, end: strict ?? href === '/' })
	const active = Boolean(match)

	if(disabled){
		return (
			<a
				{...props}
				className={join('x-link', className)}
				disabled=""
				onClick={onClick}
			>
				{children}
			</a>
		)
	}

	if(isExternal || target){
		return (
			<a
				{...props}
				className={join('x-link', className)}
				href={href}
				target={target}
				rel={target === '_blank' ? 'noreferrer' : undefined}
				onClick={onClick}
			>
				{children}
			</a>
		)
	}

	return (
		<a
			{...props}
			className={join('x-link', className)}
			href={href}
			active={active ? '' : undefined}
			onClick={event => {
				onClick?.(event)

				if(event.defaultPrevented)
					return

				event.preventDefault()
				navigate(href)
			}}
		>
			{children}
		</a>
	)
}

function resolveHref(to: string, pathname: string){
	if(to.startsWith('%/'))
		return `${pathname.replace(/\/$/, '')}${to.slice(1)}`

	return to
}

function join(...parts: Array<string | undefined | false>){
	return parts.filter(Boolean).join(' ')
}
