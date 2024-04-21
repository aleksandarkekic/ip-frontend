import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ChatUsers = (props) => {
  return (
    <div className="col-3">
      <div className="cardChat">
        <List
          className="demo-loadmore-list text-center"
          itemLayout="horizontal"
          dataSource={props.users}
          renderItem={(item) => (
            <List.Item
              onClick={() => props.onSelectUser(item.id)}
              style={
                props.receiverId === item.id
                  ? { backgroundColor: "#D0F4FF" }
                  : {}
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ marginLeft: "5px" }}
                  />
                }
                title={<p> {item.firstName + " " + item.lastName}</p>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default ChatUsers;
ChatUsers.propTypes = {
  users: PropTypes.array,
  receiverId: PropTypes.number,
  onSelectUser: PropTypes.func,
};
