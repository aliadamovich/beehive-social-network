import { selectAuthorizedLoginId } from "features/LoginPage/model/authSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "routes/routes";

export const useSafeUserId = () => {
	const params = useParams()
	const navigate = useNavigate()
	const authorizedLoginId = useSelector(selectAuthorizedLoginId);
	let userId = params.userId ? Number(params.userId) : authorizedLoginId;

	if (!userId) {
		navigate(PATH.LOGIN)
		return
	}

	return userId
}