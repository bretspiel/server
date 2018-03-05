import { User } from "../models/User";
import { LoungeChatRepository } from "../repositories/LoungeChatRepository";
import { LoungeChatState } from "../models/LoungeChatState";

const loungeChatRepository = new LoungeChatRepository();

export class LoungeChatController {
  async get(): Promise<LoungeChatState> {
    return loungeChatRepository.listAll();
  }

  async add(user: User, message: string): Promise<LoungeChatState> {
    await loungeChatRepository.save(user, message);
    return loungeChatRepository.listAll();
  }
}
