import axios from "axios";

const base_url: string =
  process.env.BASE_URL ||
  "https://us-central1-eddie-nguyen.cloudfunctions.net/";

export const api = {
  get: (url: string) => axios.get(base_url + url),
};
