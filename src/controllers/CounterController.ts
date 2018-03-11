import { CounterRepository } from "../repositories/CounterRepository";

const counterRepository = new CounterRepository();

export class CounterController {
  async get(): Promise<number> {
    return await counterRepository.get();
  }

  async patch(delta: number): Promise<number> {
    return await counterRepository.add(delta);
  }

  async delete(): Promise<number> {
    return await counterRepository.clear();
  }
}
