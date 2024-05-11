export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getRandomNumber(min: number, max: number): number {
  const minValue: number = Math.ceil(min);
  const maxValue: number = Math.floor(max);

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export function isEven(number: number): boolean {
  return number % 2 == 0;
}

export function createDisciplineName(disciplines: string[]): string {
  return disciplines[getRandomNumber(0, disciplines.length - 1)];
}

export function hasObjectValues<T extends object>(obj: T): boolean {
  return Object.keys(obj).length > 0;
}

export function generateRandomCode(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789qwertyuiopasdfghjklzxcvbnm';

  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join('');
}
