import React, {Component} from 'react';
import {Form, Button, Toast} from 'react-bootstrap';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			error: false
		}
	}

	handleLogin = () => {
		// dummy login validation handler function
		const {username, password} = this.state;
		if(username === 'tarang' && password === '12345678')
			this.props.history.push('/home');
		else {
			this.setState({error: true})
		}
	}

	render() {
		const {error} = this.state;
		return (
			  <div style={{width: '100%'}}>
			  	<div style={{width: '50%', margin: 'auto', textAlign: 'center', fontWeight: 'bold', marginTop: '15%'}}><h2>MIRROR CHAT</h2></div>
			  	<Form style={{width: '50%', margin: 'auto', marginTop: '10%'}}>
				  <Form.Group controlId="formBasicEmail">
				    <Form.Label>Username</Form.Label>
				    <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.setState({username: e.target.value})} />
				    <Form.Text className="text-muted">
				      We'll never share your email with anyone else.
				    </Form.Text>
				  </Form.Group>

				  <Form.Group controlId="formBasicPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} onKeyDown={(e) => {
				    	if(e.key === 'Enter')
				    		this.handleLogin();
				    }} />

				  </Form.Group>
				  <Button style={{width: '50%', marginLeft: '25%'}} onClick={this.handleLogin} variant="primary">
				    Login
				  </Button>
				  <Toast style={{position: 'fixed', top: '0px', right: '0px', width: '50%', backgroundColor: 'red'}} onClose={() => this.setState({error: false})} show={error} delay={3000} autohide>
			          <Toast.Header>
			            <strong className="mr-auto">Oops!</strong>
			            <small>Invalid Login</small>
			          </Toast.Header>
			        </Toast>
				</Form>
			  </div>
			)
	}
}

export default Landing;