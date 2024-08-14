import c from './Messages.module.scss';

export const Messages = (props) => {

	return(
		<div className={c.body__message}>
			<div className={c.message__text}>{props.text}</div>
			<div className={c.message__who}>
				<div className={c.message__avatar}>
					<img src={props.photo} alt="avatar" />
				</div>
				<div className={c.message__name}>{props.userName}</div>
			</div>
		</div>
	)
}