
import { SAVE_CHAT } from '../constants';

export const saveChat = (chatLog) => {
	// action to append every new chat item
  const action = {
    type: SAVE_CHAT,
    chatLog: chatLog,
  };
  return action;
};