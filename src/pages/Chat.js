import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ChatUsers from "../components/ChatUsers";
import chatService from "../services/chatService";
import { List, Input, Button } from "antd";
import Message from "../components/ChatMessage";
import { SendOutlined } from "@ant-design/icons";
import userService from "../services/userService";
export default function Chat() {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [text, setText] = useState("");

  useEffect(() => {
    loadUser();
    loadCurrentUser();
  }, []);
  const loadUser = () => {
    userService.findAllUsersWithRoleUser().then((result) => {
      console.log(result.data);
      setUsers(result.data);
    });
  };
  const onSelectUser = (userId) => {
    setReceiverId(userId);
    chatService.getChat(userId).then((result) => {
      console.log(result.data);
      setMessages(result.data);
    });
    console.log(userId + "User ID");
  };

  const loadCurrentUser = () => {
    userService.getCurrentUserInfo().then((result) => {
      setCurrentUser(result.data);
    });
  };

  const getMessageType = (message) => {
    if (message.senderId === currentUser.id) {
      return "sent";
    } else {
      return "received";
    }
  };
  const handleSendText = () => {
    if (text !== "") {
      const messageRequest = {
        text: text,
        receiverId: receiverId,
      };

      chatService.sendMessage(messageRequest);
    }
    setText("");
    console.log("Message sent!");
  };
  return (
    <Grid alignItems="center" justifyContent="center">
      <div className="container">
        <div className="rom ">
          <div className="col-md-11 offset-md-0 border rounder p-4 mt-2 shadow  ">
            <h2 className="text-center m-4">CHAT</h2>

            <div className="cardChat" style={{ backgroundColor: "#F5F5F5" }}>
              <div className="card-header" style={{ display: "flex" }}>
                <ChatUsers
                  users={users}
                  onSelectUser={onSelectUser}
                  receiverId={receiverId}
                ></ChatUsers>
                {messages.length !== 0 ? (
                  <span
                    className="col-9"
                    style={{ height: "500px", overflowY: "scroll" }}
                  >
                    <List
                      className="demo-loadmore-list text-center"
                      itemLayout="horizontal"
                      dataSource={messages}
                      backgroundColor="#FFF4D0"
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            border: "none",
                            alignItems:
                              getMessageType(item) === "sent" ? "np" : "left",
                          }}
                        >
                          <Message
                            content={item.text}
                            type={getMessageType(item)}
                          />
                        </List.Item>
                      )}
                    />
                  </span>
                ) : null}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginLeft: "240px" }}>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPressEnter={handleSendText}
                    style={{
                      width: "500px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      borderColor: "#377CAA",
                    }}
                  />
                </div>
                <Button
                  icon={<SendOutlined />}
                  onClick={() => handleSendText()}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}
