import React, { useState } from "react";
import Header from "../components/Header";
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
} from "recharts";

const generateRandomTracks = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    name: `Track ${i + 1}`,
    duration: parseFloat((Math.random() * 5 + 2).toFixed(2)), // 2 to 7 minutes
    popularity: Math.floor(Math.random() * 100),
  }));
};

const Landingpage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackData = generateRandomTracks();

  const insights = [
    {
      title: "Insight 1",
      description: "Relationship between track duration and popularity.",
      chart: (
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="duration" name="Duration (min)" />
          <YAxis type="number" dataKey="popularity" name="Popularity" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={trackData} fill="#0ea5e9" />
        </ScatterChart>
      ),
    },
    {
      title: "Insight 2",
      description: "Distribution of track popularity.",
      chart: (
        <BarChart data={trackData}>
          <CartesianGrid />
          <XAxis dataKey="popularity" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="popularity" fill="#f59e0b" />
        </BarChart>
      ),
    },
    {
      title: "Insight 3",
      description: "Distribution of track durations.",
      chart: (
        <BarChart data={trackData}>
          <CartesianGrid />
          <XAxis dataKey="duration" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#10b981" />
        </BarChart>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="mt-12 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Discover the Power of Data in Music
        </h1>
        <p className="text-center text-gray-600 mb-8 slide-in-left">
          EchoTrends offers a dynamic exploration of your Spotify playlists.
          Even without logging in, you can get a glimpse of how we turn raw
          track data into meaningful insights—visually and interactively.
        </p>

        <div className="relative overflow-hidden bg-white rounded-lg shadow-md p-4 h-[460px]">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {insights[activeIndex].chart}
            </ResponsiveContainer>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-1">
              {insights[activeIndex].title}
            </h2>
            <p className="text-sm text-gray-500">
              {insights[activeIndex].description}
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {insights.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${
                activeIndex === idx ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(idx)}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Landingpage;
