import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import authService from "../services/authService";
import { Button, Form, Input, message } from "antd";
import { Grid } from "@mui/material";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import userService from "../services/userService";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, addUser] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    username: "default",
    password: "",
    city: "",
    accountConfirmed: true,
    role: "default",
  });

  const { firstName, lastName, mail, username, password, city } = user;

  const onInputChange = (e) => {
    addUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFinish = async (e) => {
    for (const key in user) {
      if (user[key] === "") {
        message.error("Potrebno je popuniti sva polja", 5);
        return;
      }
    }

    userService.editUser(userId, user).then((result) => {
      if (result.status === 200) {
        message.success("Uspjesno ste izmjenili profil!");
        navigate(`/users/${userId}`);
      } else {
        message.error("Doslo je do greske!");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <Grid alignItems="center" justifyContent="center">
            <div className="container">
              <div className="rom ">
                <div className="col-md-12 offset-md-0 border rounder p-4 mt-2 shadow  ">
                  <h2 className="text-center m-4">Izmjeni nalog</h2>

                  <div
                    className="cardRegister"
                    style={{ backgroundColor: "#F5F5F5" }}
                  >
                    <div className="card-header">
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        paddingRight={0}
                      >
                        <Form
                          name="basic"
                          labelCol={{
                            span: 7,
                          }}
                          wrapperCol={{
                            span: 12,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          labelAlign="center"
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                          requiredMark={false}
                        >
                          <Form.Item
                            label="Ime: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="firstName"
                              value={firstName}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Prezime: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="lastName"
                              value={lastName}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Email: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="mail"
                              value={mail}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Sifra: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="password"
                              value={password}
                              type="password"
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Grad: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="city"
                              value={city}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                        </Form>
                        <div align="center">
                          <Button
                            type="primary"
                            className="btn btn-primary col-5"
                            onClick={onFinish}
                          >
                            Potvrdi
                          </Button>
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </MDBCol>
        <MDBCol col="6" className="mb-5">
          <MDBRipple rippleTag="a">
            <div className="d-flex flex-column  justify-content-center h-100 mb-4">
              <img
                src="https://i.ibb.co/9gJpwdg/man-8070375-1280.jpg"
                className="img-fluid rounded"
                alt="example"
              />
            </div>
          </MDBRipple>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
