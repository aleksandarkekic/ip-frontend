/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
const { Dragger } = Upload;

const UploadPhoto = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("jwt");
    console.log("id jee +" + id);
    axios
      .post(`http://localhost:9000/photos/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const props = {
    name: "file",
    action: "",
    multiple: false,
    showUploadList: true,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
  };

  const handleSubmit = () => {
    navigate("/home");
  };
  return (
    <Grid alignItems="center" justifyContent="center" className="text-center">
      <div className="container">
        <div className="rom">
          <div className="col-md-6 offset-md-3 border rounder p-4 mt-2 shadow">
            <h2 className="text-center m-4">Upload fotografije:</h2>

            <div className="cardUpload">
              <div className="card-header">
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
              </div>
              <div className="card-body">
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};
export default UploadPhoto;
