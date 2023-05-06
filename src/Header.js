import React from "react";
import Logo from "./player-images/logo.png";

export default function Headers(props) {
  return (
    <header className="App-header">
      <img src={Logo} className="img-responsive logo" />
    </header>
  );
}
