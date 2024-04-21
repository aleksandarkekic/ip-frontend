import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button, Form, Input, message } from "antd";
import emailService from "../services/emailService";

export default function ConfirmEmailPage() {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    pin: "",
  });
  const { pin } = request;

  const onInputChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };
  const onFinish = async (e) => {
    try {
      for (const key in request) {
        if (request[key] === "") {
          message.error("Potrebno je unijeti pin", 5);
          return;
        }
      }
      const response = await emailService.confirmEmail(request);
      if (response.data) {
        message.success("Ispravan pin!");
        navigate("/home");
      } else {
        message.error("Neispravan pin!");
      }
    } catch (error) {
      message.error("Doslo je do greske!");
      console.log(error.message);
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="rom ">
        <div className="col-md-6 offset-md-3 border rounder p-4 mt-8 shadow  ">
          <h2 className="text-center m-4">UNESI PIN</h2>

          <div className="card-confirm" style={{ backgroundColor: "#F5F5F5" }}>
            <div className="card-header">
              <Grid container spacing={0} direction="column" paddingTop={10}>
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
                    label="Pin: "
                    rules={[
                      {
                        required: true,
                        message: "Treba popuniti sva polja",
                      },
                    ]}
                  >
                    <Input
                      name="pin"
                      value={pin}
                      onChange={(e) => onInputChange(e)}
                    />
                  </Form.Item>
                </Form>
                <div align="center">
                  <Button
                    type="primary"
                    className="btn btn-primary col-4"
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
  );
}
