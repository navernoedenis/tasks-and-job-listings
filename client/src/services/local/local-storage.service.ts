function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function remove(key: string): void {
  localStorage.removeItem(key);
}

function get<T>(key: string): T | null {
  const data = localStorage.getItem(key);

  if (typeof data === 'string') {
    return JSON.parse(data) as T;
  }

  return null;
}

export const LocalStorageService = {
  get,
  remove,
  save,
};
