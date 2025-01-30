import { useFormik } from 'formik'
import { basicSchema } from '../../../lib/profileFormSchema'
import { MdSaveAlt } from "react-icons/md";
import { Description } from './ProfileInfo';
import { Checkbox, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { MainButton } from '../../../../../common/components/MainButton';
import styled from 'styled-components';
import { ContactsType, ProfileType } from 'features/ProfilePage/api/profileApi.types';
import { myTheme } from 'styles/Theme';
import { useSetProfileInfoMutation } from 'features/ProfilePage/api/profileApi';


type Props = {
	userProfile: ProfileType 
	setEditMode: () => void
}

export const ProfileForm = ({userProfile, setEditMode}: Props) => {

	const [setProfileInfo, {isLoading}] = useSetProfileInfoMutation()

	const formik = useFormik({
		initialValues: {
			...userProfile
		},
		validationSchema: basicSchema,
		onSubmit(values) {
			setProfileInfo(values).unwrap().then(() => setEditMode())
		},
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
			checked={formik.values.lookingForAJob}
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

		{Object.keys(userProfile.contacts).map(key => {
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
				{formik.errors.contacts?.[key as keyof ContactsType] && formik.touched.contacts?.[key as keyof ContactsType] && <StyledError>{formik.errors.contacts?.[key as keyof ContactsType]}</StyledError> }
	
			 	</>
		})}
			{/*  приведение типов key as keyof ContactsType */}
			<ButtonContainer>
				<MainButton loading={isLoading} children='Save Info' icon={<MdSaveAlt />} disabled={formik.isSubmitting} htmlType='submit'/>
			</ButtonContainer>
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

	@media ${myTheme.media[576]} {
			flex-direction: column;
	}
`

const StyledError = styled.p`
	font-size: 12px;
	text-align: right;
	color: ${myTheme.colors.error}
`

const ButtonContainer = styled.div`
	width: 100%;
	text-align: center;
`