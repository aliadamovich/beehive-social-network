import { Icon } from '../Icon';
import c from './Search.module.scss';

export const Search = () => {
	return(
		<div className={c.search}>
			<input type="text" name="" id="" placeholder='Search' />
			<div className={c.search__icon}>
				<Icon iconId='search' viewBox="0 0 129 129" fill='#FFF' width='15' height='15' />
			</div>
		</div>
	)
}