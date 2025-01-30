import * as yup from 'yup'

export const basicSchema = yup.object().shape({
	aboutMe: yup.string().required('Required'),
	fullName: yup.string().min(3).required('Required'),
	lookingForAJobDescription: yup.string().required('Required'),
	contacts: yup.object().shape({
		facebook: yup.string().url('Must be a valid URL starting with https://').nullable(),
		website: yup.string().url('Must be a valid URL starting with https://').nullable(),
		twitter: yup.string().url('Must be a valid URL starting with https://').nullable(),
		instagram: yup.string().url('Must be a valid URL starting with https://').nullable(),
		vk: yup.string().url('Must be a valid URL starting with https://').nullable(),
		youtube: yup.string().url('Must be a valid URL starting with https://').nullable(),
		github: yup.string().url('Must be a valid URL starting with https://').nullable(),
		mainLink: yup.string().url('Must be a valid URL starting with https://').nullable(),
	}),
})

export const loginSchema = yup.object().shape({
	email: yup.string().email('Please enter a valid email').required('Required'),
	password: yup.string().min(3).required('Required'),
})
