import { Icon } from '../Icon';
import c from './Recent.module.scss';


export const Recent = () => {
	const recentData = [
		{ id: 1, name: "Patricia Lebsack" },
		{ id: 2, name: "Ervin Howell" },
		{ id: 3, name: "Leanne Graham" },
		{ id: 4, name: "Patricia Lebsack" },
		{ id: 5, name: "Kurtis Weissnat" }
	]
	const linksData = [
		{id: 1, href:'#', name: 'Home'},
		{ id: 2, href: '#', name: 'About us'},
		{ id: 3, href: '#', name: 'FAQs'},
		{ id: 4, href: '#', name: 'Blog'},
		{ id: 5, href: '#', name: 'Contact'},
	]
	return (
		<div className={c.recent}>
			<div className={c.recent__container}>
				<div className={c.recent__content}>
					<h3 className={c.recent__title}>Recent topics</h3>
					<ul>
						{recentData.map(d => {
							return <li className={c.recent__chat} key={d.id}>
											<Icon iconId='topic' viewBox='0 -5.5 65 65' fill="none" />
											<span>{d.name}</span>
							</li>
						})}
					</ul>
				</div>
			</div>
			<div className={c.recent__disclaimer}>
				<ul>
					{linksData.map(l => {
						return <li key={l.id}><a href={l.href}>{l.name}</a></li>
					})}
				</ul>
			</div>
		</div>
	)
}