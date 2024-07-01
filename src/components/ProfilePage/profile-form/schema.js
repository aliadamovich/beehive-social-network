import * as yup from 'yup'

export const basicSchema = yup.object().shape({
	aboutMe: yup.string().required('Required'),
	fullName: yup.string().min(3).required('Required'),
	fullName: yup.string().min(3).required('Required'),
	lookingForAJobDescription: yup.string().min(3).required('Required'),
	contacts: yup.object().shape({
		facebook: yup.string().url().nullable(),
		website: yup.string().url().nullable(),
		instagram: yup.string().url().nullable(),
	}),
	
	
	
	// email: yup.string().email('Please enter a valid email').required('Required'),
	// password: yup.string().min(3).required('Required'),
})