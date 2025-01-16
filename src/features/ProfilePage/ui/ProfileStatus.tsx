import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { myTheme } from '../../../styles/Theme'
import { Input } from 'antd';
import { EditOutlined  } from '@ant-design/icons';
import { MainButton } from '../../../common/components/MainButton';
import { useUpdateStatusMutation } from 'features/ProfilePage/api/profileApi';

type ProfileStatusPropsType = {
	isOwner: boolean
	profileStatus: string | undefined
}

export const ProfileStatus = ({ profileStatus, isOwner }: ProfileStatusPropsType) => {
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(profileStatus || '')
	const [updateStatus, {isLoading}] = useUpdateStatusMutation();

	useEffect(() => {
		if (profileStatus) {
		setStatus(profileStatus)
		}
	}, [profileStatus])

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	const blurHandler = () => {
		if (status !== profileStatus) {
			updateStatus(status)
		}
		console.log(status);
		console.log(profileStatus);
		setEditMode(false)
	}

	return (
		<StatusContainer>
			{editMode
			?<StyledInput
					variant='filled' value={status} onChange={onInputChange}
					onBlur={blurHandler}
					autoFocus={true}
					showCount maxLength={30}
				/>
				: <StatusWrapper>
					<StyledStatus>{status || 'No status'}</StyledStatus>
					{isOwner &&
						<MainButton icon={<EditOutlined />} onClick={() => { setEditMode(true) }} loading={isLoading} />
					}
				</StatusWrapper>
			}
		</StatusContainer>
	)
}

const StatusContainer = styled.div`
	position: absolute;
	top: 62%;
	right: -250px;
	/* width: 250px; */
	transform: translateY(-50%);
	z-index: 10000;

	@media ${myTheme.media[950]} {
		right: 0;
		left: 300px;
	}

	@media ${myTheme.media[768]} {
		position: static;
		transform: translateY(0%);
		padding: 0 20px;
	}
`

const StyledInput = styled(Input)`
	color: ${myTheme.colors.boldFontColor};
	height: 35px;
	outline: none
`

const StatusWrapper = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;

	button {
		background-color: ${myTheme.colors.backgroundLayout};
		svg{
			color: ${myTheme.colors.mainFontColor};
		}
	}
`
const StyledStatus = styled.div`
	display: inline-block;
	padding: 8px 10px;
	background-color: ${myTheme.colors.backgroundLayout};
	border-radius: 6px;
	color: ${myTheme.colors.boldFontColor};
`