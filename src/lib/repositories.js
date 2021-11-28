import axios from "axios";


const uri = "http://localhost:5000";// TODO: export this to config file

const characterSheetEndPoint = `${uri}/charactersheets`;
const abilityEndPoint = `${uri}/abilities`;
const backgroundEndPoint = `${uri}/backgrounds`;
const characterClassEndPoint = `${uri}/characterclasses`;
const dicetypeEndPoint = `${uri}/dicetypes`;

const featEndPoint = `${uri}/feats`;
const levelEndPoint = `${uri}/levels`;
const raceEndPoint = `${uri}/races`;
const skillEndPoint = `${uri}/skills`;
const specialStatEndPoint = `${uri}/specialstats`;
const subraceEndPoint = `${uri}/subraces`;

export const CharacterSheetRepository = {
    async getAll() {
        const result = await axios.get(characterSheetEndPoint);
        if (result.status == 200) {
          return result.data;
        }
        throw `request failed with status ${result.status}`;
      },
      
      async getById(id) {
        const result = await axios.get(`${characterSheetEndPoint}/${id}`);
        if (result.status == 200) {
          return result.data;
        }
        throw `request failed with status ${result.status}`;
      },
      
      async create(character) {
        const result = await axios.post(characterSheetEndPoint, character);
        if (result.status != 200) {
          return result.data;
        }
        throw `request failed with status ${result.status}`;
      },

      async update(id,newCharacter) {
        const result = await axios.put(`${characterSheetEndPoint}/${id}`, newCharacter);
        if (result.status != 200) {
          return result.data;
        }
        throw `request failed with status ${result.status}`;
      }
}

export const AbilityRepository = {
  async getAll() {
    const result = await axios.get(abilityEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const BackgroundRepository = {
  async getAll() {
    const result = await axios.get(backgroundEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const CharacterClassRepository = {
  async getAll() {
    const result = await axios.get(characterClassEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const DiceTypeRepository = {
  async getAll() {
    const result = await axios.get(dicetypeEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const FeatRepository = {
  async getAll() {
    const result = await axios.get(featEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const LevelRepository = {
  async getAll() {
    const result = await axios.get(levelEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const RaceRepository = {
  async getAll() {
    const result = await axios.get(raceEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const SkillRepository = {
  async getAll() {
    const result = await axios.get(skillEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const SpecialStatRepository = {
  async getAll() {
    const result = await axios.get(specialStatEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

export const SubraceRepository = {
  async getAll() {
    const result = await axios.get(subraceEndPoint);
    if (result.status == 200) {
      return result.data;
    }
    throw `request failed with status ${result.status}`;
  },
}

