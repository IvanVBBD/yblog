export function randomize (author: string): string{
  const lowercase = author.toLowerCase().replace(' ', '_').trim();
  // random number gen
  const appendNum = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  const username = `${lowercase}_${appendNum}`
  return username
}