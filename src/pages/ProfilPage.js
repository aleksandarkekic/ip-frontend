import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProgramCard from "../components/ProgramCard";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import categoryService from "../services/categoryService";
import {
  Layout,
  Menu,
  theme,
  Select,
  Space,
  InputNumber,
  Button,
  Modal,
} from "antd";
import programService from "../services/programService";
import { Grid } from "@mui/material";
import commentService from "../services/commentService";

export default function ProfilPage() {
  const { userId } = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [programs, setPrograms] = useState([]);
  const allPageSizes = [12, 16, 20];
  const [postsSize, setPostsSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Option } = Select;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    mail: "",
    city: "",
    role: "",
    categoryName: "",
  });
  const { Header, Content, Footer, Sider } = Layout;

  useEffect(() => {
    setCurrentUserInfo();
    loadPrograms();
    getAllDistinctCategories();
  }, []);

  const loadPrograms = () => {
    programService
      .getAllByUserId(userId, currentPage, pageSize)
      .then((result) => {
        setPrograms(result.data.content);
        setPostsSize(result.data.totalElements);
      });
  };

  const setCurrentUserInfo = async () => {
    const result = await userService.getCurrentUserInfo();
    setUser(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    loadPrograms();
  }, [currentPage, postsSize, pageSize]);

  useEffect(() => {
    setCurrentUserInfo();
  }, [isModalOpen]);

  const getAllDistinctCategories = async () => {
    const result = await categoryService.getAllDistinctCategories();
    setAllCategories(result.data);
    console.log(result.data);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };
  const handelClick = () => {
    navigate(`/users/edit/${userId}`);
  };
  const handelClick_1 = () => {
    navigate(`/participate/${userId}`);
  };
  const onChange = (value) => {
    setCurrentPage(0);
    setPageSize(value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(selectedCategory);
    subscribeToCategory();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const subscribe = () => {
    showModal();
  };
  const subscribeToCategory = async () => {
    const result = await userService.subscribeToCategory(
      userId,
      selectedCategory
    );
  };
  return (
    <Layout>
      <Sider width={500} style={{ backgroundColor: "#f0f2f5" }}>
        <div className="cardProfil">
          <div className="image-container">
            <img
              className="profilImg"
              style={{ width: "100px", height: "100px" }}
              src="https://i.ibb.co/0Cj8m5g/blank-profile-picture-973460-640.png"
            />
          </div>
          <div className="card-details-profil">
            <h3>Informacije o korisniku:</h3>

            <p>
              {" "}
              <b>Ime: </b> {user.firstName}
            </p>
            <p>
              <b>Prezime: </b> {user.lastName}
            </p>
            <p>
              {" "}
              <b>Korisničko ime: </b> {user.username}
            </p>
            <p>
              <b>Email: </b> {user.mail}
            </p>
            <p>
              <b>Grad: </b> {user.city}
            </p>
            <p>
              <b>Uloga: </b> {user.role}
            </p>
            {user.categoryName != null && (
              <p>
                <b>Pretplacen na kategoriju: </b> {user.categoryName}
              </p>
            )}
            <Button
              type="primary"
              className="btn btn-outline-primary col-8"
              onClick={handelClick}
            >
              Izmjeni profil
            </Button>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            height: "60px",
            backgroundColor: "#7E9CA6",
          }}
        >
          <Button
            type="text"
            onClick={handelClick_1}
            style={{
              fontSize: 20,
              height: 50,
              width: 300,
              borderRadius: 30,
            }}
          >
            Prethodna ucestvovanja
          </Button>
          <Button
            type="text"
            onClick={subscribe}
            style={{
              fontSize: 20,
              height: 50,
              width: 300,
              borderRadius: 30,
            }}
          >
            Pretplati se na kategoriju
          </Button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {programs
              .filter((program) => program.deleted === false)
              .map((program) => (
                <ProgramCard id={program.id} key={program.id} />
              ))}
            {Array(Math.max(0, 4 - programs.length))
              .fill()
              .map((_, i) => (
                <div key={i} />
              ))}
          </div>
        </Content>
        <Modal
          title="Pretplati se na kategoriju"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {" "}
          <Select
            style={{ width: "100%" }}
            placeholder="Izaberite kategoriju"
            onChange={(value) => setSelectedCategory(value)}
            value={selectedCategory}
          >
            {allCategories &&
              allCategories.length > 0 &&
              allCategories.map((category, index) => (
                <Option key={index} value={category}>
                  {category}
                </Option>
              ))}
          </Select>
        </Modal>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <Grid
            container
            item
            sx={{ justifyContent: "center", paddingLeft: "20%" }}
          >
            <Button
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={(currentPage + 1) * pageSize >= postsSize}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
            <Select
              defaultValue={allPageSizes[1]}
              placeholder="Velicina straince"
              optionFilterProp="children"
              style={{
                width: 60,
              }}
              onChange={onChange}
              options={allPageSizes.map((size) => ({
                label: size,
                value: size,
              }))}
            />
          </Grid>
        </Footer>
      </Layout>
    </Layout>
  );
}
