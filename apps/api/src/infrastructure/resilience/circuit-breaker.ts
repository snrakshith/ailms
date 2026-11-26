export class CircuitBreaker {
  private failures = 0;
  private openedAt = 0;
  constructor(
    private readonly threshold = 5,
    private readonly resetMs = 30_000,
  ) {}
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.openedAt && Date.now() - this.openedAt < this.resetMs) throw new Error('Circuit open');
    try {
      const result = await operation();
      this.failures = 0;
      this.openedAt = 0;
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures >= this.threshold) this.openedAt = Date.now();
      throw error;
    }
  }
}
