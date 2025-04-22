// src/api/spotify.js
export const fetchPlaylists = async (accessToken) => {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  const data = await response.json();
  return data.items;
};
export const fetchPlaylistTracks = async (token, playlistId) => {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Spotify API error response:", errorText);
    throw new Error("Failed to fetch playlist tracks");
  }

  const data = await res.json();
  return data.items.map((item) => {
    const t = item.track;
    return {
      id: t.id,
      name: t.name,
      artists: t.artists.map((a) => a.name),
      album: t.album.name,
      releaseDate: t.album.release_date,
      popularity: t.popularity,
      duration_ms: t.duration_ms,
      explicit: t.explicit,
      added_at: item.added_at,
      Genres: t.Genres,
      Danceability: t.Danceability,
      Energy: t.Energy,
      Key: t.Key,
      Loudness: t.Loudness,
      Mode: t.Mode,
      Speechiness: t.Speechiness,
      Acousticness: t.Acousticness,
      Instrumentalness: t.Instrumentalness,
      Liveness: t.Liveness,
      Valence: t.Valence,
      Tempo: t.Tempo,
      TimeSignature: t.TimeSignature,
    };
  });
};

export const fetchUserProfile = async (accessToken) => {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await res.json();
};
