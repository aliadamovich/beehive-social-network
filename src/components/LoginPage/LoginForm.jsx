import React from 'react'
import styled from 'styled-components'
import { Button } from '../common/Button'
import key from './../../assets/images/key.svg'
import user from './../../assets/images/userSvg.svg'
import { Field, Form, Formik } from 'formik'


export const LoginForm = (props) => {

	return (
		<>
			{/* <FormForm>
				<FieldWrappper>
					<span></span>
					<FieldField height='40px' type="text" placeholder='Email or username' />
				</FieldWrappper>
				<FieldWrappper>
					<span></span>
					<FieldField height='40px' type="password" placeholder='Password' id='password' />
				</FieldWrappper>
				<LinksWrapper>
					<CheckboxWrapper>
						<Checkbox id='checkbox' type="checkbox" placeholder='Password' />
						<label htmlFor="checkbox">Remember</label>
					</CheckboxWrapper>
					<a href="#">Lost Password?</a>
				</LinksWrapper>
				<Button>Log into your account</Button>
			</FormForm>
	 */}
	
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={(values) => { props.onLoginHandler(values)}}
			>
				{/* в props лежат все values, errors, touched, isSubmitting и тд */}
				{props => (
					//в кастомный тэг Form не надо передавать onSubmit - у него это зашито под капотом
					<Form >
						{/* Field привязывается с помощью атрибута name!-то что апойдет в стэйт */}
						<Field type="email" name="email" placeholder="Email" />
						<Field type="password" name="password" placeholder='Password' id='password' />
							{/* <input type="text"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.name}
								name="name"
						/> */}
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</>
	)
}

const FormForm = styled.form`
	display: flex;
	flex-direction: column;
`

const FieldWrappper = styled.div`
	position: relative;
	margin-bottom: 12px;
	span {
		display: inline-block;
		width: 38px;
		height: 38px;
		padding: 10px;
		background: #ffffff url(${user}) center/20px no-repeat;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 2px;
		z-index: 2;
	}
	&:nth-child(2){
		span {
			background: #ffffff url(${key}) center/20px no-repeat;
		}
	}
`

const FieldField = styled.input`
	position: relative;
	background-color: rgb(247, 247, 247);
	border: none;
	border-radius: 20px;
	padding-left: 50px;
	width: 100%;
	height: ${props => props.height};
	&::placeholder {
		font-size: 14px;
		color: rgb(98, 108, 114);
	}
`

const LinksWrapper = styled.div`
	display: flex;
	justify-content: space-between;
		label {
		display: inline-block;
		font-size: 13px;
	}
	a {
		font-size: 13px;
		color: #111010;
		&:hover{
			color: #8c30e2;
		}
	}
`

const CheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
`
const Checkbox = styled.input`
	height: 18px;
	width: 18px;
`
