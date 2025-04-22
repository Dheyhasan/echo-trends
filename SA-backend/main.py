from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from scipy.stats import pearsonr, linregress

app = FastAPI()

# Allow frontend requests (adjust origin as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Track(BaseModel):
    duration_ms: int
    popularity: int

@app.post("/analyze")
def analyze_playlist(tracks: List[Track]):
    if not tracks:
        return {"error": "No tracks received"}

    total_tracks = len(tracks)
    durations = [t.duration_ms / 60000 for t in tracks]
    popularity = [t.popularity for t in tracks]

    avg_duration = sum(durations) / total_tracks
    avg_popularity = sum(popularity) / total_tracks

    if total_tracks > 1:
        correlation, p_value = pearsonr(durations, popularity)
        slope, intercept, r_value, _, _ = linregress(durations, popularity)
    else:
        correlation, p_value, slope, intercept, r_value = None, None, None, None, None

    return {
        "total_tracks": total_tracks,
        "average_duration_min": avg_duration,
        "average_popularity": avg_popularity,
        "correlation": correlation,
        "p_value": p_value,
        "regression": {
            "slope": slope,
            "intercept": intercept,
            "r_squared": r_value**2 if r_value is not None else None,
        }
    }
