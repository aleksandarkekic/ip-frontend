import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProgramCard from "../components/ProgramCard";
import participateService from "../services/participateService";
import programService from "../services/programService";
import { Layout, Menu, theme, Select, Space, InputNumber, Button } from "antd";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ParticipatePage() {
  const { userId } = useParams();
  const [programs, setPrograms] = useState([]);
  const [programIds, setProgramIds] = useState([]);
  const allPageSizes = [12, 16, 20];
  const [postsSize, setPostsSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const { Header, Content, Footer, Sider } = Layout;

  const findByUserId = async () => {
    const result = await participateService.findByUserId(userId);
    setProgramIds(result.data);
    console.log("Program ids: " + result.data);
    console.log("UserId: " + userId);
  };

  useEffect(() => {
    findByUserId();
  }, []);

  useEffect(() => {
    findByIdsPaginated();
  }, [programIds]);

  const findByIdsPaginated = async () => {
    await programService
      .findByIdsPaginated(currentPage, pageSize, programIds)
      .then((result) => {
        setPrograms(result.data.content);
        setPostsSize(result.data.totalElements);
      });
  };
  useEffect(() => {
    findByIdsPaginated();
  }, [currentPage, postsSize, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };
  const onChange = (value) => {
    setCurrentPage(0);
    setPageSize(value);
  };
  const headerStyle = {
    padding: 0,
    height: "60px",
    backgroundColor: "#7E9CA6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6em",
  };
  return (
    <Layout>
      <Layout>
        <Header style={headerStyle}>Prethodna ucestovanja korisnika</Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
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
