export type NestedKeys<T> = {
    [K in keyof T]: T[K] extends object
      ? `${K & string}` | `${K & string}.${NestedKeys<T[K]>}`
      : `${K & string}`
}[keyof T];

export function sortByNestedKey<T>(data: T[], key: NestedKeys<T>, isASC: boolean = true): T[] {
    return data.sort((a, b) => {
      const valueA = getNestedValue<T>(a, key);
      const valueB = getNestedValue<T>(b, key);
  
      if (valueA === undefined || valueB === undefined) return 0;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isASC ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
  
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return isASC ? valueA - valueB : valueB - valueA;
      }
  
      if (valueA instanceof Date && valueB instanceof Date) {
        return isASC ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
      }

      return 0;
    });
}
  
export function getNestedValue<T>(obj: T, path: NestedKeys<T>): unknown | undefined {
    const keys = path.split(".") as string[];
    let result: unknown = obj;
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }
    return result;
  }
