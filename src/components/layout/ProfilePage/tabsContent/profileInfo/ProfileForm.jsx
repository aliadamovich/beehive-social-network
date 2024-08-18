import React from 'react'
import c from './ProfileForm.module.scss'
import { useFormik } from 'formik'
import { basicSchema } from './schema'
import { MdSaveAlt } from "react-icons/md";
import { Description } from './ProfileInfo';


export const ProfileForm = (props) => {
	const formik = useFormik({
		initialValues: {
			...props.userProfile
		},
		validationSchema: basicSchema,
		onSubmit(values) {
			props.saveProfileInfo(values)
			props.onEditClick()
		}, //когда сработает событие onSubmit формик вызовет handleSubmit который в свою очередь вызовет ф-ю которую мы тут прописали (выше ееопределение)
	})
	// console.log(formik.errors)
	
	return (
	
		<form onSubmit={formik.handleSubmit} className={c.form}>

			<div className={c.infoBlock}>
				<Description as='label' htmlFor="aboutMe">About Me:</Description>
				<textarea value={formik.values.aboutMe}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					id='aboutMe'
					className={formik.errors.aboutMe && formik.touched.aboutMe ? `${c.error} ${c.profileTextArea}` : c.profileTextArea}
				/>
				{formik.errors.aboutMe && formik.touched.aboutMe && <p className={c.errorMessage}>{formik.errors.aboutMe}</p>}
			</div>


		<div className={c.infoBlock}>
			<Description as='label' htmlFor="fullName">Full name:</Description>
			<input
				value={formik.values.fullName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				type="text" id='fullName' name='fullName'
				//добавляем класс с ошибкой в случае если в формик эррорс есть класс нашего инпута и он был тронут 
				className={formik.errors.fullName && formik.touched.fullName ? `${c.error} ${c.profileInput}` : c.profileInput}
			/>
			{/* сообщение об ошибке */}
			{formik.errors.fullName && formik.touched.fullName && <p className={c.errorMessage}>{formik.errors.fullName}</p>}
		</div>

		<div className={c.infoBlock}>
			<Description as='label' htmlFor="lookingForAJob">Lookin for a job: </Description>
			<input type="checkbox" name="lookingForAJob" id="lookingForAJob"
				// className={s.checkbox}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		</div>

		<div className={c.infoBlock}>
			<Description as='label' htmlFor="lookingForAJobDescription">Job Description:</Description>
			<input
				value={formik.values.lookingForAJobDescription}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				type="text" id='lookingForAJobDescription'
				name='lookingForAJobDescription'
				className={formik.errors.lookingForAJobDescription && formik.touched.lookingForAJobDescription ? `${c.error} ${c.profileInput}` : c.profileInput}
			/>
			{formik.errors.lookingForAJobDescription && formik.touched.lookingForAJobDescription && <p className={c.errorMessage}>{formik.errors.lookingForAJobDescription}</p>}
		</div>

		<h3>Contacts:</h3>

		{Object.keys(props.userProfile.contacts).map(key => {
			return <div className={c.infoBlock} key={key}>
				<Description as='label' htmlFor={`contacts.${key}`}>{key}:</Description>
				<input
					name={`contacts.${key}`}
					value={formik.values.contacts[key]}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type="text" id={`contacts.${key}`}
					className={formik.errors.contacts?.[key] && formik.touched.contacts?.[key] ? `${c.error} ${c.profileInput}` : c.profileInput}
				/>
				{formik.errors.contacts?.[key] && <p className={c.errorMessage}>{formik.errors.contacts?.[key]}</p>}
			</div>
		})}

			<button disabled={formik.isSubmitting} className={c.profileButton} type='submit'>
				<MdSaveAlt />
				Save Info
			</button>
		</form>

	)
}

