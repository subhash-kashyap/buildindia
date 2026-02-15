const ADJECTIVES = [
  'Friendly', 'Compassionate', 'Supportive', 'Gentle', 'Kind',
  'Radiant', 'Calm', 'Peaceful', 'Empathetic', 'Resilient',
  'Mindful', 'Thoughtful', 'Brave', 'Strong', 'Patient'
];

const ANIMALS = [
  'Axolotl', 'Capybara', 'Dolphin', 'Elephant', 'Fox',
  'Giraffe', 'Koala', 'Lemur', 'Otter', 'Panda',
  'Quokka', 'Rabbit', 'Sea-Lion', 'Turtle', 'Whale',
  'Badger', 'Deer', 'Hedgehog', 'Red-Panda', 'Sloth'
];

export function generateRandomName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adj} ${animal}`;
}
