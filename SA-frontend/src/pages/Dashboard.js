import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlaylists, fetchPlaylistTracks } from "../api/spotify.js";
import Header from "../components/Header.js";

// every thing above is just impot not need to explin */

// Ceate Dashboard function as arrow functions  */

const Dashboard = () => {
  // Create couple of varibale and assign them to useState which mean date need to be track in the app

  const [playlists, setPlaylists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // useNavigate is a hook that allows you to move to other pages

  const navigate = useNavigate();

  // useEffect is a hook that allows you to run side effects in your component

  // The empty array means this effect will only run once when the component mounts

  // The function fetchPlaylists is called to get the playlists from the Spotify API

  // The token is stored in localStorage and is used to authenticate the request

  // If the token is not found, a warning is logged and loaded is set to true

  // If the token is found, the playlists are fetched and set in the state

  // If there is an error, it is logged and loaded is set to true

  useEffect(() => {
    // This is a side effect that runs when the component mounts

    const token = localStorage.getItem("spotifyAccessToken");
    if (token) {
      fetchPlaylists(token)
        .then((data) => {
          setPlaylists(data);
          setLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
          setLoaded(true);
        });
    } else {
      console.warn("No token found");
      setLoaded(true);
    }
  }, []);

  const handleSelect = async (playlistId) => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) return;

    try {
      const tracks = await fetchPlaylistTracks(token, playlistId);
      setSelectedTracks(tracks);

      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          tracks.map((t) => ({
            name: t.name,
            duration_ms: t.duration_ms,
            popularity: t.popularity,
          }))
        ),
      });

      const analysisData = await response.json();
      console.log("ANALYSIS DATA FROM BACKEND:", analysisData);

      navigate("/analysis", {
        state: {
          analysisData,
          selectedTracks: tracks,
        },
      });
    } catch (err) {
      console.error("Error fetching tracks or analyzing:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Your Spotify Dashboard</h1>
        <p className="mt-2">Here you can view and analyze your playlists.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer"
              onClick={() => {
                console.log("Clicked playlist:", pl.name);
                handleSelect(pl.id);
              }}
            >
              {pl.images?.[0]?.url && (
                <img
                  src={pl.images[0].url}
                  alt={pl.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-2">
                <h3 className="font-semibold text-sm">{pl.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
