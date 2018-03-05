import { User } from "../models/User";
import { LoungeChatRepository } from "../repositories/LoungeChatRepository";
import { ChatMessage } from "../models/ChatMessage";

const loungeChatRepository = new LoungeChatRepository();

export class LoungeChatController {
  async get(): Promise<ChatMessage[]> {
    return loungeChatRepository.listAll();
  }

  async add(user: User, message: string): Promise<ChatMessage[]> {
    await loungeChatRepository.save(user, message);
    return loungeChatRepository.listAll();
  }
}
