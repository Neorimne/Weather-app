import Axios from "axios";
import { GEO_DB_API } from "../config";

const fetchCitiesData = async (namePrefix: string) => {
  const options = {
    params: {
      limit: "5",
      minPopulation: "100000",
      namePrefix,
      countryIds: "IT",
    },
    headers: {
      "x-rapidapi-key": GEO_DB_API.KEY,
      "x-rapidapi-host": GEO_DB_API.HOST,
    },
  };
  let response;
  try {
    response = await Axios.get(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      options
    );
  } catch (error) {
    console.log("Error on request", error);
  }

  if (response) return response.data;
};

export default fetchCitiesData;
