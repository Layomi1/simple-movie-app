import React, { useEffect, useState } from "react";
import SearchIcon from "./components/SearchIcon";
import axios from "axios";
import MenuIcon from "./components/MenuIcon";

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const apiKey = import.meta.env.VITE_apikey;

  async function searchMovie() {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`
      );
      setMovies(result.data.Search || []);
      setLoading(false);
      setSearchQuery("");
    } catch (error) {
      setLoading(false);
      return { error: "Movie search failed...!" };
    }
  }

  useEffect(() => {
    if (searchQuery) {
      searchMovie();
    }
  }, []);

  return (
    <section className="w-full min-h-screen bg-indigo-500 flex justify-center items-center py-20 px-5  md:px-16">
      <main className="bg-black w-full min-h-screen text-white px-5 ">
        <header className="flex px-0 py-10  md:p-10 items-center justify-between  w-full">
          <h1 className="font-semibold text-yellow-400 uppercase">
            CineStream
          </h1>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden relative"
          >
            <MenuIcon />
          </button>
          <ul
            className={`${
              isMenuOpen ? "block" : "hidden"
            } min-w-[330px]  absolute top-40 mx-6  z-10 left-0 md:relative md:top-0 md:left-0  md:flex gap-12 items-center bg-black md: black md:bg-white py-4 md:px-6 md:bg-opacity-10 md:rounded-3xl `}
          >
            <li className="px-4 text-center hover:bg-black  hover:rounded-168px] hover:py-2 md:hover:px-6 cursor-pointer ">
              Home
            </li>
            <li className="px-4 text-center hover:bg-black md:hover:rounded-[16px] hover:py-2 md:hover:px-6  cursor-pointer ">
              Movies
            </li>
            <li className="px-4 text-center hover:bg-black md:hover:rounded-[16px] hover:py-2 md:hover:px-6  cursor-pointer ">
              Series
            </li>
            <li className="px-4 text-center hover:bg-black md:hover:rounded-[16px] hover:py-2 md:hover:px-6  cursor-pointer ">
              Kids
            </li>
          </ul>
          <article className="flex gap-4">
            <label
              htmlFor="search"
              className="bg-white px-2 py-1 md:py-2 bg-opacity-10 rounded-[34px] flex justify-between  absolute top-44 left-8 md:top-0 md:left-0 md:relative min-w-[310px]"
            >
              <input
                type="search"
                id="search"
                aria-label="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full md:mx-2 pl-2 outline-none  focus:bg-transparent active:bg-transparent"
              />
              <button
                onClick={searchMovie}
                className="bg-black py-2 px-4 rounded-full "
              >
                <SearchIcon />
              </button>
            </label>

            <button className="bg-red-400  py-2 md:py-4 px-6 rounded-3xl">
              Login
            </button>
          </article>
        </header>
        <section className="pt-10 flex flex-col gap-6 items-center">
          <h1 className="font-extralight text-3xl md:text-5xl max-w-[700px] text-center">
            Discover the Series of Stremaing Experience with
            <strong className="ml-2 font-semibold">CineStream</strong>
          </h1>
          <p className="text-gray-400 text-center text-sm md:text-base">
            Our young and expert admins prepare amazing trends
          </p>
          <section className=" justify-center grid md:grid-cols-3 gap-4 py-5">
            {movies && movies.length > 0 ? (
              movies.slice(0, 20).map((item) => (
                <article
                  key={item.imdbID}
                  className="mx-auto h-auto p-4 bg-white bg-opacity-15 max-w-[320px]"
                >
                  <figure className="">
                    <img src={item.Poster} alt={item.Title} />
                  </figure>
                  <figcaption className="mt-4 font-bold">
                    Release Date:
                    <span className="font-light">{item.Year}</span>
                  </figcaption>
                  <p className="font-bold">
                    Imdb ID:
                    <span className="font-light"> {item.imdbID} </span>
                  </p>

                  <p className="font-bold">
                    Title:
                    <span className="font-light"> {item.Title}</span>
                  </p>
                </article>
              ))
            ) : (
              <h1>No movie matches your Search...!</h1>
            )}
          </section>
        </section>
      </main>
    </section>
  );
}

export default App;
