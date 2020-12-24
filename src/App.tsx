import React from "react";
import Content from "./components/Content/Content";

import PosterSrc from "./assets/background/poster.jpg";
import backGroundVideoSrc from "./assets/background/clouds.mp4";

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
          poster={PosterSrc}
          className="fullscreen-bg__video"
        >
          <source src={backGroundVideoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default App;
