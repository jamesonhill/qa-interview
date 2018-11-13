import React from 'react';
import { Link } from '@reach/router';

const style= {
	position:'absolute',
	right: '20px',
	top: '40px',
	fontSize: '20px',
	textDecoration: 'none'
}

const Dashboard = () => {
	return (
		<>
			<h1>Welcome to your dashboard, {{}.toString()}! </h1>
			<Link to="/" style={style}>Logout</Link>
		</>
	);
}
export default Dashboard;