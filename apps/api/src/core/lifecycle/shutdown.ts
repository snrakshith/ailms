type Finalizer = () => Promise<void> | void;
const closers: Array<{ name: string; close: Finalizer }> = [];
export function onShutdown(name: string, close: Finalizer) {
  closers.push({ name, close });
}
export async function shutdownAll(): Promise<void> {
  for (const { name, close } of closers.reverse()) {
    try {
      await close();
    } catch (error) {
      console.error(`Shutdown failed for ${name}:`, error);
    }
  }
}
