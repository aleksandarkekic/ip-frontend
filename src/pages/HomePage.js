import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import FetchDataFromRSSFeed from "../components/FetchDataFromRSSFeed ";
export default function HomePage() {
  const [data, setData] = useState({
    exercises: [],
  });

  const API_KEY = "vFe6zJy1vJ/csNx/NAgv6A==MmuBwSTJNGYz2Hut";

  const api = axios.create({
    headers: {
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  const getExercises = async () => {
    try {
      const response = await api.get(
        "https://api.api-ninjas.com/v1/exercises?muscle=biceps"
      );
      setData({ exercises: response.data });
    } catch (error) {
      message.error("Desila se greska prolikom ucitavanja predlozenih vjezbi");
      console.log(error.message);
      setData({ exercises: [] });
    }
  };
  useEffect(() => {
    getExercises();
    console.log(data);
  }, []);
  const [feedData, setFeedData] = useState([]);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div>
        <h2 style={{ marginBottom: "20px" }}>Best exercises for biceps:</h2>
        {data.exercises.map((exercise) => (
          <div key={exercise.name}>
            <h2>{exercise.name}</h2>
            <p>Difficulty: {exercise.difficulty}</p>
            <p>Instructions: {exercise.instructions}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 style={{ marginBottom: "20px" }}>Recent Blog Post:</h2>
        <FetchDataFromRSSFeed />
      </div>
    </div>
  );
}
