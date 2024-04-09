import React, { Component, RefObject } from 'react';
import { StreamManager } from 'openvidu-browser';


interface OpenViduVideoProps {
    streamManager: StreamManager; // StreamManager 타입을 사용하는 것이 좋습니다.
}

export default class OpenViduVideoComponent extends Component<OpenViduVideoProps> {
    private videoRef: RefObject<HTMLVideoElement>;

    constructor(props: OpenViduVideoProps) {
        super(props);
        this.videoRef = React.createRef();
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

    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }
}
