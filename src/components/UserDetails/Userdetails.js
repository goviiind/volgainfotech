import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Typography } from "antd";
import "./Userdetails.css";

const Userdetails = (props) => {
  const location = useLocation();
  const { user } = location.state || {};
  const { Title } = Typography;
  return (
    <div className="user-details-main">
      <Title className="detail-heading" level={1}>
        User Details
      </Title>
      <Title level={3}>Name : {user.name}</Title>
      <Title level={3}>Email : {user.email}</Title>
      <Title level={3}>Phone : {user.phone}</Title>
      <Title level={3}>Address : {user.address}</Title>
      <Link to={"/"}>
        <Button type="primary" size="large" className="back-btn">
          Back
        </Button>
      </Link>
    </div>
  );
};

export default Userdetails;
