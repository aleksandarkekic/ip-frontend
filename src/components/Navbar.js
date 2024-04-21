import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import userService from "../services/userService";

export default function Navbar() {
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("filterValues");
    navigate("/");
  };
  const login = () => {
    navigate("/");
  };
  useEffect(() => {
    loadUserId();
  }, []);
  const loadUserId = () => {
    userService.getCurrentUserId().then((result) => {
      setUserId(result.data);
    });
  };
  const setOdjaviPrijavi = () => {
    const role = localStorage.getItem("role");
    if (role !== null || typeof role === "undefined") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light  "
      style={{
        fontSize: 25,
        paddingRight: 30,
      }}
    >
      <a className="navbar-brand">
        <img
          src="https://i.ibb.co/n3nBxqP/White-and-black-Fitness-gym-logo.png"
          width="50"
          height="40"
          alt=""
        />
      </a>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul
          className="navbar-nav"
          style={{ paddingLeft: "3rem", paddingRight: "1rem" }}
        >
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Početna
            </a>
          </li>

          <li className="nav-item active">
            <a
              className="nav-link"
              style={{ paddingInline: "1rem" }}
              href="/programs"
            >
              Programi
            </a>
          </li>

          {authService.CheckIfAuthorized() && (
            <li className="nav-item active">
              <a
                className="nav-link"
                style={{ paddingInline: "1rem" }}
                href="/programs/add"
              >
                Dodaj program
              </a>
            </li>
          )}
          {authService.CheckIfAuthorized() && (
            <li className="nav-item active">
              <a
                className="nav-link"
                style={{ paddingInline: "1rem" }}
                href={`/users/${userId}`}
              >
                Profil
              </a>
            </li>
          )}
          {authService.CheckIfAuthorized() && (
            <li className="nav-item active">
              <a
                className="nav-link"
                style={{ paddingInline: "1rem" }}
                href={"/chat"}
              >
                Chat sa korisnicima
              </a>
            </li>
          )}
          {authService.CheckIfAuthorized() && (
            <li className="nav-item active">
              <a
                className="nav-link"
                style={{ paddingInline: "1rem" }}
                href={"/chat/advisor"}
              >
                Chat sa savjetnicima
              </a>
            </li>
          )}
          {authService.CheckIfAuthorized() && (
            <li className="nav-item active">
              <a
                className="nav-link"
                style={{ paddingInline: "1rem" }}
                href={"/diary"}
              >
                Dnevnik aktivnosti
              </a>
            </li>
          )}
        </ul>
      </div>
      {/*
      <Search
        placeholder="Pretraga"
        allowClear
        onSearch={onSearch}
        size="large"
        style={{
          width: 500,
          float: "right",
        }}
      />
    */}
      <div style={{ width: 60 }}></div>
      {
        <Button
          type="text"
          style={{
            float: "right",
            fontSize: 20,
            height: 50,
            width: 120,
            borderRadius: 30,
          }}
          onClick={() => {
            authService.CheckIfAuthorized() ? logout() : login();
          }}
        >
          {setOdjaviPrijavi() ? "Odjavi se" : "Prijavi se"}
        </Button>
      }
    </nav>
  );
}
