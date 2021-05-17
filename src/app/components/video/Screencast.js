import PropTypes from "prop-types";
import React from "react";
import "./ScreencastStyle.css";


const Screencast = ({ url }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded video"
    />
  </div>
);

Screencast.propTypes = {
  url: PropTypes.string.isRequired
};

export default Screencast;