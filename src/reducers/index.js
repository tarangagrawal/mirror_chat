
import { SAVE_CHAT } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies'; // to save all the chat in the cookies for fetching them even if session expires


const chat = action => { // method to append new chat item into the previous state of store
  let { chatLog } = action;
  return {
    chatLog
  };
};


const chats = (state = [], action) => {
  let chats = null;
  state = read_cookie('chats'); // fetching the fresh state of chats key of store from cookies
  switch (action.type) {
    case SAVE_CHAT:
      chats = [...state, chat(action)]; // updating the chats key with new chat item
      bake_cookie('chats', chats); // saving the updated state of store in the cookies
      return chats;
    default:
      return state;
  }
}

export default chats;