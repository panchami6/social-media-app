import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ path, ...props }) => {
	const {token}  = useSelector(state => state.auth)

	return token ? (
		<div>
		<Route {...props} path={path} />
		</div>
	) : (
		<div>
		<Navigate state={{ from: path}} replace to='/login' />
		</div>
	);
};