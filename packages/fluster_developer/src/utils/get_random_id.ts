export const getRandomId = (length: number = 16): string => {
  const x = "abcdefghiklmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < length; i++) {
    s += x[Math.floor(Math.random() * x.length)];
  }
  return s;
};
