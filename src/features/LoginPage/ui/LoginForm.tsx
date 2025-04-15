import { Field, Form, Formik } from 'formik'
import { loginSchema } from '../../ProfilePage/lib/profileFormSchema'
import c from './LoginForm.module.scss'
import { RiKey2Line } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
import { useAppDispatch } from 'app/hooks/hooks';
import { setIsAuth } from 'features/LoginPage/model/authSlice';
import { useLoginMutation } from 'features/LoginPage/api/authApi';
import { ResultCodes } from 'common/enums/enum';
import { MainButton } from 'common/components/MainButton';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'routes/routes';

export type SubmittedValueType = {
	email: string
	password: string
	rememberMe: boolean
}


export const LoginForm = () => {
	const [login, {isLoading}] = useLoginMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const loginHandler = async (data: SubmittedValueType, resetForm: () => void) => {
		try {
			const res = await login(data).unwrap()
			if (res.resultCode === ResultCodes.Success && 'userId' in res.data) {
				localStorage.setItem('token', res.data.token)
				dispatch(setIsAuth({ isAuth: true, userId: res.data.userId }))
				navigate(PATH.PROFILE)
				resetForm()
			}
		} catch (error) {
			console.log('error when logging in', error);
		}
	 }

	return (
			<>
				<Formik
					initialValues={{ email: '', password: '', rememberMe: false }}
					validationSchema={loginSchema}
					onSubmit={(values, actions) => { loginHandler(values, actions.resetForm) }}
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
							<MainButton htmlType='submit' loading={isLoading}>Log in to your account</MainButton>
						</Form>
					)}
				</Formik>
			</>
	)
}
