export const timeout = (timeout: number): Promise<void> => new Promise(resolve => setTimeout(resolve, timeout));
