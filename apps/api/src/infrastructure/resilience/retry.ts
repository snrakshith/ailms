export async function retry<T>(
  operation: (signal: AbortSignal) => Promise<T>,
  opts: { attempts?: number; timeoutMs?: number; baseDelayMs?: number } = {},
): Promise<T> {
  const attempts = opts.attempts ?? 3;
  const delay = opts.baseDelayMs ?? 150;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 3000);
    try {
      return await operation(controller.signal);
    } catch (error) {
      if (attempt === attempts || controller.signal.aborted) throw error;
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          Math.min(5000, delay * 2 ** (attempt - 1)) * (0.75 + Math.random() * 0.5),
        ),
      );
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error('Unexpected retry exhaustion');
}
