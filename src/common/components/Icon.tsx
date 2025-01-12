import {myTheme} from '../../styles/Theme'
import sprite from './../../assets/sprite/sprite.svg'

type IconPropsType = {
	width?: string
	height?: string
	viewBox?: string
	fill?: string
	iconId?: string
}

export const Icon = (props: IconPropsType) => {
	return (
		<svg width={props.width || '24'}
			height={props.height || '24'}
			viewBox={props.viewBox || "0 0 24 24"}
			fill={props.fill || myTheme.colors.boldFontColor}>
			<use xlinkHref={`${sprite}#${props.iconId}`}></use>
		</svg>
	)
}