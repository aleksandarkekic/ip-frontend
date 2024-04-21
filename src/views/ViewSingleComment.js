import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import userService from "../services/userService";

const ViewSingleComments = (props) => {
  const [ownerUsername, setOwnerUsername] = useState("");
  const [side, setSide] = useState("");
  const [isOwnerBool, setIfOwner] = useState(false);
  const commentStyle = {
    textAlign: "left",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: props.deleted ? "#eee" : "#fff",
    width: "100%",
    wordWrap: "break-word",
  };
  useEffect(() => {
    findUsernameById();
  }, []);

  useEffect(() => {
    getSide();
    isOwner();
  }, [ownerUsername]);

  const findUsernameById = async () => {
    const response = await userService.findUsernameById(props.userId);
    setOwnerUsername(response.data);
    console.log(
      response.data +
        " i userId je: " +
        props.userId +
        " a props.username je " +
        props.username
    );
  };

  const getSide = () => {
    if (props.username === ownerUsername) {
      setSide("right");
    } else {
      setSide("left");
    }
  };
  const isOwner = () => {
    if (props.username === ownerUsername) {
      setIfOwner(true);
    } else {
      setIfOwner(false);
    }
  };
  const userInfoStyle = {
    display: "flex",
    alignItems: "center",
  };
  return (
    <div
      style={{
        width: "100%",
        textAlign: side === "right" ? "right" : "left",
        margin: "auto",
        alignItems: side === "right" ? "right" : "left",
      }}
    >
      <div style={commentStyle}>
        <div style={userInfoStyle}>
          <img
            src="https://i.ibb.co/0Cj8m5g/blank-profile-picture-973460-640.png" // Postavite putanju do slike vašeg avatara
            alt="Avatar"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          <strong>{ownerUsername}</strong> -
          {isOwnerBool && <span>(vlasnik)</span>}{" "}
          {new Date(props.createdTime).toLocaleString()}
        </div>
        <p>{props.text}</p>
      </div>
    </div>
  );
};
ViewSingleComments.propTypes = {
  id: PropTypes.number,
  createdTime: PropTypes.string,
  username: PropTypes.string,
  text: PropTypes.string,
  deleted: PropTypes.bool,
  userId: PropTypes.number,
};
export default ViewSingleComments;
