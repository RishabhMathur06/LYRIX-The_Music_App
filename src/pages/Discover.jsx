import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery();
    const genreTitle = "Pop";

    if (isFetching) return <Loader title="Loading Songs..." />;

    if (error) return <Error />;

    // Ensure data is an object and has a data property that is an array
    const songs = data?.data ? data.data : [];

    console.log(songs);

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                    Discover {genreTitle}
                </h2>
                <select onChange={() => {}} value="" className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                    {genres.map((genre) => (
                        <option key={genre.value} value={genre.value}>
                            {genre.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Wrapper for our songs */}
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {songs?.map((song, i) => (
                    <SongCard 
                        key={song.id} 
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Discover;
