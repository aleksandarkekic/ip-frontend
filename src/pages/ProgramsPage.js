import React, { useState, useEffect } from "react";
import ProgramCard from "../components/ProgramCard";
import programService from "../services/programService";
import attributeService from "../services/attributeService";
import categoryService from "../services/categoryService";
import authService from "../services/authService";
import locationService from "../services/locationService";
import { Layout, Menu, theme, Select, Space, InputNumber, Button } from "antd";
import { Grid } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import {
  DollarOutlined,
  BookOutlined,
  UserOutlined,
  PushpinFilled,
  EditOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [allAttributes, setAllAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const [search, setSearch] = useState("");
  const allPageSizes = [12, 16, 20];
  const [postsSize, setPostsSize] = useState(0);

  const loadAllDistinctCategories = async (e) => {
    const response = await categoryService.getAllDistinctCategories();
    setAllCategories(response.data);
  };

  const loadAllDistinctAttributes = async (e) => {
    const response = await attributeService.getAllDistinctAttributes();
    setAllAttributes(response.data);
  };

  const loadAllDistinctLocations = async (e) => {
    const response = await locationService.getAllDistinctLocations();
    setAllLocations(response.data);
  };

  const { Header, Content, Footer, Sider } = Layout;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadAllDistinctCategories();
    loadAllDistinctAttributes();
    loadAllDistinctLocations();
    loadPrograms();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const saveFilterValues = () => {
    const filterValues = {
      selectedAttribute,
      selectedCategory,
      selectedLocation,
      priceFrom,
      priceTo,
    };
    localStorage.setItem("filterValues", JSON.stringify(filterValues));
  };
  const loadPrograms = () => {
    const storedFilterValues = localStorage.getItem("filterValues");
    if (storedFilterValues) {
      const {
        selectedAttribute,
        selectedCategory,
        selectedLocation,
        priceFrom,
        priceTo,
      } = JSON.parse(storedFilterValues);
      setSelectedAttribute(selectedAttribute);
      setSelectedCategory(selectedCategory);
      setSelectedLocation(selectedLocation);
      setPriceFrom(priceFrom);
      setPriceTo(priceTo);
    }
    programService
      .getFiltered(
        currentPage,
        pageSize,
        priceFrom,
        priceTo,
        selectedCategory,
        selectedLocation,
        selectedAttribute,
        search
      )
      .then((result) => {
        setPrograms(result.data.content);
        setPostsSize(result.data.totalElements);
      });
  };
  const handleInputChange = (event) => {
    console.log(search);
    setSearch(event.target.value);
  };

  const items = [
    {
      key: "price-filter",
      label: <span style={{ fontSize: "18px" }}>cijena-filter</span>,
      icon: React.createElement(DollarOutlined),
      children: [
        {
          label: (
            <Space style={{ alignItems: "center" }}>
              <InputNumber
                onChange={(value) => setPriceFrom(value)}
                placeholder="Od"
                allowClear={true}
                value={priceFrom === 0 ? null : priceFrom}
              />
              <InputNumber
                onChange={(value) => setPriceTo(value)}
                placeholder="Do"
                allowClear={true}
                value={priceTo === 0 ? null : priceTo}
              />
            </Space>
          ),
          key: "value-range",
        },
      ],
    },
    {
      key: "category-filter",
      label: <span style={{ fontSize: "18px" }}>kategorija-filter</span>,
      icon: React.createElement(BookOutlined),
      children: [
        {
          label: (
            <Select
              onChange={(selectedCategory) => {
                setSelectedCategory(selectedCategory);
              }}
              style={{ width: "100%" }}
              allowClear={true}
              value={selectedCategory}
            >
              {allCategories.map((category, index) => (
                <Select.Option key={index} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          ),
          key: "category",
        },
      ],
    },
    {
      key: "location-filter",
      label: <span style={{ fontSize: "18px" }}>lokacija-filter</span>,
      icon: React.createElement(PushpinFilled),
      children: [
        {
          label: (
            <Select
              onChange={(selectedLocation) => {
                setSelectedLocation(selectedLocation);
              }}
              style={{ width: "100%" }}
              allowClear={true}
              value={selectedLocation}
            >
              {allLocations.map((location, index) => (
                <Select.Option key={index} value={location}>
                  {location}
                </Select.Option>
              ))}
            </Select>
          ),
          key: "locations",
        },
      ],
    },
    {
      key: "attributes-filter",
      label: <span style={{ fontSize: "18px" }}>atribut-filter</span>,
      icon: React.createElement(EditOutlined),
      children: [
        {
          label: (
            <Select
              onChange={(selectedAttribute) => {
                setSelectedAttribute(selectedAttribute);
              }}
              style={{ width: "100%" }}
              allowClear={true}
              value={selectedAttribute}
            >
              {allAttributes.map((location, index) => (
                <Select.Option key={index} value={location}>
                  {location}
                </Select.Option>
              ))}
            </Select>
          ),
          key: "attributes",
        },
      ],
    },
  ];
  const filterPosts = () => {
    saveFilterValues();
    loadPrograms();
  };

  useEffect(() => {
    loadPrograms();
  }, [currentPage, postsSize, pageSize, search]);

  const onChange = (value) => {
    setCurrentPage(0);
    setPageSize(value);
  };
  return (
    <Layout>
      <Sider width={300} style={{ backgroundColor: "#f0f2f5" }}>
        <div
          style={{
            height: "60px",

            textAlign: "center",
            lineHeight: "50px",
            fontSize: "20px",
          }}
        >
          <p>{currentTime.toLocaleTimeString()}</p>
        </div>
        <div
          style={{
            height: "50px",
            backgroundColor: "#7E9CA6",
            textAlign: "center",
            lineHeight: "50px",
            color: "#fff",
            fontSize: "20px",
          }}
        >
          Izaberi filter
        </div>

        <Menu
          mode="inline"
          style={{
            height: "380px",
            borderRight: 0,
          }}
          items={items}
        />
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={filterPosts}
            style={{ fontSize: "18px" }}
          >
            Filtriraj
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            height: "60px",
            backgroundColor: "#7E9CA6",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Unesite vašu pretragu"
            style={{
              borderRadius: "15px",
              height: "30px",
              width: "300px",
              padding: "5px",
            }}
          />
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
              .filter((program) => !program.deleted && program.active)
              .map((program) => (
                <ProgramCard id={program.id} key={program.id} />
              ))}
            {Array(
              Math.max(
                0,
                4 -
                  programs.filter(
                    (program) => !program.deleted && program.active
                  ).length
              )
            )
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
