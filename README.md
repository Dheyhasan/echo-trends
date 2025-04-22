# EchoTrends 🎧

EchoTrends is a React + FastAPI web app that analyzes your Spotify playlists and visualizes track data through interactive plots.

## Features

- Spotify login with playlist access
- Displays playlist metadata and tracks
- Analyzes:
  - Average duration and popularity
  - Correlation and p-values
  - Linear regression insights
- Visualizations using Recharts (duration vs popularity, histograms)
- Responsive layout and modern UI

## Frontend

- **Framework**: React
- **Styling**: Tailwind CSS v3
- **Plotting**: Recharts
- **Routing**: React Router

## Backend

- **Framework**: FastAPI
- **Analysis**: Pandas, SciPy
- **Endpoints**:
  - `/analyze`: returns stats and correlations
  - `/plot`: returns backend-generated plot (optional)

## Installation

```bash
# Frontend
cd SA-frontend
npm install
npm start

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


---

You can paste this directly inside your `README.md` file at the root of the project. Let me know if you want to add screenshots, badges, or credits.


```
