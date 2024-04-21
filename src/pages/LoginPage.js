import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Result, message } from "antd";
import authService from "../services/authService";
import { Grid } from "@mui/material";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = data;
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onFinish = async (e) => {
    try {
      for (const key in data) {
        if (data[key] === "") {
          message.error("Potrebno je popuniti sva polja", 5);
          return;
        }
      }
      const response = await authService.isConfirmed(username);
      const isConfirmed = response.data;
      if (!isConfirmed) {
        await authService.sendPin(username);
        navigate("/confirm-email");
      } else {
        const response_1 = await authService.logIn(data);
        localStorage.setItem("jwt", response_1.data.accessToken);
        const response_2 = await authService.currentRole();
        localStorage.setItem("role", authService.setRole(response_2.data));
        message.success("Uspjesno ste se logovali!");
        navigate("/captcha");
      }
    } catch (error) {
      message.error("Doslo je do greske!");
    }
  };
  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <Grid alignItems="center" justifyContent="center">
            <div className="container">
              <div className="rom ">
                <div className="col-md-12 offset-md-0 border rounder p-4 mt-2 shadow  ">
                  <h2 className="text-center m-4">PRIJAVI SE</h2>

                  <div
                    className="cardLogin"
                    style={{ backgroundColor: "#F5F5F5" }}
                  >
                    <div className="card-header">
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        paddingTop={10}
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
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Korisnicko ime: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <UserOutlined className="site-form-item-icon" />
                              }
                              name="username"
                              value={username}
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
                              prefix={
                                <LockOutlined className="site-form-item-icon" />
                              }
                              name="password"
                              value={password}
                              type="password"
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                        </Form>
                      </Grid>

                      <div align="center">
                        <Button
                          type="primary"
                          className="btn btn-primary col-8"
                          onClick={onFinish}
                        >
                          Prijavi se
                        </Button>
                      </div>
                      <div align="center">
                        <Link
                          type="button"
                          className=" btn-outline-secondary col-8 my-3"
                          to="/home"
                        >
                          Nastavi kao gost
                        </Link>
                      </div>
                      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                        <p className="mb-0">Nemate nalog?</p>

                        <Link
                          className="btn btn-outline-danger my-3"
                          to={"/add-user"}
                        >
                          Kreiraj nalog
                        </Link>
                      </div>
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
                src="https://i.ibb.co/w0LWxmw/1.png"
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
