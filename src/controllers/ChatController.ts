
import ChatQueries from "../queries/Chat";
import { Message } from "../entity/Message"


class ChatController {
  static getAllMessages = async (fromid: number, toid: number) => {

    //Get user from database
    const ChatRepository = ChatQueries;
    let messages: Message;
    try {
      const response = await ChatRepository.getAllMessages(fromid, toid);
      messages = response
    } catch (error) {
      return error
      return;
    }

    return messages
  };

  static saveMessage = async (message: Message) => {
    const ChatRepository = ChatQueries;
    try {
        const response = await ChatRepository.saveMessage(message);
        return response
      } catch (error) {
        console.log(error)
        return;
      }
  }

}
export default ChatController;