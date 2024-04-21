import React, { useState, useEffect, useRef } from "react";
import diaryService from "../services/diaryService";
import Chart from "chart.js/auto";
import { jsPDF } from "jspdf";

import { Table, Button, Modal, Form, Input } from "antd";
export default function DiaryPage() {
  const [weightDiaries, setWeightDiaries] = useState([]);
  const [exerciseDiaries, setExerciseDiaries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_2, setIsModalOpen_2] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [timeoutId_2, setTimeoutId_2] = useState(null);

  const [data, setData] = useState({
    labels: [],
    values: [],
  });
  const chartRef = useRef(null);

  const [diary, setDiary] = useState({
    id: 0,
    exerciseName: "",
    duration: 0,
    createdTime: "",
    result: 0,
    userId: 0,
    weight: null,
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showMessage_2, setShowMessage_2] = useState(false);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowMessage(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setShowMessage(false);
    }, 1000);
    setTimeoutId(id);
  };
  const handleMouseEnter_2 = () => {
    clearTimeout(timeoutId_2);
    setShowMessage_2(true);
  };

  const handleMouseLeave_2 = () => {
    const id = setTimeout(() => {
      setShowMessage_2(false);
    }, 1000);
    setTimeoutId_2(id);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId_2);
    };
  }, [timeoutId_2]);

  const onInputChange = (e) => {
    setDiary({ ...diary, [e.target.name]: e.target.value });
  };

  const getAllWeightedDiaries = async () => {
    const response = await diaryService.getAllWeightedDiaries();
    setWeightDiaries(response.data);
  };

  const getAllExercisedDiaries = async () => {
    const response = await diaryService.getAllExercisedDiaries();
    setExerciseDiaries(response.data);
  };
  useEffect(() => {
    getAllWeightedDiaries();
    getAllExercisedDiaries();
  }, []);
  useEffect(() => {
    getAllWeightedDiaries();
    getAllExercisedDiaries();
  }, [diary.exerciseName]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onFinish_1();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal_2 = () => {
    setIsModalOpen_2(true);
  };

  const handleOk_2 = () => {
    setIsModalOpen_2(false);
    onFinish_2();
  };

  const handleCancel_2 = () => {
    setIsModalOpen_2(false);
  };

  const onFinish_1 = async () => {
    diary.exerciseName = "Kilogrami";
    const result = await diaryService.insertDiary(diary);
  };
  const onFinish_2 = async () => {
    const result = await diaryService.insertDiary(diary);
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const dates = weightDiaries.map((diary) => {
      const date = new Date(diary.createdTime);
      // Formatiranje datuma u format 'dd.mm.yyyy.'
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`;
    });
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Kilogrami",
            data: weightDiaries.map((diary) => diary.weight),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      newChartInstance.destroy();
    };
  }, [weightDiaries]);

  const columns = [
    {
      title: "Naziv",
      dataIndex: "exerciseName",
      key: "exerciseName",
    },
    {
      title: "Tezina(Kg)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Datum kreiranja",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (text, record) => {
        const date = new Date(text);
        return <span>{date.toLocaleDateString()}</span>;
      },
    },
  ];
  const columns_2 = [
    {
      title: "Naziv vjezbe",
      dataIndex: "exerciseName",
      key: "exerciseName",
    },
    {
      title: "Trajanje",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Datum kreiranja",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (text, record) => {
        const date = new Date(text);
        return <span>{date.toLocaleDateString()}</span>;
      },
    },
    {
      title: "Rezultat",
      dataIndex: "result",
      key: "result",
    },
  ];
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.text("Težina:", 10, y);
    weightDiaries.forEach((diary, index) => {
      const createdDate = new Date(diary.createdTime);

      // Dobijanje datuma u formatu "DD.MM.GGGG."
      const formattedDate = createdDate.toLocaleDateString("sr-RS");
      y += 10;
      doc.text(
        `${index + 1}. ${diary.weight}kg Datum: ${formattedDate} `,
        10,
        y
      );
    });

    y += 10;
    doc.text("Vežbe:", 10, y);
    exerciseDiaries.forEach((diary, index) => {
      const createdDate = new Date(diary.createdTime);

      // Dobijanje datuma u formatu "DD.MM.GGGG."
      const formattedDate = createdDate.toLocaleDateString("sr-RS");

      y += 10; // Povećaj y poziciju za svaki unos
      doc.text(
        ` ${diary.exerciseName} Kreirano: ${formattedDate} Trajanje: ${diary.duration} Rezultati: ${diary.result}`,
        10,
        y
      );
    });

    doc.save("dnevnikAktivnosti.pdf");
  };
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div>
        ;
        <div style={{ alignItems: "center", marginBottom: "10px" }}>
          <Table
            dataSource={weightDiaries}
            columns={columns}
            rowKey={(record) => record.id}
          />
          ;
          <Button type="primary" onClick={showModal}>
            {" "}
            Dodaj novu kilazu
          </Button>{" "}
        </div>
        <Table
          dataSource={exerciseDiaries}
          columns={columns_2}
          rowKey={(record) => record.id}
        />
        ;
        <Button type="primary" onClick={showModal_2}>
          {" "}
          Dodaj novu vjezbu{" "}
        </Button>{" "}
      </div>
      <Modal
        title="Dodaj novu kilazu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
            label="Kilaza (kg): "
            rules={[
              {
                required: true,
                message: "Treba popuniti sva polja",
              },
            ]}
          >
            <Input
              name="weight"
              value={diary.weight}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Dodaj rezultate o vjezbi:"
        open={isModalOpen_2}
        onOk={handleOk_2}
        onCancel={handleCancel_2}
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
            label="Naziv vjezbe: "
            rules={[
              {
                required: true,
                message: "Treba popuniti sva polja",
              },
            ]}
          >
            <Input
              name="exerciseName"
              value={diary.exerciseName}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
          {showMessage_2 && (
            <p style={{ marginTop: "5px" }}>
              Trajanje treninga (u minutima, ili broj serija u zavisnosti od
              tipa vjezbe):
            </p>
          )}
          <Form.Item
            label="Trajanje treninga: "
            onMouseEnter={handleMouseEnter_2}
            onMouseLeave={handleMouseLeave_2}
            style={{ cursor: "pointer" }}
            rules={[
              {
                required: true,
                message: "Treba popuniti sva polja",
              },
            ]}
          >
            <Input
              name="duration"
              value={diary.duration}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
          {showMessage && (
            <p style={{ marginTop: "5px" }}>
              Rezultati treninga (broj uradjenih ponavljanja u seriji ili broj
              minuta treninga izdrzljivosti)
            </p>
          )}
          <Form.Item
            label="Rezultati "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: "pointer" }}
            rules={[
              {
                required: true,
                message: "Treba popuniti sva polja",
              },
            ]}
          >
            <Input
              name="result"
              value={diary.result}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <canvas className="myChart" ref={chartRef} />
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
          <h1>Generisanje i preuzimanje PDF datoteke</h1>
          <Button
            type="primary"
            className="btn btn-primary col-3"
            onClick={handleDownloadPDF}
          >
            Preuzmi PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
