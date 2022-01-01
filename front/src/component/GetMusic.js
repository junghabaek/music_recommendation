// 영화장르 선택을 위한 음악 30s preview 입니다.

import React, { useState } from "react";

const GetMusic = () => {
    const [audio, setAudio] = useState([]);

    // useEffect(() => {
    //     let url = "";
    //     axios.get(url).then((response) => {
    //         let data = response.data;
    //         setAudio(data.tracks);
    //         console.log(data.tracks);
    //     });
    // }, []);

    return (
        <div>
            <h2>List of Music</h2>
            {/* <div>
        {audio.map((a, i) => (
          <div className="list" key={i}>
            <span>{a.artist}</span>
            <ReactAudioPlayer
              style={{ outline: "none" }}
              controls
              src={a.href}
              onEnded={() => console.log("end of the track")}
            />
          </div>
        ))}
      </div> */}
        </div>
    );
};

export default GetMusic;
