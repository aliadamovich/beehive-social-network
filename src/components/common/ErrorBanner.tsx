import { useEffect } from 'react'
import { AppStateType } from '../../redux/redux-store';
import { useSelector } from 'react-redux';
import { message } from 'antd';


export const ErrorBanner = () => {
	const apiError = useSelector<AppStateType, string | null>(state => state.app.error)
	const [messageApi, contextHolder] = message.useMessage();

	const error = () => {
		messageApi.open({
			type: 'error',
			content: apiError || 'Some error occurred',
			// style: { position: 'absolute', bottom: 50, left: 50, zIndex: 20000 }
		});
	};

	useEffect(() => {
		if (apiError !== null) {
			error(); 
		}
	}, [apiError]); 



	return (
		<div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 20000 }}>
			{contextHolder}
		</div>
	);
};
