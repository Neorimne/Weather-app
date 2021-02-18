import Axios from "axios";
import { GEO_DB_API } from "../config";

const getCityByGeo = async (latitude: number, longitude: number) => {
  const options = {
    params: {
      limit: "1",
      minPopulation: "30000",
      location: `+${latitude}+${longitude}`,
      radius: "5",
      countryIds: "IT",
      languageCode: "IT",
      sort: "elevation",
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

export default getCityByGeo;
