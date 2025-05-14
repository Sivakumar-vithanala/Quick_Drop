import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
  try {
    const resp = await Axios({
      ...SummaryApi.userDetails,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
