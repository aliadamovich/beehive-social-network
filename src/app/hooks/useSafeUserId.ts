import { selectAuthorizedLoginId } from "features/LoginPage/model/authSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const useSafeUserId = () => {
	const params = useParams()
	const authorizedLoginId = useSelector(selectAuthorizedLoginId);
	let userId = params.userId ? Number(params.userId) : authorizedLoginId;

	if (!userId) {
		throw new Error('User ID is not available')
		console.log('User ID is not available');
		
	}

	return userId
}