import loader from './../../images/loader.svg';

import c from './Loader.module.scss';

export const Loader = () => {
	return (
		<div className={c.loader}>
			<img src={loader} alt="" />
		</div>
	)
}