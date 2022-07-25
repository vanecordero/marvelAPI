import { BASE_URL, API_KEY } from "@/config/marvelAPI.js";
import axios from "axios";

export function getCharacters(limit = 20, offset = 0) {
  const url = `${BASE_URL}?limit=${limit}&offset=${offset}&${API_KEY}`;

  let resp = [];

  axios
    .get(url)
    .then((results) => {
      const {
        data: { data },
      } = results;
      console.log("data", data);

      data.results.forEach((dataCharacter) => {
        resp.push(dataCharacter);
      });
      console.log("resp", resp);

      return resp;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("url", url);
}
