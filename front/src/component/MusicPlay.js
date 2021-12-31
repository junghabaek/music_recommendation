import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Audios = () => {
    return (
        <div>
            <AudioPlayer
                src="https://p.scdn.co/mp3-preview/eb463247243646de10aa4d9b3f2c0c8b836c1dc8?cid=0e18970867524f1fba6634279dd9e5b2"
                showJumpControls={false}
                layout="stacked"
                customProgressBarSection={[]}
                customControlsSection={["MAIN_CONTROLS"]}
                autoPlayAfterSrcChange={false}
                onPlay={(e) => console.log("onPlay")}
                // other props here
            />
        </div>
    );
};

export default Audios;

// import React from "react";
// import { useAudioPlayer } from "react-use-audio-player";

// const preview = "https://p.scdn.co/mp3-preview/eb463247243646de10aa4d9b3f2c0c8b836c1dc8?cid=0e18970867524f1fba6634279dd9e5b2"

// const MusicPlay = ({ file }) => {
//     const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
//         src: "https://stream.toohotradio.net/320",
//         html5: true,
//         format: "mp3",
//         autoplay: false,
//         onend: () => console.log("sound has ended!"),
//     });

//     if (!ready && !loading) return <div>No audio to play</div>;
//     if (loading) return <div>Loading audio</div>;

//     return (
//         <div>
//             <button onClick={togglePlayPause}>
//                 {playing ? "Pause" : "Play"}
//             </button>
//         </div>
//     );
// };

// export default MusicPlay;
