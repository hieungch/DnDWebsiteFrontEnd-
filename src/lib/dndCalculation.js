export function calculateModifier(score) {
  return Math.floor((score - 10) / 2);
}

export function isStatProficient(statName) {
  return statName === "dexterity";
}
