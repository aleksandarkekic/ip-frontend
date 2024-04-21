import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, InputNumber, Select } from "antd";
import { Grid } from "@mui/material";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import attributeService from "../services/attributeService";
import categoryService from "../services/categoryService";
import programService from "../services/programService";

export default function AddProgramPage() {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [allAttributes, setAllAttributes] = useState([]);
  const [maxID, setMaxID] = useState(0);
  const [idCategory, setCategoryId] = useState(0);

  const [program, addProgram] = useState({
    name: "",
    description: "",
    price: 0,
    difficulty: 0,
    duration: 0,
    active: true,
    categoryName: "",
    attributeName: "",
    locationName: "",
    userId: 0,
    coach: "",
    contact: "",
  });

  const loadAllDistinctCategories = async (e) => {
    const response = await categoryService.getAllDistinctCategories();
    setAllCategories(response.data);
  };

  const loadAllDistinctAttributes = async (e) => {
    const response = await attributeService.getAllDistinctAttributes();
    setAllAttributes(response.data);
  };

  useEffect(() => {
    //loadAllDistinctAttributes();
    loadAllDistinctCategories();
  }, []);

  useEffect(() => {
    if (idCategory !== 0) {
      findAllByCategoryId();
    }
  }, [idCategory]);

  const {
    name,
    description,
    price,
    difficulty,
    duration,
    active,
    categoryId,
    attributeId,
    locationName,
    userId,
    coach,
    contact,
  } = program;

  const onInputChange = (e) => {
    addProgram({ ...program, [e.target.name]: e.target.value });
    console.log(program);
  };
  const onInputChange_1 = (e) => {
    const { name, value } = e.target ? e.target : e; // handle both regular event object and directly passed name-value pairs
    addProgram({ ...program, [name]: value });
  };
  const onFinish = async (e) => {
    try {
      for (const key in program) {
        if (program[key] === "") {
          message.error("Potrebno je popuniti sva polja", 5);
          return;
        }
      }
      console.log(program);
      const response = await programService.addProgram(program);
      const response_1 = await programService.getMaxId();
      const maxId = response_1.data;
      navigate(`/photos/upload/${maxId}`);
    } catch (error) {
      message.error("Doslo je do greske!");
      console.log(error.message);
      console.log(error);
    }
  };

  const findIdByName = async (name) => {
    const response = await categoryService.findIdByName(name);
    setCategoryId(response.data);
    console.log("Vrijednost categorId " + response.data);
  };

  const findAllByCategoryId = async () => {
    const response = await attributeService.findAllByCategoryId(idCategory);
    setAllAttributes(response.data);
  };
  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <Grid alignItems="center" justifyContent="center">
            <div className="container">
              <div className="rom ">
                <div className="col-md-12 offset-md-0 border rounder p-4 mt-2 shadow  ">
                  <h2 className="text-center m-4">DODAJ PROGRAM</h2>

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
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 9,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          labelAlign="center"
                          //onFinishFailed={onFinishFailed}
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
                              name="name"
                              value={name}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Opis: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="description"
                              value={description}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Cijena (BAM): "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <InputNumber
                              name="price"
                              type="number"
                              value={price}
                              onChange={(value) =>
                                onInputChange_1({
                                  target: { name: "price", value },
                                })
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="Tezina (1-5): "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <InputNumber
                              name="difficulty"
                              type="number"
                              value={difficulty}
                              onChange={(value) =>
                                onInputChange_1({
                                  target: { name: "difficulty", value },
                                })
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="Trajanje (u danima): "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <InputNumber
                              name="duration"
                              type="number"
                              value={duration}
                              onChange={(value) =>
                                onInputChange_1({
                                  target: { name: "duration", value },
                                })
                              }
                            />
                          </Form.Item>
                          <Form.Item label="Kategorija:">
                            <Select
                              onChange={(selectedCategory) => {
                                program.categoryName = selectedCategory;
                                console.log(selectedCategory);
                                findIdByName(selectedCategory);
                              }}
                            >
                              {allCategories.map((category, index) => (
                                <Select.Option key={index} value={category}>
                                  {category}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          {allAttributes.length > 0 && (
                            <Form.Item label="Atribut:">
                              <Select
                                onChange={(selectedAttribute) => {
                                  program.attributeName = selectedAttribute;
                                }}
                              >
                                {allAttributes.map((attribute, index) => (
                                  <Select.Option key={index} value={attribute}>
                                    {attribute}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                          <Form.Item
                            label="Lokacija: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="locationName"
                              value={locationName}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Trener/instruktor: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="coach"
                              value={coach}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Kontakt: "
                            rules={[
                              {
                                required: true,
                                message: "Treba popuniti sva polja",
                              },
                            ]}
                          >
                            <Input
                              name="contact"
                              value={contact}
                              onChange={(e) => onInputChange(e)}
                            />
                          </Form.Item>
                        </Form>

                        <div align="center">
                          <Button
                            type="primary"
                            className="btn btn-primary col-3"
                            onClick={onFinish}
                          >
                            Dodaj program
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
      </MDBRow>
    </MDBContainer>
  );
}
