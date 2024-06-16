export const wrapErrorMessage = (message: string, key?: String) => (key ? { key: message } : { message: message });
