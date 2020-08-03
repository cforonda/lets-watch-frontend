import React, { useEffect } from 'react';

export default function YoutubePlayerNew({ id }) {
    useEffect(() => {
        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];

            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else { // If script is already there, load the video directly
            loadVideo();
        }
    })

    const loadVideo = () => {
        // the Player object is created uniquely based on the id in props
        const player = new window.YT.Player(`youtube-player-${id}`, {
            videoId: id,
            events: {
                onReady: onPlayerReady,
            },
        });
    };

    const onPlayerReady = event => {
        event.target.playVideo();
    };

    return (
        <div>
            <div id={`youtube-player-${id}`} />
        </div>
    );
}