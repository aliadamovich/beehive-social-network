import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { resetAppError, selectError } from 'app/appSlice';
import { useAppDispatch } from 'app/hooks';


export const ErrorBanner = () => {
	const apiError = useSelector(selectError)
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();

	const error = () => {
		messageApi.open({
			type: 'error',
			content: apiError || 'Some error occurred',
			duration: 4
			// style: { position: 'absolute', bottom: 50, left: 50, zIndex: 20000 }
		});
	};

	useEffect(() => {

		if (apiError !== null) {
			messageApi.open({
				type: "error",
				content: apiError || "Some error occurred",
				duration: 4,
			});
		}
		const timer = setTimeout(() => {
			dispatch(resetAppError());
		}, 4000);

			return () => clearTimeout(timer);
	}, [apiError])



	return (
		<div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 20000 }}>
			{contextHolder}
		</div>
	);
};
