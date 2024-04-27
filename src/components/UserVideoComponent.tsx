import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import { StreamManager } from 'openvidu-browser';

interface UserVideoProps {
    streamManager?: StreamManager // StreamManager 타입을 가져와야 합니다.
}

export default class UserVideoComponent extends Component<UserVideoProps> {
    constructor(props:UserVideoProps){
        super(props)
    }

    getNicknameTag(): string {
        // 사용자의 닉네임을 가져옵니다.
        if (this.props.streamManager) {
            return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
        } else {
            return '';
        }
    }

    render() {
        return (
            <div className=''>
                {this.props.streamManager ? (
                    <div className="">
                        <div><p>{this.getNicknameTag()}</p></div>
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                    </div>
                ) : null}
            </div>
        );
    }
}
