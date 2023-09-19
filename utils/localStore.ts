"use client";

class LocalStorage {
  get(key: string) {
    try {
      if (typeof window !== undefined) {
        const res = window?.localStorage?.get(key);
        return res ? JSON.parse(res) : undefined;
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value ?? ""));
    } catch (error) {
      console.log(error);
    }
  }

  //   delete(key: string) {
  //     localStorage.removeItem(key);
  //   }

  //   clear() {
  //     localStorage.clear();
  //   }
}

export default new LocalStorage();
