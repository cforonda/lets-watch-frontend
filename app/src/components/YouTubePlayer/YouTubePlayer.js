import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';

export default function YoutubePlayer({videoId, socket}) {
    const [playerComponent, setPlayerComponent] = useState();

    
    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    };

    socket.on('start-video', data => {
        setPlayerComponent(<Youtube videoId={data.videoId} opts={playerOptions} onReady={handleVideoOnReady} 
                    onPlay={handleVideoPlay} onPause={handleVideoPause} 
                    onEnd={handleVideoEnd}
        />)
    });

    const getCurrentTime = event =>  event.target.getCurrentTime();

    const handleVideoOnReady = event => {
        event.target.playVideo();
    }

    const handleVideoPlay = event => {
        console.log('PLAY', event.target);
        console.log(getCurrentTime(event));
        socket.emit('play')
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
            {playerComponent}
        </div>
    )
}