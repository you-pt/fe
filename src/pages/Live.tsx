import {
  OpenVidu,
  Publisher,
  Session,
  StreamEvent,
  StreamManager,
  Subscriber,
} from "openvidu-browser";
import axios from "axios";
import React, { Component, ChangeEvent } from "react";
// import "./Live.css";
import UserVideoComponent from "../components/UserVideoComponent";
import SignIn from "../components/live/SignIn";
import { useNavigate, useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import ChatComponent from "../components/ChatComponent";
import { Button } from "@material-tailwind/react";
import Topbar from "../components/Topbar";

interface AppState {
  mySessionId: string;
  myUserName: string;
  session: Session | undefined;
  mainStreamManager: Publisher | undefined;
  publisher: Publisher | undefined;
  subscribers: Subscriber[];
}

export const withRouter = (Component: any): React.FC => {
  const Wrapper = (props: any): React.ReactElement => {
    const navigate = useNavigate();
    const params = useParams();

    return <Component navigate={navigate} params={params} {...props} />;
  };

  return Wrapper;
};

interface PropType {
  navigate: (url: string) => void;
  params: { sessionId: string };
}

class LiveSession extends Component<PropType, AppState> {
  OV: OpenVidu | null = null;
  navigate: (url: string) => void;
  params: { sessionId: string };
  baseUrl: string;

  constructor(props: PropType) {
    super(props);

    this.state = {
      mySessionId: "",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    };
    this.navigate = this.props.navigate;
    this.params = this.props.params;
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.baseUrl = "http://localhost:3001";
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    console.log(this.state);
    if (this.props.params.sessionId) {
      this.setState({
        mySessionId: this.props.params.sessionId,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {
    const { publisher, subscribers, mainStreamManager } = this.state;
    console.log({ publisher, subscribers, mainStreamManager });
  }

  onbeforeunload(event: BeforeUnloadEvent) {
    this.leaveSession();
  }

  handleChangeSessionId(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream: any) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  async deleteSubscriber(streamManager: Publisher) {
    const subscribers = this.state.subscribers.filter(
      (subscriber) => subscriber.stream !== streamManager.stream
    );
    this.setState({
      subscribers: subscribers,
    });
  }

  async joinSession() {
    this.OV = new OpenVidu();

    const session = this.OV.initSession();
    this.setState({
      session,
    });

    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      this.setState({
        subscribers: [...this.state.subscribers, subscriber],
      });
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });

    try {
      const token = await this.getToken();
      session.connect(token, { clientData: this.state.myUserName });
      const publisher = await this.OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });
      session.publish(publisher);
      this.setState({
        mainStreamManager: publisher,
        publisher: publisher,
      });
      if (!this.props.params.sessionId) {
        this.props.navigate(this.state.mySessionId);
      }

      const subscribersData = [...this.state.subscribers].map((subscriber) => {
        const { clientData } = JSON.parse(subscriber.stream.connection.data);
        return clientData;
      });

      const newParticipant = await axios({
        method: "POST",
        // baseURL: this.baseUrl,
        url: "room-list",
        headers: { "Content-Type": "application/json" },
        data: {
          sessionId: this.state.mySessionId,
          participant: this.state.myUserName,
          subscribers: subscribersData,
        },
      });
      console.log(subscribersData);
    } catch (error: any) {
      console.log("There was an error connecting to the session:", error.code, error.message);
    }
  }

  async leaveSession() {
    await axios({
      method: "DELETE",
      // baseURL: this.baseUrl,
      url: "/room-list",
      headers: { "Content-Type": "application/json" },
      data: {
        sessionId: this.state.mySessionId,
        participant: this.state.myUserName,
      },
    });
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
    this.navigate("/");
  }

  async switchCamera() {
    try {
      const devices = await this.OV!.getDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !==
            this.state.mainStreamManager!.stream.getMediaStream().getVideoTracks()[0].getSettings()
              .deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = this.OV!.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await this.state.session!.unpublish(this.state.mainStreamManager!);
          await this.state.session!.publish(newPublisher);
          this.setState({
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId: string) {
    try {
      const response = await axios({
        method: "POST",
        // baseURL: this.baseUrl,
        url: "/api/sessions",
        headers: { "Content-Type": "application/json" },
        data: { customSessionId: sessionId, publishers: "Participant51" },
      });
      return response.data; // The sessionId
    } catch (error) {
      console.log(error);
    }
  }

  async createToken(sessionId: string) {
    const response = await axios({
      method: "POST",
      // baseURL: this.baseUrl,
      url: `api/sessions/${sessionId}/connections`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // The token
  }

  async handleJoinBtn() {
    const newParticipant = await axios({
      method: "POST",
      // baseURL: this.baseUrl,
      url: "/room-list",
      headers: { "Content-Type": "application/json" },
      data: {
        sessionId: this.state.mySessionId,
        participant: this.state.myUserName,
      },
    });
    console.log(newParticipant);
  }

  render() {
    const { mySessionId, myUserName, session, mainStreamManager } = this.state;

    return (
      <div>
        <Topbar />
        <div className="pt-20">
          {!session ? (
            <SignIn
              roomDefaultValue={mySessionId}
              userNameDefaultValue={myUserName}
              handleChangeSessionId={this.handleChangeSessionId}
              handleChangeUserName={this.handleChangeUserName}
              joinSession={this.joinSession}
            />
          ) : null}

          {session ? (
            <div>
              <div className="flex flex-row justify-between items-center">
                <h1>Room Name: {mySessionId}</h1>
                <div className="flex flex-row gap-3">
                  <Button
                    size="sm"
                    color="red"
                    variant="gradient"
                    children={"Leave Session"}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={this.leaveSession}
                  />
                  <Button
                    size="sm"
                    color="amber"
                    variant="gradient"
                    children={"Switch Camera"}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={this.switchCamera}
                  />
                </div>
              </div>

              {/* {mainStreamManager ? (
              <div id="main-video" className="block">
                <UserVideoComponent streamManager={mainStreamManager} />
              </div>
            ) : null} */}
              {this.state.publisher ? (
                <div
                  className="stream-container col-md-6 col-xs-6 block"
                  onClick={() => this.handleMainVideoStream(this.state.publisher!)}
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
              <div id="video-container" className="block">
                {this.state.subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className="row-span-1 col-span-1"
                    onClick={() => this.handleMainVideoStream(sub)}
                  >
                    {/* <span>{sub.stream.connection.data}</span> */}
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
              {/* <div className="flex flex-row gap-1">
              <div className="basis-2/3">
                {this.state.publisher ? (
                  <div
                    className=""
                    onClick={() => this.handleMainVideoStream(this.state.publisher!)}
                  >
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </div>
                ) : null}
              </div>
              <div className="basis-1/3">
                <div className="flex flex-col gap-1">
                  {this.state.subscribers.map((sub, i) => (
                    <div key={i} className="" onClick={() => this.handleMainVideoStream(sub)}>
                      <span>{sub.stream.connection.data}</span>
                      <UserVideoComponent streamManager={sub} />
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
              {/* 채팅 컴포넌트 */}
              <ChatComponent />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(LiveSession);
