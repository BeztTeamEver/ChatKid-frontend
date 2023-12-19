"use client";

class LocalStorage<TValue> {
  get(key: string) {
    try {
      if (typeof window !== undefined) {
        const res = window.localStorage.getItem(key);
        return res ? JSON.parse(res) : "";
      }
      return "";
    } catch (error) {
      return "";
    }
  }

  set(key: string, value: TValue) {
    try {
      if (typeof window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value ?? ""));
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(key: string) {
    try {
      if (typeof window !== undefined) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  }

  clear() {
    try {
      if (typeof window !== undefined) {
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LocalStorage();
