// import sprite from './../../assets/sprite/sprite.svg'
import {theme} from './../../styles/Theme'
import sprite from './../../assets/sprite/sprite.svg'

export const Icon = (props) => {
	return (
		<svg width={props.width || '24'}
			height={props.height || '24'}
			viewBox={props.viewBox || "0 0 24 24"}
			fill={props.fill || theme.colors.boldFont}>
			<use xlinkHref={`${sprite}#${props.iconId}`}></use>
		</svg>
	)
}