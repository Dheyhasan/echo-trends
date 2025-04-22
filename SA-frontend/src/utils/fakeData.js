export const generateFakeTracks = (count = 30) => {
  return Array.from({ length: count }).map((_, i) => {
    const duration_ms = Math.floor(Math.random() * 5 + 2) * 60000; // 2–7 mins
    const popularity = Math.floor(Math.random() * 100);
    return {
      name: `Track ${i + 1}`,
      duration_ms,
      duration: Number((duration_ms / 60000).toFixed(2)),
      popularity,
    };
  });
};
