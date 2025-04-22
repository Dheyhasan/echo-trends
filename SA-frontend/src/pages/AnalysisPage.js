// src/pages/AnalysisPage.js
import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

const AnalysisPage = () => {
  const location = useLocation();
  const { analysisData, selectedTracks } = location.state || {};

  const trackData = (selectedTracks || []).map((track) => ({
    name: track.name,
    duration: Number((track.duration_ms / 60000).toFixed(2)),
    popularity: track.popularity,
  }));

  const regressionLine = analysisData?.regression
    ? trackData.map((d) => ({
        duration: d.duration,
        predictedPopularity:
          analysisData.regression.slope * d.duration +
          analysisData.regression.intercept,
      }))
    : [];

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Playlist Analysis</h1>

        {analysisData ? (
          <div className="space-y-2 mb-6">
            <p>Total Tracks: {analysisData.total_tracks}</p>
            <p>
              Average Popularity:{" "}
              {analysisData?.average_popularity !== undefined
                ? analysisData.average_popularity.toFixed(2)
                : "N/A"}
            </p>
            <p>
              Average Duration:{" "}
              {analysisData?.average_duration_min !== undefined
                ? analysisData.average_duration_min.toFixed(2)
                : "N/A"}{" "}
              min
            </p>
            <p>
              Correlation (Duration vs Popularity):{" "}
              {analysisData?.correlation !== undefined
                ? analysisData.correlation.toFixed(2)
                : "N/A"}
            </p>
            <p>
              P-value:{" "}
              {analysisData?.p_value !== undefined
                ? analysisData.p_value.toExponential(2)
                : "N/A"}
            </p>
            <p>
              R² (fit strength):{" "}
              {analysisData?.regression?.r_squared !== undefined
                ? analysisData.regression.r_squared.toFixed(2)
                : "N/A"}
            </p>
          </div>
        ) : (
          <p>No analysis data available.</p>
        )}

        <div className="flex flex-col items-center space-y-10">
          {/* Duration vs Popularity */}
          <div className="w-full max-w-3xl h-96">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Duration vs Popularity
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="duration" name="Duration (min)" />
                <YAxis
                  type="number"
                  dataKey="popularity"
                  name="Popularity"
                  domain={[0, 100]}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Tracks" data={trackData} fill="#10b981" />
                {regressionLine && (
                  <Line
                    type="monotone"
                    dataKey="predictedPopularity"
                    data={regressionLine}
                    stroke="#6366f1"
                    dot={false}
                  />
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Duration Histogram */}
          <div className="w-full max-w-3xl h-72">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Duration Histogram
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trackData}>
                <CartesianGrid />
                <XAxis dataKey="duration" name="Duration (min)" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Popularity Histogram */}
          <div className="w-full max-w-3xl h-72">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Popularity Histogram
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trackData}>
                <CartesianGrid />
                <XAxis dataKey="popularity" name="Popularity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="popularity" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisPage;
