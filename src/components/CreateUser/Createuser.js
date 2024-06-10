import { React, useState } from "react";
import { Input, Typography, Modal, message, Space } from "antd";
import "./Createuser.css";
import { addUser } from "../../redux/actions/userListActions";
import { useDispatch } from "react-redux";

const Createuser = ({ isModalOpen, handleCancel }) => {
  const { TextArea } = Input;
  const { Text } = Typography;
  const dispatch = useDispatch();

  //Regular expression for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  //Component Usestates
  const initialUserData = {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const [userData, setUserData] = useState(initialUserData);

  const [userErrors, setUserErrors] = useState({});

  //Antd Success msg
  const [messageApi, contextHolder] = message.useMessage();
  const openNotificationWithIcon = (type) => {
    messageApi[type]({
      type: "success",
      content: "You have successfully created a user",
    });
  };

  //Function to grab the values present in the form
  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
    setUserErrors({
      ...userErrors,
      [name]: "",
    });
  };

  //Function to handle the form validation
  const handleValidation = () => {
    let isValid = true;
    let errors = {};
    if (!userData.name) {
      isValid = false;
      errors["name"] = "Please enter name";
    }
    if (!userData.email) {
      isValid = false;
      errors["email"] = "Please enter email";
    } else if (!userData.email.match(emailRegex)) {
      isValid = false;
      errors["email"] = "Please enter a valid email";
    }
    if (!userData.phone) {
      isValid = false;
      errors["phone"] = "Please enter phone";
    } else if (!userData.phone.match(phoneRegex)) {
      isValid = false;
      errors["phone"] = "Please enter valid phone";
    }
    if (!userData.address) {
      isValid = false;
      errors["address"] = "Please enter address";
    }
    setUserErrors(errors);
    return isValid;
  };

  //Function to handle the form submit
  const handleOk = () => {
    if (handleValidation()) {
      userData["id"] = new Date().valueOf();
      dispatch(addUser(userData));
      handleCancel();
      openNotificationWithIcon("success");
      setUserData(initialUserData);
    } else {
      return false;
    }
  };

  const handleCancelModal = () => {
    setUserData(initialUserData);
    handleCancel();
  };
  return (
    <>
      {contextHolder}
      <Space>
        <Modal
          title="Create User"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancelModal}
        >
          <div className="create-user-section">
            <div>
              <Typography>Name</Typography>
              <Input
                placeholder="Name"
                name="name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={userData.name}
              />
              {userErrors && userErrors.name && (
                <Text type="danger">{userErrors.name}</Text>
              )}
            </div>
            <div>
              <Typography>Email</Typography>
              <Input
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="email"
                value={userData.email}
              />
              {userErrors && userErrors.email && (
                <Text type="danger">{userErrors.email}</Text>
              )}
            </div>
            <div>
              <Typography>Phone</Typography>
              <Input
                placeholder="Phone"
                name="phone"
                onChange={(e) => {
                  //Restricting user to add only 10 digits in the input field
                  let value = e.target.value.replace(/\D/g, "");

                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  e.target.value = value;
                  handleChange(e.target.name, value);
                }}
                onKeyPress={(e) => {
                  //Restricting user to add only numbers in the field
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                maxLength={10}
                value={userData.phone}
              />
              {userErrors && userErrors.phone && (
                <Text type="danger">{userErrors.phone}</Text>
              )}
            </div>
            <div>
              <Typography>Address</Typography>
              <TextArea
                rows={4}
                name="address"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={userData.address}
                placeholder="Address"
              />
              {userErrors && userErrors.address && (
                <Text type="danger">{userErrors.address}</Text>
              )}
            </div>
          </div>
        </Modal>
      </Space>
    </>
  );
};

export default Createuser;
