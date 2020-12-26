import React from "react";
import Content from "./components/Content/Content";

import PosterSrc from "./assets/background/poster.jpg";
import backGroundVideoSrcMP4 from "./assets/background/clouds.mp4";
import backGroundVideoSrcWebm from "./assets/background/clouds.webm";
import backGroundVideoSrcOgv from "./assets/background/clouds.ogv";

function App() {
  return (
    <div className="App">
      <div className="fullscreen-bg">
        <div className="overlay">
          <Content />
        </div>
        <video
          muted
          autoPlay
          playsInline
          poster={PosterSrc}
          className="fullscreen-bg__video"
        >
          <source src={backGroundVideoSrcMP4} type="video/mp4" />
          <source src={backGroundVideoSrcWebm} type="video/webm" />
          <source src={backGroundVideoSrcOgv} type="video/ogg" />
        </video>
      </div>
    </div>
  );
}

export default App;
