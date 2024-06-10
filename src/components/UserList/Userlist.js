import React, { useState } from "react";
import "./Userlist.css";
import { Input, Button, Table, Popconfirm, Typography } from "antd";
import {
  DeleteTwoTone,
  InfoCircleTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../redux/actions/userListActions";
import Createuser from "../CreateUser/Createuser";
import { Link } from "react-router-dom";

const Userlist = () => {
  const { Search } = Input;
  const { Title } = Typography;

  //To get the reducer state
  const { userList } = useSelector((state) => state.userList);

  //To dispatch the actions
  const dispatch = useDispatch();

  //Columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (index, data) => (
        <div className="action-buttons">
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteUser(data.id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
          <Link to={"/user-details"} state={{ user: data }}>
            <InfoCircleTwoTone />
          </Link>
        </div>
      ),
    },
  ];

  //Usestate of the components

  const [searchList, setSearchList] = useState([]);
  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    currentPage: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Function to search
  const handleSearch = (searchText) => {
    const data =
      userList &&
      userList.filter((list) =>
        list.email.toLowerCase().includes(searchText.toLowerCase())
      );
    setSearchList(data || []);
  };

  //Function to change the pagination
  const handleTableChange = (pagination) => {
    setTableParams({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
    });
  };

  //Funtion to delete user
  const handleDeleteUser = (id) => {
    const deletedData = userList.filter((list) => list.id !== id);
    dispatch(deleteUser(deletedData));
  };

  //Function to open create user modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  //Function to cancel the create user modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="userlist-main">
      <Title className="list-title">Volga Infotech</Title>
      <div className="search-bar">
        <Search
          placeholder="Search by Email Address"
          className="search-input"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button type="primary" onClick={showModal}>
          <PlusCircleTwoTone />
          Create
        </Button>
      </div>
      <div className="user-table">
        <Table
          dataSource={searchList.length > 0 ? searchList : userList}
          columns={columns}
          pagination={{
            pageSize: tableParams.pageSize,
            current: tableParams.currentPage,
          }}
          onChange={handleTableChange}
        />
      </div>
      <Createuser isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default Userlist;
