import { ChatMessage } from "../models/ChatMessage";
import { User } from "../models/User";
import * as uuid from "uuid";

let state: ChatMessage[] = [];

export class LoungeChatRepository {
  save(user: User, message: string): Promise<ChatMessage> {
    const loungeChatMessage: ChatMessage = {
      id: uuid.v4(),
      createdAt: new Date().toISOString(),
      user,
      message
    };
    state.push(loungeChatMessage);

    return Promise.resolve(loungeChatMessage);
  }

  listAll(): Promise<ChatMessage[]> {
    return Promise.resolve(state);
  }
}
