import { OpenVidu, Publisher, Session, StreamManager } from "openvidu-browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getToken } from "../openvidu/openvidu";

type StreamData = {
  streamManager: StreamManager;
  userId: number;
  nickname: string;
};

export const useOpenvidu = (
  nickname: string,
  roomId: string,
  streamManager: StreamManager
) => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<Publisher | null>();
  const [session, setSession] = useState<Session | null>();

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  }, [session]);

  const deleteSubscriber = (streamManager: any) => {
    setSubscribers((prevSubscribers) => {
      return prevSubscribers.filter((sub) => sub !== streamManager);
    });
  };

  useEffect(() => {
    const openVidu = new OpenVidu();
    let session = openVidu.initSession();

    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, "");
      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => {
        return [
          ...prev.filter((it) => it.userId !== +data.userId),
          {
            streamManager: subscriber,
          },
        ];
      });
    });

    session.on("streamDestroyed", (event) => {
      event.preventDefault();

      deleteSubscriber(event.stream.streamManager);
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });

    getToken(String(roomId)).then((token) => {
      session!
        .connect(token, JSON.stringify({ userId: nickname }))
        .then(async () => {
          await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          const devices = await openVidu.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          const publisher = openVidu.initPublisher("", {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          setPublisher(publisher);
          session.publish(publisher);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });

    setSession(session);
    return () => {
      if (session) {
        session.disconnect();
      }
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
    };
  }, [roomId, nickname]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => leaveSession());
    return () => {
      window.removeEventListener("beforeunload", () => leaveSession());
    };
  }, [leaveSession]);

  const onChangeCameraStatus = useCallback(
    (status: boolean) => {
      publisher?.publishVideo(status);
    },
    [publisher]
  );

  const onChangeMicStatus = useCallback(
    (status: boolean) => {
      publisher?.publishAudio(status);
    },
    [publisher]
  );

  const streamList = useMemo(
    () => [{ streamManager: publisher, userId: nickname }, ...subscribers],
    [publisher, subscribers, nickname]
  );

  return {
    publisher,
    subscribers,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
    leaveSession,
  };
};
