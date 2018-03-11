let state: number = 0;

export class CounterRepository {
  async add(delta: number): Promise<number> {
    state += delta;
    return state;
  }

  async get(): Promise<number> {
    return state;
  }

  async clear(): Promise<number> {
    state = 0;
    return state;
  }
}
