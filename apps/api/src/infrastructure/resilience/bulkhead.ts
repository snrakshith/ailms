// Concurrency cap for expensive outbound operations. Use a separate instance per dependency.
export class Bulkhead {
  private active = 0;
  private waiting: Array<() => void> = [];
  constructor(
    private readonly maxConcurrent: number,
    private readonly maxWaiting = 100,
  ) {
    if (maxConcurrent < 1) throw new Error('maxConcurrent must be > 0');
  }
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.active >= this.maxConcurrent) {
      if (this.waiting.length >= this.maxWaiting) throw new Error('Bulkhead saturated');
      await new Promise<void>((resolve) => this.waiting.push(resolve));
    }
    this.active++;
    try {
      return await operation();
    } finally {
      this.active--;
      this.waiting.shift()?.();
    }
  }
}
