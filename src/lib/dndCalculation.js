export function calculateModifier(score) {
  return Math.floor((score - 10) / 2);
}

export function isStatProficient(statName) {
  return statName === "dexterity";
}

export function calculateProficiency(charLevel) {
  let profBonus = 2;

  for (let i = 4; i <= 16; i = i + 4) {
    if (charLevel <= i) {
      break;
    }
    profBonus++;
  }

  return profBonus;
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}