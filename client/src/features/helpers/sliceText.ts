export const sliceText = (text: string, charCount: number): string =>
  text.length > charCount ? `${text.slice(0, charCount)}...` : text;
