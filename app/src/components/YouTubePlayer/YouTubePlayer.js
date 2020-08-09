import React from 'react';
import Youtube from 'react-youtube';
import { useSocket } from '../../hooks/useSocket';

export default function YoutubePlayer({videoId}) {
    const {socket} = useSocket();
    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    };

    const getCurrentTime = event =>  event.target.getCurrentTime();

    const handleVideoOnReady = event => {
        event.target.pauseVideo();
    }

    const handleVideoPlay = event => {
        console.log('PLAY', event.target);
        console.log(getCurrentTime(event));
    }

    const handleVideoPause = event => {
        console.log('PAUSE');
        console.log('Current Time:', getCurrentTime(event));
    }

    const handleVideoEnd = event => {
        console.log('END');
    }

    return (
        <div>
            <Youtube videoId={videoId} opts={playerOptions} onReady={handleVideoOnReady} 
                        onPlay={handleVideoPlay} onPause={handleVideoPause} 
                        onEnd={handleVideoEnd}
            />
        </div>
    )
}