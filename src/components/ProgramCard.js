import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import photoService from "../services/photoService";
import programService from "../services/programService";
import "../css/card.css";
import { Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
const ProgramCard = (props) => {
  const [photo, setPhoto] = useState({
    id: 0,
    photoUrl: "",
    programId: 0,
  });

  const [program, setProgram] = useState({
    id: 0,
    name: "",
    description: "",
    price: "",
    difficulty: "",
    duration: "",
    active: "",
    categoryName: "",
    attributeName: "",
    locationName: "",
    userUsername: "",
    coach: "",
    contact: "",
  });

  const { idPhoto, photoUrl, programId } = photo;

  const {
    idProgram,
    name,
    description,
    price,
    difficulty,
    duration,
    active,
    categoryName,
    attributeName,
    locationName,
    userUsername,
    coach,
    contact,
  } = program;

  useEffect(() => {
    getProgramInfo();
    getFirstPhoto();
  }, []);

  const getFirstPhoto = async (e) => {
    const response = await photoService.getFirstPhotoByProgramId(props.id);
    setPhoto(response.data);
    console.log(response.data);
  };

  const getProgramInfo = async (e) => {
    const response = await programService.getProgramInfo(props.id);
    setProgram(response.data);
    console.log(response.data);
  };

  return (
    <a href={`/programs/${props.id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <img className="card-image" src={photoUrl} alt={idPhoto}></img>
        <h2 className="card-title">{name}</h2>
        <p className="card-price">
          {" "}
          <FontAwesomeIcon icon={faDollarSign} /> {price}
          {"BAM"}
        </p>
      </div>
    </a>
  );
};
ProgramCard.propTypes = {
  id: PropTypes.number,
};

export default ProgramCard;
