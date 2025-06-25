
import React from 'react';
import ReactHowler from 'react-howler';

const MusicPlayer = () => (
  <ReactHowler src="/music.mp3" playing={true} loop={true} volume={0.5} />
);

export default MusicPlayer;
