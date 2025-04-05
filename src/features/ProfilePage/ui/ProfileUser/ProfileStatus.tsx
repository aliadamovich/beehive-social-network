import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input } from 'antd';
import { EditOutlined  } from '@ant-design/icons';
import { useGetStatusQuery, useUpdateStatusMutation } from 'features/ProfilePage/api/profileApi';
import { MainButton } from 'common/components/MainButton';
import { myTheme } from 'styles/Theme';
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType';
import { useSelector } from 'react-redux';
import { selectProfileStatus } from 'features/ProfilePage/model/selectors/profileStatusSelector';
import { useSafeUserId } from 'app/hooks/useSafeUserId';

export const ProfileStatus = ({ isOwner }: ProfileProps) => {
	const [editMode, setEditMode] = useState(false)
	const userId = useSafeUserId()
	const { data: serverUserStatus } = useGetStatusQuery(userId);
	const [updateStatus, {isLoading}] = useUpdateStatusMutation();
	const [status, setStatus] = useState(serverUserStatus || '')

	useEffect(() => {
		setStatus(serverUserStatus || '')
	}, [serverUserStatus])


	const blurHandler = () => {
		if (status !== serverUserStatus && status !== '') {
			updateStatus(status)
		}
		setEditMode(false)
	}

	return (
		<StatusContainer>
			{editMode
			?
			<StyledInput
					variant='filled' value={status} onChange={(e) => { setStatus(e.currentTarget.value) }}
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