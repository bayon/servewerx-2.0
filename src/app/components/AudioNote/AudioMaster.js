import blobToBuffer from 'blob-to-buffer'
import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import Recorder from 'react-mp3-recorder'
//setup: npm install blob-to-buffer react-audio-player react-mp3-recorder  --legacy-peer-deps
//TODO: save the recording ? 

export default class AudioMaster extends Component {
  state = {
    url: ''
  }

  render () {
    const {
      url
    } = this.state

    return (
      <div>
       

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '20vh'
          }}
        >
          <div>
            <Recorder
              onRecordingComplete={this._onRecordingComplete}
              onRecordingError={this._onRecordingError}
              style={{
                margin: '0 auto'
              }}
            />

            <p>
              Click and hold to start recording.
            </p>

            {url && (
              <div>
                <ReactAudioPlayer
                  src={url}
                  controls
                  style={{
                    minWidth: '500px'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  _onRecordingComplete = (blob) => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('recording', blob)
      console.log(typeof blob);

      if (this.state.url) {
          console.log(this.state.url)
        window.URL.revokeObjectURL(this.state.url)
      }

      this.setState({
        url: window.URL.createObjectURL(blob)
      })
      console.log('the url of the recorded blob');
      console.log( window.URL.createObjectURL(blob))
    })
  }

  _onRecordingError = (err) => {
    console.log('error recording', err)

    if (this.state.url) {
      window.URL.revokeObjectURL(this.state.url)
    }

    this.setState({ url: null })
  }
}

 
//////////////////
// Difference in Naming blob vs downloaded mp3
// blob:http://localhost:3000/fc504cca-b642-431e-a10a-597bc34d57ce
// blob_http___localhost_3000_1ae9f16e-93b4-48b5-bf53-9952270f33b7.mp3
///////////////////////////////////////////////////////////////////////