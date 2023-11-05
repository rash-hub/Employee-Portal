import { Layout, Space } from "antd";
import EmployeeTable from "./components/EmployeeTable";
import { Content, Header } from "antd/es/layout/layout";
function App() {
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#121012",
    fontWeight: "bold",
  };
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "f2eee7",
    padding: "20px 30px",
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      <Layout>
        <Header style={headerStyle}>Employee Portal</Header>
        <Content style={contentStyle}>
          <EmployeeTable />
        </Content>
      </Layout>
    </Space>
  );
}

export default App;
