import { Field, Form, Formik } from 'formik'
import { loginSchema } from '../ProfilePage/profile-form/schema'
import c from './LoginForm.module.scss'
import { RiKey2Line } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";

export const LoginForm = (props) => {

	return (
			<Formik
				initialValues={{ email: '', password: '', rememberMe: false }}
				validationSchema={loginSchema}
				onSubmit={(values) => { props.onLoginHandler(values)}}
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
						<button className={c.loginButton} type="submit">Log into your account</button>
					</Form>
				)}
			</Formik>
	)
}
