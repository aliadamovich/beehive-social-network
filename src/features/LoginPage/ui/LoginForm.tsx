import { Field, Form, Formik } from 'formik'
import { loginSchema } from '../../ProfilePage/lib/profileFormSchema'
import c from './LoginForm.module.scss'
import { RiKey2Line } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/hooks/hooks';
import { setIsAuth } from 'features/LoginPage/model/authSlice';
import { useLoginMutation } from 'features/LoginPage/api/authApi';
import { ResultCodes } from 'common/enums/enum';
import { useLazyGetProfileQuery } from 'features/ProfilePage/api/profileApi';
import { MainButton } from 'common/components/MainButton';

export type SubmittedValueType = {
	email: string
	password: string
	rememberMe: boolean
}


export const LoginForm = () => {
	const [login, {isLoading}] = useLoginMutation()
	const [getProfileData] = useLazyGetProfileQuery()
	const dispatch = useAppDispatch()

	const loginHandler = (data: SubmittedValueType, resetForm: () => void) => {
		login(data)
			.then((resp) => {
				if (resp.data?.resultCode === ResultCodes.Success && 'userId' in resp.data?.data) {
				getProfileData(resp.data.data.userId)
					.then((res) => {
						dispatch(setIsAuth({ isAuth: true, userId: res.data?.userId }))
						resetForm()
					})
			}
		})
		
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
