import axios from "axios";
import moment from "moment";
export const delWithToken = (enpoint, token, data) => {
  let source = axios.CancelToken.source();

  async function request() {
    let result;
    const options = {
      url: enpoint,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
      cancelToken: source.token,
    };
    try {
      result = await axios(options);
    } catch (error) {
      if (axios.isCancel(error)) return;
      return error;
    }
    return result;
  }

  return request;
};

export const getWithToken = (endpoint, access_token, cancelSource) => {
  async function request() {
    let result;
    const cancelToken = cancelSource.token;

    const options = {
      url: endpoint,
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
      cancelToken,
    };
    try {
      result = await axios(options);
    } catch (err) {
      if (axios.isCancel(err)) return;
      return err;
    }
    return result;
  }

  return request;
};

export const reqWithToken = (endpoint, access_token) => {
  let source = axios.CancelToken.source();

  const request = async () => {
    let result;
    const options = {
      url: endpoint,
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
      cancelToken: source.token,
    };
    try {
      result = await axios(options);
    } catch (error) {
      if (axios.isCancel(error)) return;
      console.log(error);
      return error;
    }
    return result;
  };

  return request;
};

export const millisecondsToMinutesSeconds = (ms) => {
  let duration = moment.duration(ms, "milliseconds");
  let fromMinutes = Math.floor(duration.asMinutes());
  let fromSeconds = Math.floor(duration.asSeconds() - fromMinutes * 60);

  return Math.floor(duration.asSeconds()) >= 60
    ? (fromMinutes <= 9 ? "0" + fromMinutes : fromMinutes) +
        ":" +
        (fromSeconds <= 9 ? "0" + fromSeconds : fromSeconds)
    : "00:" + (fromSeconds <= 9 ? "0" + fromSeconds : fromSeconds);
};
