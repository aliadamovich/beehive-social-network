import React from 'react'
import c from './ProfileForm.module.scss'
import { useFormik } from 'formik'
import { basicSchema } from './schema'
import { MdSaveAlt } from "react-icons/md";
import { Description } from './ProfileInfo';
import { ContactsType, ProfileType } from '../../../../../types/types';
import { Checkbox, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';


type ProfileFormPropsType = {
	userProfile: ProfileType
	saveProfileInfo: (values: ProfileType) => void
	onEditClick: () => void
}

export const ProfileForm = (props: ProfileFormPropsType) => {
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
	
	return (
	
		<form onSubmit={formik.handleSubmit} className={c.form}>

			<div className={c.infoBlock}>
				<Description as='label' htmlFor="aboutMe">About Me:</Description>
				<TextArea value={formik.values.aboutMe}
					showCount maxLength={100} style={{ height: 60, resize: 'none' }}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					id='aboutMe'
					className={formik.errors.aboutMe && formik.touched.aboutMe ? `${c.error} ${c.profileTextArea}` : c.profileTextArea}
				/>
				{formik.errors.aboutMe && formik.touched.aboutMe && <p className={c.errorMessage}>{formik.errors.aboutMe}</p>}
			</div>


		<div className={c.infoBlock}>
			<Description as='label' htmlFor="fullName">Full name:</Description>
				<Input
				value={formik.values.fullName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				type="text" id='fullName' name='fullName'
				showCount maxLength={20}
				//добавляем класс с ошибкой в случае если в формик эррорс есть класс нашего инпута и он был тронут 
				className={formik.errors.fullName && formik.touched.fullName ? `${c.error} ${c.profileInput}` : c.profileInput}
			/>
			{/* сообщение об ошибке */}
			{formik.errors.fullName && formik.touched.fullName && <p className={c.errorMessage}>{formik.errors.fullName}</p>}
		</div>

		<div className={c.infoBlock}>
			<Description as='label' htmlFor="lookingForAJob">Lookin for a job: </Description>
			<Checkbox name="lookingForAJob" id="lookingForAJob"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		</div>

		<div className={c.infoBlock}>
			<Description as='label' htmlFor="lookingForAJobDescription">Job Description:</Description>
			<Input
				maxLength={40}
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
				<Input
					name={`contacts.${key}`}
					value={formik.values.contacts[key as keyof ContactsType]}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type="text" id={`contacts.${key}`}
					className={formik.errors.contacts?.[key as keyof ContactsType] && formik.touched.contacts?.[key as keyof ContactsType] ? `${c.error} ${c.profileInput}` : c.profileInput}
				/>
				{formik.errors.contacts?.[key as keyof ContactsType] && <p className={c.errorMessage}>{formik.errors.contacts?.[key as keyof ContactsType]}</p>}
			</div>
		})}
			{/* пришось делать приведение типов key as keyof ContactsType */}
			<button disabled={formik.isSubmitting} className={c.profileButton} type='submit'>
				<MdSaveAlt />
				Save Info
			</button>
		</form>

	)
}

