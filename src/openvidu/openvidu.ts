import axios from "axios";

// const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
// const OPENVIDU_SERVER_URL = 'http://localhost:4443';

const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_KEY;
const OPENVIDU_SERVER_URL =
  process.env.REACT_APP_OPENVIDU_ROOT || "http://localhost:3001";

export function getToken(roomId: string): Promise<string> {
  console.log(OPENVIDU_SERVER_URL);
  return createSession(roomId).then((roomId) => createToken(roomId));
}

function createSession(roomId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        OPENVIDU_SERVER_URL + "/api/sessions",
        { customSessionId: roomId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("CREATE SESION", response);
        resolve(response.data);
      })
      .catch((response) => {
        const error = Object.assign({}, response);
        if (error?.response?.status === 409) {
          resolve(roomId);
        } else {
          console.log(error);
          console.warn(
            "No connection to OpenVidu Server. This may be a certificate error at " +
              OPENVIDU_SERVER_URL
          );
          // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
        }
      });
  });
}

function createToken(roomId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = {};
    axios
      .post(
        OPENVIDU_SERVER_URL + "/api/sessions/" + roomId + "/connections",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("TOKEN", response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
}
