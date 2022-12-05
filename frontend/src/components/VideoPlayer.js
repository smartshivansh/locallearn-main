import React from "react";
import ReactPlayer from "react-player";
import data from "../urls.js";

const VideoPlayer = () => {
  const [currentUrlIndex, setCurrentUrlIndex] = React.useState(
    Math.floor(Math.random() * data.length)
  );

  return (
    <ReactPlayer
      style={{
        maxHeight: "100vh",
      }}
      url={data[currentUrlIndex]}
      playing={true}
      onEnded={() =>
        setCurrentUrlIndex((prevUrlIndex) => (prevUrlIndex + 1) % data.length)
      }
      width="100%"
      height="100%"
      controls={true}
    />
  );
};

export default VideoPlayer;
