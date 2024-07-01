import React from 'react'
import c from './ProfileForm.module.scss'
import { useFormik } from 'formik'
import { basicSchema } from './schema'
import styled from 'styled-components'
import { theme } from '../../../styles/Theme'

// const onSubmit = (values, actions) => {
// 	console.log(values)
// 	//встроенный метод затирания поля после отправки формы
// 	// actions.resetForm()
// 	props.saveProfileInfo()
// }

export const ProfileForm = (props) => {
	const formik = useFormik({
		initialValues: {
			aboutMe: '',
			fullName: '',
			lookingForAJobDescription: '',
			contacts:{
				facebook: '',
				website: '',
				instagram: '',
				vk: '',
				twitter: '',
				instagram: '',
				youtube: '',
				github: '',
				mainLink: '',
 			},
		
		},
		validationSchema: basicSchema,
		onSubmit(values) {
			console.log(values)
			props.saveProfileInfo(values)
			props.onEditClick()
		}, //когда сработает событие onSubmit формик вызовет handleSubmit который в свою очередь вызовет ф-ю которую мы тут прописали (выше ееопределение)
	})
	// console.log(formik.errors)
	
	return (
	
		<form onSubmit={formik.handleSubmit} className={c.form}>

		<InfoBlock>
			<Label htmlFor="aboutMe">About Me:</Label>
			<textarea value={formik.values.aboutMe} 
			onChange={formik.handleChange} 
			onBlur={formik.handleBlur} 
			id='aboutMe' 
			className={formik.errors.aboutMe && formik.touched.aboutMe ? c.error : c.input}
			/>
		{formik.errors.fullName && formik.touched.fullName && <p className={c.errorMessage}>{formik.errors.fullName}</p>}
		</InfoBlock>
	

		<InfoBlock>
			<Label htmlFor="fullName">Full name:</Label>
			<input 
			value={formik.values.fullName} 
			onChange={formik.handleChange} 
			onBlur={formik.handleBlur} 
			type="text" id='fullName' name='fullName'
			//добавляем класс с ошибкой в случае если в формик эррорс есть класс нашего инпута и он был тронут 
			className={formik.errors.fullName && formik.touched.fullName ? c.error : c.input}
			/>
		{/* сообщение об ошибке */}
		{formik.errors.fullName && formik.touched.fullName && <p className={c.errorMessage}>{formik.errors.fullName}</p>}
		</InfoBlock>

		<InfoBlock>
				<Label htmlFor="lookingForAJob">Lookin for a job: </Label>
				<input type="checkbox" name="lookingForAJob" id="lookingForAJob" />
		</InfoBlock>

		<InfoBlock>
		<Label htmlFor="lookingForAJobDescription">Job Description:</Label>
		<input 
		value={formik.values.lookingForAJobDescription} 
		onChange={formik.handleChange} 
		onBlur={formik.handleBlur}  
		type="text" id='lookingForAJobDescription' 
		name='lookingForAJobDescription'
		className={formik.errors.lookingForAJobDescription && formik.touched.lookingForAJobDescription ? c.error : c.input}
		/>
		{formik.errors.lookingForAJobDescription && formik.touched.lookingForAJobDescription && <p className={c.errorMessage}>{formik.errors.lookingForAJobDescription}</p>}
		</InfoBlock>

				<h3>Contacts:</h3>

				{Object.keys(props.userProfile.contacts).map(key => {
					return <InfoBlock key={key}>
						<Label htmlFor={`contacts.${key}`}>{key}:</Label>
						<input
							name={`contacts.${key}`}
							value={formik.values.contacts[key]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type="text" id={`contacts.${key}`}
							className={formik.errors.contacts?.[key] && formik.touched.contacts?.[key] ? c.error : c.input}
						/>
						{formik.errors.contacts?.[key] && <p className={c.errorMessage}>{formik.errors.contacts?.[key]}</p>}
					</InfoBlock>
				})}

					<button 
					// disabled={formik.isSubmitting} 
					type='submit'>Save Info</button>
			</form>

	)
}

const Label = styled.label`
	font-size: 14px;
	font-weight: 600;
	color: ${theme.colors.boldFont};
	background-color: #edf1f5;
	padding: 5px;
	min-width: 150px;
`

const InfoBlock = styled.div`
	padding: 10px;
	border-bottom: 1px sold #edf1f5;
	display: flex;
	/* align-items: center; */
	/* gap: 15px; */
	`

