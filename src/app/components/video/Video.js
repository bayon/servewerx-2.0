import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Video extends Component {
    constructor(props) {
        super(props);
     
      
      }
    render () {
        return (
        <div className='player-wrapper'>
            <ReactPlayer
            className='react-player fixed-bottom'
            url= {this.props.url}
            width='100%'
            height='100%'
            controls = {true}

            />
        </div>
        )
    }
}

export default Video;