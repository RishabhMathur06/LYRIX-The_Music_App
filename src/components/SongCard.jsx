import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  // Replace placeholders in the artwork URL with desired width and height
  const artworkUrl = song.attributes.artwork.url
    .replace('{w}', 300)
    .replace('{h}', 300);

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
      backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <img alt="song_img" src={artworkUrl} />
        <div className={`absolute inset-0 justify-center items-center bg-black 
          bg-opacity-50 group-hover:flex ${activeSong?.name === song.attributes.name ? 
          'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
           isPlaying={isPlaying}
           activeSong={activeSong}
           song={song}
           handlePause={handlePauseClick}
           handlePlay={handlePlayClick}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.attributes.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link>
            {song.attributes.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
