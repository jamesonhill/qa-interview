import React, { Component } from 'react';
import { Link } from '@reach/router';

const style= {
	position:'absolute',
	right: '20px',
	top: '40px',
	fontSize: '20px',
	textDecoration: 'none'
}

class Dashboard extends Component {
	state = { user: null };
	componentDidMount() {
		const user = localStorage.getItem('account');
		this.setState({ user });
	}
	render() {
		const { user } = this.state;
		if(user) {
			return (
				<>
				<h1>Welcome to your dashboard, {{}.toString()}! </h1>
				<Link to="/" style={style}>Logout</Link>
				</>
			)
		}
		else {
			return (
				<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
					<h1 style={{color: 'red'}}>You must be logged in to access the dashboard</h1>
					<Link to="/" style={{fontSize: '20px', textDecoration: 'none'}}>Login</Link>
				</div>
			)
		}
	};
}
export default Dashboard;