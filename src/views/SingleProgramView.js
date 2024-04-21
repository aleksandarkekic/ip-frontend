import React, { useState, useEffect } from "react";
import photoService from "../services/photoService";
import programService from "../services/programService";
import { useParams } from "react-router";
import { Modal, Button, message, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import authService from "../services/authService";
import userService from "../services/userService";
import { UserOutlined } from "@ant-design/icons";
import CommentComponent from "../components/CommentComponent.js";
import commentService from "../services/commentService.js";
import participateService from "../services/participateService.js";

const SingleProgramView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUsername, setCurrentUsername] = useState("");
  const [ifCurretnUserIsOwner, setIfCurretnUserIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_2, setIsModalOpen_2] = useState(false);
  const [firstPhoto, setFirstPhoto] = useState({
    id: 0,
    photoUrl: "",
    programId: 0,
  });
  const [participateReq, setParticipate] = useState({
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };
  const { idPhoto, photoUrl, programId } = firstPhoto;
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
    Promise.all([currentUserIdFunc(), getProgramInfo()])
      .then(() => {
        getFirstPhoto();
        getPhotosByProgramId();
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  useEffect(() => {
    currentUsernameFunc();
    setParticipate((prevState) => ({
      ...prevState,
      programId: id,
    }));
  }, [currentUserId]);

  useEffect(() => {
    const compareUsernames = () => {
      if (currentUsername !== "" && program.userUsername !== "") {
        if (currentUsername === program.userUsername) {
          setIfCurretnUserIsOwner(true);
        } else {
          setIfCurretnUserIsOwner(false);
        }
      }
    };

    compareUsernames();
  }, [currentUsername, program.userUsername]);

  const currentUserIdFunc = async () => {
    const response = await authService.getCurrentId();
    setCurrentUserId(response.data);
    console.log(response.data);
  };

  const currentUsernameFunc = async () => {
    if (currentUserId != 0) {
      const response = await userService.findUsernameById(currentUserId);
      setCurrentUsername(response.data);
      console.log("CurrentUser " + response.data);
    }
  };

  const getFirstPhoto = async () => {
    const response = await photoService.getFirstPhotoByProgramId(id);
    setFirstPhoto(response.data);
  };

  const getProgramInfo = async () => {
    const response = await programService.getProgramInfo(id);
    setProgram(response.data);
    console.log(response.data);
  };

  const getPhotosByProgramId = async () => {
    const response = await photoService.getPhotosByProgramId(id);
    setPhotos(response.data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal_2 = () => {
    setIsModalOpen_2(true);
  };
  const handleOk_2 = () => {
    participateService.insertParticipate(participateReq);
    setIsModalOpen_2(false);
    navigate("/home");
  };
  const handleCancel_2 = () => {
    setIsModalOpen_2(false);
  };
  const showNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };
  const deleteProgram = () => {
    const respons = programService.deleteProgram(id);
    console.log(1);

    navigate("/home");
  };
  const participate = () => {
    showModal_2();
  };
  const deaktiviraj = () => {
    programService.deactivateProgram(id).then((result) => {
      if (result.status === 200) {
        message.success("Uspjesno ste deaktivirali!");
      } else {
        message.error("Doslo je do greske!");
      }
    });
    getProgramInfo();
  };
  const aktiviraj = () => {
    programService.activateProgram(id).then((result) => {
      if (result.status === 200) {
        message.success("Uspjesno ste aktivirali!");
      } else {
        message.error("Doslo je do greske!");
      }
    });
    getProgramInfo();
  };

  const checkIfUsernameisEqualToProgramUsername = () => {
    console.log("poredimo" + currentUsername + " " + program.userUsername);
    if (currentUsername === program.userUsername) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <div className="cardSingleProgram">
        <div className="image-container" onClick={showModal}>
          <img className="card-image" src={photoUrl} alt={idPhoto} />
          <h2 className="card-title">{name}</h2>
        </div>

        <Modal
          title="Fotografije"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {photos.length > 0 && (
            <div className="photo-list">
              <div className="modal-image-container">
                <img
                  className="modal-image"
                  src={photos[currentPhotoIndex].photoUrl}
                  alt={photos[currentPhotoIndex].id}
                />
              </div>
              <div className="button-container">
                <button onClick={showPreviousPhoto}>Previous</button>
                <button onClick={showNextPhoto}>Next</button>
              </div>
            </div>
          )}
        </Modal>
        <div className="card-details">
          <p className="card-price">
            <b>Cijena: </b> {price} {"BAM"}
          </p>
          <p>
            <b>Opis: </b> {description}
          </p>
          <p>
            <b>Kategorija: </b> {categoryName}
          </p>
          <p>
            <b>Trajanje u danima: </b> {duration}
          </p>
          <p>
            <b>Tezina: </b> {difficulty}
          </p>
          <p>
            <b>Atribut: </b> {attributeName}
          </p>
          <p>
            <b>Lokacija: </b> {locationName}
          </p>
          <p>
            <b>Trener/instruktor: </b> {coach}
          </p>
          <p>
            <b>Kontakt: </b> {contact}
          </p>
          {authService.CheckIfAuthorized() && (
            <Button
              style={{
                float: "right",
                fontSize: 20,
                height: 50,
                width: 220,
                borderRadius: 30,
              }}
              onClick={() => {
                authService.CheckIfAuthorized() && ifCurretnUserIsOwner
                  ? deleteProgram()
                  : participate();
              }}
            >
              {ifCurretnUserIsOwner ? "Obrisi program" : "Ucestvuj u programu"}
            </Button>
          )}
          {authService.CheckIfAuthorized() && ifCurretnUserIsOwner && (
            <Button
              style={{
                float: "right",
                fontSize: 20,
                height: 50,
                width: 220,
                borderRadius: 30,
                marginTop: 10,
              }}
              onClick={() => {
                authService.CheckIfAuthorized() && program.active
                  ? deaktiviraj()
                  : aktiviraj();
              }}
            >
              {program.active ? "Ucini neaktivnim" : "Aktiviraj"}
            </Button>
          )}
          <Modal
            open={isModalOpen_2}
            onOk={handleOk_2}
            onCancel={handleCancel_2}
          >
            <div>
              <h2>Odaberite način plaćanja:</h2>
              <div>
                <input
                  type="radio"
                  id="paymentCard"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="paymentCard">Karticom</label>
              </div>
              {paymentMethod === "card" && (
                <div>
                  <label htmlFor="cardNumber">Unesite broj kartice:</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </div>
              )}
              <div>
                <input
                  type="radio"
                  id="paymentPaypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="paymentPaypal">PayPal</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="paymentOnSite"
                  name="paymentMethod"
                  value="onSite"
                  checked={paymentMethod === "onSite"}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="paymentOnSite">Na licu mjesta</label>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      {authService.CheckIfAuthorized() && (
        <div className="cardOwnerInfos">
          <p>
            <b>Dodao: </b>
            {program.userUsername}
          </p>
          <p>
            <b>Status: </b> {program.active ? "Aktivan" : "Neaktivan"}
          </p>
        </div>
      )}
      {authService.CheckIfAuthorized() && (
        <div>
          <CommentComponent
            programId={parseInt(id)}
            username={program.userUsername}
          />
        </div>
      )}
    </div>
  );
};

export default SingleProgramView;
