import c from './UsersPage.module.scss';
import { UsersContainer } from './UsersContainer';
import { Search } from '../common/Search/Search';
import React from 'react';
import { Container } from '../common/Container';


export const UsersPage = () => {
	return(
		<div className={c.users}>
			<Container>
				<div className={c.users__content}>

					<Search />
					<div className={c.users__cards}>
						<UsersContainer />
					</div>

					<div className={c.sideblock}>
						<div className={c.sideblock__container}>
							<div className={c.sideblock__container}>
								<h3 className={c.sideblock__title}>Recent topics</h3>
								<div className={c.sideblock__content}>
									<ul>
										<li className={c.sideblock__hashtag}>
											<p>#beehive</p>
											<span>4</span>
										</li>
										<li className={c.sideblock__hashtag}>
											<p>#social</p>
											<span>3</span>
										</li>
										<li className={c.sideblock__hashtag}>
											<p>#test</p>
											<span>2</span>
										</li>
										<li className={c.sideblock__hashtag}>
											<p>#shop</p>
											<span>1</span>
										</li>
										<li className={c.sideblock__hashtag}>
											<p>#shop</p>
											<span>1</span>
										</li>
										<li className={c.sideblock__hashtag}>
											<p>#photos</p>
											<span>1</span>
										</li>
										<li className={c.sideblock__hashtag}>
											<p>#videos</p>
											<span>1</span>
										</li>
										<li className={c.sideblock__hashtag}>
											<p>#community</p>
											<span>1</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className={c.sideblock__disclaimer}>
							<ul>
								<li><a href="#">Home</a></li>
								<li><a href="#">About us</a></li>
								<li><a href="#">FAQs</a></li>
								<li><a href="#">Blog</a></li>
								<li><a href="#">Contact</a></li>
							</ul>
						</div>
					</div>

				</div>
			</Container>
		</div>
	)
}

