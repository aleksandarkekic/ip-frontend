import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import commentService from "../services/commentService";
import ViewSingleComments from "../views/ViewSingleComment";
import { Modal, Button, Form, Input, message } from "antd";
const CommentComponent = (props) => {
  const [allComments, setComments] = useState([]);
  const [numOfComments, setnumb] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    text: "",
    deleted: false,
  });

  const { text, deleted } = data;
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getAllByProgramId();
    getNumOfComments();
  }, []);

  const getAllByProgramId = async () => {
    const respons = await commentService.getAllByProgramId(props.programId);
    setComments(respons.data);
  };

  const getNumOfComments = async () => {
    const respons = await commentService.getNumOfComments(props.programId);
    setnumb(respons.data);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onFinish();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (e) => {
    try {
      for (const key in data) {
        if (data[key] === "") {
          message.error("Potrebno je popuniti sva polja", 5);
          return;
        }
      }
      const response = await commentService.addComment(data, props.programId);
    } catch (error) {
      message.error("Doslo je do greske!");
    }
  };
  return (
    <div className="cardComments">
      <p>
        {" "}
        <b>Pitanja : </b>[{numOfComments}]
      </p>
      <Button onClick={showModal}> Postavi pitanje</Button>
      {allComments != null &&
        allComments != undefined &&
        allComments.map((comment) => (
          <ViewSingleComments
            key={comment.id}
            id={comment.id}
            createdTime={comment.createdTime}
            username={props.username}
            text={comment.text}
            deleted={comment.deleted}
            userId={comment.userId}
          />
        ))}

      <Modal
        title="Postavi pitanje"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="basic" labelAlign="center" autoComplete="off">
          <Form.Item
            label="text poruke: "
            rules={[
              {
                required: true,
                message: "Treba popuniti sva polja",
              },
            ]}
          >
            <Input
              name="text"
              value={text}
              onChange={(e) => onInputChange(e)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

CommentComponent.propTypes = {
  programId: PropTypes.number,
  username: PropTypes.string,
};
export default CommentComponent;
