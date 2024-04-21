import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";
export default function CaptchaPage() {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    initializeCaptcha(ctx);
  }, []);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = "";
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = "20px Roboto Mono";
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,

        // Randomize Y position slightly
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
  };

  const initializeCaptcha = (ctx) => {
    setUserInput("");
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCaptchaSubmit = () => {
    if (userInput === captchaText) {
      alert("Success");
      navigate("/home");
    } else {
      alert("Incorrect");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      initializeCaptcha(ctx);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Prepisi ispravno tekst sa slike</h3>
      <div style={{ textAlign: "center" }}>
        <div>
          <canvas
            style={{ border: "2px solid crimson", borderRadius: "20px" }}
            ref={canvasRef}
            width="200"
            height="70"
          ></canvas>

          <button
            style={{
              fontSize: "20px",
              width: "4.6em",
              backgroundColor: "green",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.4em",
              color: "#ffffff",
              marginLeft: "10px",
              marginBottom: "10px",
            }}
            id="reload-button"
            onClick={() =>
              initializeCaptcha(canvasRef.current.getContext("2d"))
            }
          >
            Reload
          </button>
        </div>
        <input
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "1rem",
            width: "100%",
            padding: "16px",
            border: "2px solid crimson",
            borderRadius: "20px",
          }}
          type="text"
          id="user-input"
          placeholder="Unesi tekst sa slike"
          value={userInput}
          onChange={handleUserInputChange}
        />
        <button
          id="submit-button"
          onClick={handleCaptchaSubmit}
          style={{
            width: "100%",
            color: "#ffffff",
            fontSize: "1.5em",
            border: "none",
            marginTop: "1em",
            padding: "0.8em 0",
            borderRadius: "0.4em",
            backgroundColor: "green",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
