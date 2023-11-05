import {
  CloseCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const EmployeeTable = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [search, setSearch] = useState("");
  const iconStyle = {
    transform: "rotate(90deg)",
  };

  const columns = [
    {
      title: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Employee ID</span>
          <Button
            size="small"
            style={{ background: "#e5e5e5" }}
            onClick={() => {
              fetchEmployees(
                search,
                "empId",
                sortOrder === "DESC" ? "ASC" : "DESC"
              );
              setSortColumn("empId");
              setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
            }}
          >
            <SwapOutlined style={iconStyle} />
          </Button>
        </div>
      ),
      dataIndex: "empId",
      key: "empId",
      width: "15%",
    },
    {
      title: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>First Name</span>
          <Button
            size="small"
            style={{ background: "#e5e5e5" }}
            onClick={() => {
              fetchEmployees(
                search,
                "firstName",
                sortOrder === "DESC" ? "ASC" : "DESC"
              );
              setSortColumn("firstName");
              setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
            }}
          >
            <SwapOutlined style={iconStyle} />
          </Button>
        </div>
      ),
      dataIndex: "firstName",
      key: "firstName",
      width: "24%",
      ellipsis: true,
    },
    {
      title: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Last Name</span>
          <Button
            size="small"
            style={{ background: "#e5e5e5" }}
            onClick={() => {
              fetchEmployees(
                search,
                "lastName",
                sortOrder === "DESC" ? "ASC" : "DESC"
              );
              setSortColumn("lastName");
              setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
            }}
          >
            <SwapOutlined style={iconStyle} />
          </Button>
        </div>
      ),
      dataIndex: "lastName",
      key: "lastName",
      width: "24%",
      ellipsis: true,
    },
    {
      title: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>City</span>
          <Button
            size="small"
            style={{ background: "#e5e5e5" }}
            onClick={() => {
              fetchEmployees(
                search,
                "city",
                sortOrder === "DESC" ? "ASC" : "DESC"
              );
              setSortColumn("city");
              setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
            }}
          >
            <SwapOutlined style={iconStyle} />
          </Button>
        </div>
      ),
      dataIndex: "city",
      key: "city",
      width: "24%",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            <EditOutlined />
          </Button>
          <Button type="primary" onClick={() => handleDelete(record.id)} danger>
            <DeleteOutlined />
          </Button>
        </span>
      ),
    },
  ];

  const fetchEmployees = useCallback(
    async (search, column, order) => {
      let url = `${baseUrl}/employees?search=${
        search ? search : ""
      }&sortColumn=${column}&sortOrder=${order}`;
      await axios
        .get(url)
        .then((response) => {
          if (response?.data?.data) {
            response.data.data = response.data.data.map((data) => {
              return {
                ...data,
                key: data.id,
              };
            });
            setDataSource(response.data.data);
          } else {
            setDataSource([]);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    },
    [baseUrl]
  );

  useEffect(() => {
    fetchEmployees(search, sortColumn, sortOrder);
  }, [fetchEmployees, search, sortColumn, sortOrder]);

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setIsEdit(false);
    setEmployee(null);
  };

  const onFinish = (values) => {
    setSubmitLoader(true);
    let url = `${baseUrl}/employee`;
    axios
      .post(url, values)
      .then((response) => {
        if (response?.data?.status === "success") {
          fetchEmployees(search, sortColumn, sortOrder);
          handleCancel();
          message.success(response.data.message);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
    setSubmitLoader(false);
  };

  const handleEdit = (id) => {
    let filteredEmployee = dataSource.find((data) => data.id === id);
    form.setFieldsValue({
      empId: filteredEmployee?.empId,
      firstName: filteredEmployee?.firstName,
      lastName: filteredEmployee?.lastName,
      city: filteredEmployee?.city,
    });
    setIsEdit(true);
    setEmployee(filteredEmployee);
    setOpen(true);
  };

  const updateEmployee = async (values) => {
    setSubmitLoader(true);
    let url = `${baseUrl}/employee/${employee?.id}`;
    axios
      .put(url, values)
      .then((response) => {
        if (response?.data?.status === "success") {
          fetchEmployees(search, sortColumn, sortOrder);
          handleCancel();
          message.success(response.data.message);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
    setSubmitLoader(false);
  };

  const handleDelete = async (id) => {
    let url = `${baseUrl}/employee/${id}`;
    await axios
      .delete(url)
      .then((response) => {
        if (response?.data?.status === "success") {
          fetchEmployees(search, sortColumn, sortOrder);
          message.success(response.data.message);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Search here"
          size="large"
          loading={false}
          style={{ width: "50%", position: "absolute" }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchEmployees(e.target.value, sortColumn, sortOrder);
          }}
        />

        <CloseCircleTwoTone
          onClick={() => {
            setSearch("");
            fetchEmployees("", sortColumn, sortOrder);
          }}
          style={{
            position: "relative",
            left: "50%",
            visibility: search ? "visible" : "hidden",
          }}
        />

        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsEdit(false);
            setEmployee(null);
            form.setFieldsValue({ firstName: "", lastName: "", city: "" });
            setOpen(true);
          }}
        >
          + Add
        </Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ y: 465 }}
        bordered
        components={{
          header: {
            cell: (props) => (
              <th style={{ background: "#e5e5e5" }}>{props.children}</th>
            ),
          },
        }}
      />

      <Modal
        title={isEdit ? "Edit Employee" : "Add Employee"}
        open={open}
        onCancel={handleCancel}
        footer={false}
        maskClosable={false}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          style={{
            maxWidth: 600,
            margin: 0,
            padding: 0,
          }}
          initialValues={
            isEdit
              ? {
                  empId: employee?.empId || "",
                  firstName: employee?.firstName || "",
                  lastName: employee?.lastName || "",
                  city: employee?.city || "",
                }
              : {
                  firstName: "",
                  lastName: "",
                  city: "",
                }
          }
          onFinish={isEdit ? updateEmployee : onFinish}
          autoComplete="off"
          form={form}
        >
          {isEdit && (
            <Form.Item label="Employee ID" name="empId">
              <Input disabled />
            </Form.Item>
          )}

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
              {
                validator: (rule, value) => {
                  if (value && value.trim() === "") {
                    return Promise.reject(
                      "First name cannot be just empty spaces."
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
              {
                validator: (rule, value) => {
                  if (value && value.trim() === "") {
                    return Promise.reject(
                      "Last name cannot be just empty spaces."
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
              {
                validator: (rule, value) => {
                  if (value && value.trim() === "") {
                    return Promise.reject("City cannot be just empty spaces.");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 14,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitLoader}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeTable;
