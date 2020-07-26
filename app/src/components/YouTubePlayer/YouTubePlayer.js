import PropTypes from 'prop-types';
import React from 'react';

// Code pulled from: https://stackoverflow.com/questions/54017100/how-to-integrate-youtube-iframe-api-in-reactjs-solution
class YouTubePlayer extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    componentDidMount = () => {
        // On mount, check to see if the API script is already loaded

        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = this.loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else { // If script is already there, load the video directly
            this.loadVideo();
        }
    };

    loadVideo = () => {
        const { id } = this.props;

        // the Player object is created uniquely based on the id in props
        this.player = new window.YT.Player(`youtube-player-${id}`, {
            videoId: id,
            events: {
                onReady: this.onPlayerReady,
            },
        });
    };

    onPlayerReady = event => {
        event.target.playVideo();
    };

    render = () => {
        return (
            <div>
                <div id={`youtube-player-${this.props.id}`} />
            </div>
        );
    };
}

export default YouTubePlayer;