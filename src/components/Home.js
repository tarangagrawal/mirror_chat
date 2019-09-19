import React, {Component} from 'react';
import {Navbar, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveChat } from '../actions';
import user from './user.png'; // user chat symbol icon
import boty from './boty.png'; // bot chat symbol icon

const TEST_URI = "wss://echo.websocket.org/";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '', // to store instant message of user
			initMessage: '', // initial message on socket connection
			socket: {}, // to store socket object
		}
	}

	componentDidMount() {
		this.initSocket(); // initializing socket connection
	}

	initSocket = () => {
		const websocket = new WebSocket(TEST_URI);
		this.setState({socket: websocket});
		//defining methods on the created socket
	    websocket.onopen = (evt) => { this.onOpen(evt) };
	    websocket.onclose = (evt) => { this.onClose(evt) };
	    websocket.onmessage = (evt) => { this.onMessage(evt) };
	    websocket.onerror = (evt) => { this.onError(evt) };
	}


	onOpen = (evt) => {
		this.setState({initMessage: 'Say Hi! to the BOT'});
	}

   onClose = (evt) => {
  	console.log("Disconnected")
   }

   onMessage = (evt) => {
	this.props.saveChat({type: 'bot', msg: evt.data});
   }

   onError = (evt) => {
    console.log("Error");
   }

  doSend = (message) => {
  	//method to send the user typed message and link it to socket 
		this.props.saveChat({type: 'user', msg: message}); // saving and updating the chat log to redux store
    this.state.socket.send(message);
   }

	render() {
		return (
			  <div style={{width: '100%', height: '200px'}}>
			  	<Navbar bg="dark" variant="dark" style={{position: 'sticky', top: '0px'}}>
				  <Navbar.Brand>Mirror Chat</Navbar.Brand>
				  <Navbar.Toggle />
				  <Navbar.Collapse className="justify-content-end">
				    <Navbar.Text>
				      Hello: <a href="#login">Tarang</a>
				    </Navbar.Text>
				  </Navbar.Collapse>
				  <Button variant="outline-info" style={{marginLeft: '10px'}} onClick={() => this.props.history.push('/')}>Logout</Button>
				</Navbar>
				<div id="output" style={{marginTop:'10px', height: '200px'}}>
					{this.state.initMessage.length && this.props.chats.length === 0 &&
					  <React.Fragment>
					  <p style={{wordWrap: 'break-word'}}>
					  	{this.state.initMessage}
					  </p><br />
					  </React.Fragment>
					}
					{this.props.chats && this.props.chats.length > 0 &&
						this.props.chats.map((cht, index) => {
							return (
								<React.Fragment>
								  <div style={{wordWrap: 'break-word'}}>
								  	{cht.chatLog.type === 'user' ?
								  	  <div style={{marginLeft: '5px'}}>
									  	  <img height="40px" width="40px" src={user} alt="user" />  
									  	  <span style={{color: 'blue', fontWeight: 'bold'}}>{cht.chatLog.msg}</span>
								  	  </div> :
								  	  <div style={{float:'right', marginRight: '5px'}}>
									  	  <span style={{fontWeight: 'bold'}}>{cht.chatLog.msg}</span>
									  	  <img height="50px" width="50px" src={boty} alt="bot" />
								  	  </div>
								  	}
								  </div><br />
								  </React.Fragment>
								)
						})
					}
				</div>
				<div style={{position: 'fixed', bottom: '0px', left: '10px', width: '100%'}}>
					<input style={{width: '70%'}} type="text" placeholder="Your text" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} onKeyDown={(e) => {
						if(e.key === 'Enter') {
						  this.doSend(this.state.message)
						  this.setState({message: ''})
						}
					}} />
					<Button style={{width: '10%'}} onClick={() => {
						this.doSend(this.state.message)
						this.setState({message: ''})
					}} variant="primary">Send</Button>
				</div>
			  </div>
			)
	}
}

function mapStateToProps(state) {
  return {
    chats: state //fetching the updated redux store to get all chats
  };
}

export default connect(mapStateToProps, { saveChat })(
  Home
);