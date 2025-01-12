
import { useFormik } from 'formik'
import { basicSchema } from '../../../lib/profileFormSchema'
import { MdSaveAlt } from "react-icons/md";
import { Description } from './ProfileInfo';
import { ContactsType, ProfileType } from '../../../../../common/types/types';
import { Checkbox, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { MainButton } from '../../../../../common/components/MainButton';
import styled from 'styled-components';


type Props = {
	userProfile: ProfileType
	saveProfileInfo: (values: ProfileType) => void
	onEditClick: () => void
}

export const ProfileForm = (props: Props) => {
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
	
		<StyledForm onSubmit={formik.handleSubmit}>

			<StyledFormBlock>
				<Description as='label' htmlFor="aboutMe">About Me:</Description>
				<TextArea value={formik.values.aboutMe}
					showCount maxLength={100} 
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					id='aboutMe'
					style={{ border: formik.errors.aboutMe && formik.touched.aboutMe ? '1px solid #f8a0a0' : '1px solid #d9d9d9' }}
				/>
			</StyledFormBlock>
			{formik.errors.aboutMe && formik.touched.aboutMe && <StyledError>{formik.errors.aboutMe}</StyledError>}

		<StyledFormBlock>
			<Description as='label' htmlFor="fullName">Full name:</Description>
				<Input
				value={formik.values.fullName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				type="text" id='fullName' name='fullName'
				showCount maxLength={20}
				style={{ border: formik.errors.fullName && formik.touched.fullName ? '1px solid #f8a0a0' : '1px solid #d9d9d9' }}
			/>
		</StyledFormBlock>
			{formik.errors.fullName && formik.touched.fullName && <StyledError>{formik.errors.fullName}</StyledError>}

		<StyledFormBlock>
			<Description as='label' htmlFor="lookingForAJob">Lookin for a job: </Description>
			<Checkbox name="lookingForAJob" id="lookingForAJob"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		</StyledFormBlock>

		<StyledFormBlock>
			<Description as='label' htmlFor="lookingForAJobDescription">Job Description:</Description>
			<Input
				maxLength={40}
				value={formik.values.lookingForAJobDescription}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				type="text" id='lookingForAJobDescription'
				name='lookingForAJobDescription'
			/>
		</StyledFormBlock>
			{formik.errors.lookingForAJobDescription && formik.touched.lookingForAJobDescription && <StyledError>{formik.errors.lookingForAJobDescription}</StyledError>}
		<h3>Contacts:</h3>

		{Object.keys(props.userProfile.contacts).map(key => {
			return <>
			 	<StyledFormBlock key={key}>
					<Description as='label' htmlFor={`contacts.${key}`}>{key}:</Description>
					<Input
						name={`contacts.${key}`}
						value={formik.values.contacts[key as keyof ContactsType]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="text" id={`contacts.${key}`}
					/>
				</StyledFormBlock>
				{ formik.errors.contacts?.[key as keyof ContactsType] && <StyledError>{formik.errors.contacts?.[key as keyof ContactsType]}</StyledError> }
	
			 	</>
		})}
			{/* пришось делать приведение типов key as keyof ContactsType */}
			<MainButton loading={false} children='Save Info' icon={<MdSaveAlt />} disabled={formik.isSubmitting} htmlType='submit'/>
		</StyledForm>

	)
}



const StyledForm = styled.form`
	>* {
			margin-bottom: 10px;
		}

	textarea {
		height: 60px;
			resize: none;
	}

	button {
		margin-top: 10px;
		max-width: 250px;
	}
`

const StyledFormBlock = styled.div`
	padding: 5px 10px;
	display: flex;
	gap: 15px;
`

const StyledError = styled.p`
	font-size: 12px;
	text-align: right;
`