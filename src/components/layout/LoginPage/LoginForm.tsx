import { Field, Form, Formik } from 'formik'
import { loginSchema } from '../ProfilePage/tabsContent/profileInfo/schema'
import c from './LoginForm.module.scss'
import { RiKey2Line } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
import { useAppDispatch } from '../../../redux/app/hooks';
import { Button } from '../../common/Button';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { LoginTC } from '../../../redux/reducers/authSlice';

export type SubmittedValueType = {
	email: string
	password: string
	rememberMe: boolean
}


export const LoginForm = () => {
	const dispatch = useAppDispatch();
	const appStatus = useSelector<AppStateType>(state => state.app.status);

	const loginHandler = ({ email, password, rememberMe }: SubmittedValueType) => {
		dispatch(LoginTC(email, password, rememberMe))
	 }

	return (
			<>
				<Formik
					initialValues={{ email: '', password: '', rememberMe: false }}
					validationSchema={loginSchema}
					onSubmit={(values) => { loginHandler(values) }}
				>
					{/* в props лежат все values, errors, touched, isSubmitting и тд (я сразу сделала деструктуризацию) */}
					{({errors, touched}) => (
						//в кастомный тэг Form не надо передавать onSubmit - у него это зашито под капотом
						
						<Form autoComplete='off'>
							{/* Field привязывается с помощью атрибута name!-то что апойдет в стэйт */}
							<div className={c.fieldWrapper}>
								
								<LuUser2 />
								<Field type="email" name="email" placeholder="Email" 
									className={errors.email && touched.email ? `${c.error} ${c.input}` : c.input}
								/>
								<div className={c.errorContainer}>
									{errors.email && touched.email ? <div className={c.errorMessage}>{errors.email}</div> : null}
								</div>
							</div>
							
							<div className={c.fieldWrapper}>
								<RiKey2Line />
								<Field type="password" name="password" placeholder='Password' id='password' 
								className={ errors.password && touched.password ? `${c.error} ${c.input}` : c.input}/>
								<div className={c.errorContainer}>
									{errors.password && touched.password ? <div className={c.errorMessage}>{errors.password}</div> : null}
								</div>
							</div>
	
							<div className={c.checkboxWrapper}>
								<Field type="checkbox" name="rememberMe" id='rememberMe' className={c.checkbox}/>
								<label htmlFor="rememberMe">Remember</label>
							</div>
							{/* <button className={c.loginButton} type="submit" disabled={true}>Log into your account</button> */}
							<Button type='submit' disabled={appStatus === 'loading'}>Log into your account</Button>
						</Form>
					)}
				</Formik>
			</>
	)
}
