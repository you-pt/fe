import React, { Component, RefObject, useRef } from "react";
import { StreamManager } from "openvidu-browser";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "../utils/poseUtils";

interface OpenViduVideoProps {
  streamManager: StreamManager; // StreamManager 타입을 사용하는 것이 좋습니다.
}

export default class OpenViduVideoComponent extends Component<OpenViduVideoProps> {
  private videoRef: RefObject<HTMLVideoElement>
  private canvasRef: RefObject<HTMLCanvasElement>;

  constructor(props: OpenViduVideoProps) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.streamManager && this.videoRef.current) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidUpdate(prevProps: OpenViduVideoProps) {
    if (this.props.streamManager !== prevProps.streamManager && this.videoRef.current) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  async runPosenet() {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      outputStride: 16,
      architecture: 'ResNet50'
    });

    setInterval(() => {
      this.detect(net);
    }, 2000);
  }

  async detect(net: posenet.PoseNet) {
    if (
      typeof this.videoRef.current !== "undefined" &&
      this.videoRef.current !== null &&
      this.videoRef.current.readyState === 4
    ) {
      // Get Video Properties
      const video = this.videoRef.current;
      const { videoWidth } = this.videoRef.current;
      const { videoHeight } = this.videoRef.current;

      // Set video width
      this.videoRef.current.width = videoWidth;
      this.videoRef.current.height = videoHeight;

      // Make Detections
      const pose: posenet.Pose = await net.estimateSinglePose(video)
      console.log(pose);

      this.drawCanvas(pose, video, videoWidth, videoHeight, this.canvasRef);
    }
  }

  drawCanvas(pose: posenet.Pose, video: HTMLVideoElement, videoWidth: number, videoHeight: number, canvas:RefObject<HTMLCanvasElement> ) {
    if (canvas.current){
        const ctx = canvas.current.getContext("2d") as CanvasRenderingContext2D
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;

        drawKeypoints(pose["keypoints"], 0.6, ctx);
        drawSkeleton(pose["keypoints"], 0.7, ctx);
    }
  }

  render() {
    // this.runPosenet();
    return (
      <div className="[transform:rotateY(180deg)]">
        <video ref={this.videoRef} className="absolute" />
        <canvas
          ref={this.canvasRef}
          className="absolute"
        />
      </div>
    );
  }
}
