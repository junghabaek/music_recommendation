import React from "react";
import { useAudioPlayer } from "react-use-audio-player";

const MusicPlay = ({ file }) => {
    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: "https://stream.toohotradio.net/320",
        html5: true,
        format: "mp3",
        autoplay: false,
        onend: () => console.log("sound has ended!"),
    });

    if (!ready && !loading) return <div>No audio to play</div>;
    if (loading) return <div>Loading audio</div>;

    return (
        <div>
            <button onClick={togglePlayPause}>
                {playing ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default MusicPlay;
