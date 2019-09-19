import React, {Component} from 'react';
import {Navbar, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveChat } from '../actions';
import user from './user.png'; // user chat symbol icon
import boty from './boty.png'; // bot chat symbol icon
import Css from './custom.css'; // bot chat symbol icon


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
			<div className="chatbot" style={{position:'relative',borderColor:'1px solid red',height:'500px',margin:'100px auto 0 auto',border:'3px solid #212529',padding:'0px 0px 0px 0px'}}>
			<div style={{position:'relative',borderColor:'1px solid red',width: '100%'}}>
			  <div style={{width: '100%', height: '500px',overflow:'hidden',overflowY:'scroll',paddingBottom:'100px'}}>
			  <div style={{position:'absolute',left:'0',right:'0',top:'0'}}>
			  	<Navbar bg="dark" variant="dark" style={{position: 'sticky', bottom: '0px'}}>
				  <Navbar.Brand>Mirror Chat</Navbar.Brand>
				  <Navbar.Toggle />
				  <Navbar.Collapse className="justify-content-end">
				    <Navbar.Text>
				      Hello: <a href="#login">Tarang</a>
				    </Navbar.Text>
				  </Navbar.Collapse>
				  <Button variant="outline-info" style={{marginLeft: '10px',backgroundColor:'#17a2b8',color:'#fff'}} onClick={() => this.props.history.push('/')}>Logout</Button>
				</Navbar>
				</div>
				<div id="output" style={{marginTop:'10px', height: '200px',paddingTop:'50px',paddingBottom:'70px'}}>
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
								  <div style={{wordWrap: 'break-word',paddingBottom:'10px'}}>
								  	{cht.chatLog.type === 'user' ?
								  	  <div style={{marginLeft: '20%',marginRight: '0px',width:'80%',display:'block',backgroundColor:'#ddd',padding:'20px 20px 20px 20px',borderRadius:'10px'}}>
									  	  <img height="40px" width="40px" src={user} alt="user" style={{marginRight:'5px'}} />  
									  	  <span style={{color: 'blue', fontWeight: 'bold'}}>{cht.chatLog.msg}</span>
								  	  </div> :
								  	  <div style={{width:'80%',marginLeft: '0px',marginRight: '5px',display:'block',backgroundColor:'#f1f1f1',padding:'20px 20px 20px 20px',borderRadius:'10px',height:'90px'}}>
								  	  	<div style={{float:'right'}}>
									  	  <span style={{fontWeight: 'bold'}}>{cht.chatLog.msg}</span>
									  	  <img height="50px" width="50px" src={boty} alt="bot" style={{marginLeft:'5px'}}/>
									  	  </div>
								  	  </div>
								  	}
								  </div>
								  </React.Fragment>
								)
						})
					}
				</div>
				<div style={{padding: '15px 5px 5px 5px', position: 'absolute',backgroundColor:'#f2f2f2',height:'70px', bottom: '0px', left: '0px',right:'0px', width: '100%'}}>
					<input style={{width: '70%', padding: '5px 5px 5px 5px',color:'blue'}} type="text" placeholder="Your text" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} onKeyDown={(e) => {
						if(e.key === 'Enter') {
						  this.doSend(this.state.message)
						  this.setState({message: ''})
						}
					}} />
					<Button style={{width: '30%',padding: '7px 5px 5px 5px'}} onClick={() => {
						this.doSend(this.state.message)
						this.setState({message: ''})
					}} variant="primary">Send</Button>
				</div>
			  </div>
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