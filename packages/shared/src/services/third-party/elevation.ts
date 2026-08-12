import axios from "axios";

const ElevationHandler = {
  getElevation: async (lat: number, lon: number) => {
    try {
      const res = await axios.get(
        `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`
      );
      return res.data.results[0].elevation;
    } catch (e) {
      console.error("Error fetching elevation:", e);
      return null;
    }
  },
};

export default ElevationHandler;
