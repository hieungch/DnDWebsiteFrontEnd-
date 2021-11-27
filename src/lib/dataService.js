// rmb to use import
import axios from "axios";

export async function getCharSheets() {
  const result = await axios.get("http://localhost:5000/charactersheets");
  if (result.status == 200) {
    return result.data;
  }
  throw `request failed with status ${result.status}`;
}

export async function getCharSheetById(id) {
  const result = await axios.get(`http://localhost:5000/charactersheets/${id}`);
  if (result.status == 200) {
    return result.data;
  }
  throw `request failed with status ${result.status}`;
}
