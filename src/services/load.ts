export const load = (url: string) => fetch([url, Date.now()].join("?")).then(response => response.json());
