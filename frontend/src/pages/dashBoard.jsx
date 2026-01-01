import {
    Layout,
    Input,
    Button,
    Drawer,
    Grid
  } from "antd";
  import {
    PlusOutlined,
    MenuOutlined
  } from "@ant-design/icons";
  import { useState } from "react";
  
  import Sidebar from "../components/sideBar";
  import TicketTable from "../components/ticketTable";
  import CreateTicketModal from "../components/createTicketModal";
  import MetricsView from "../components/metricsView";
  
  const { Sider, Header, Content } = Layout;
  const { useBreakpoint } = Grid;
  
  const DashBoard = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
  
    const [activeTab, setActiveTab] = useState("tickets");
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sider collapsible collapsedWidth={80}>
            <div
              style={{
                height: 64,
                color: "#fff",
                fontSize: 18,
                textAlign: "center",
                lineHeight: "64px",
                fontWeight: "bold"
              }}
            >
              TP
            </div>
  
            <Sidebar
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </Sider>
        )}
  
        {/* Mobile Sidebar */}
        {isMobile && (
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            placement="left"
            width="100%"
            bodyStyle={{ padding: 0 }}
          >
            <Sidebar
              activeTab={activeTab}
              onChange={(key) => {
                setActiveTab(key);
                setDrawerOpen(false);
              }}
            />
          </Drawer>
        )}
  
        <Layout>
          {/* Header */}
          <Header
            style={{
              background: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 16px"
            }}
          >
            {isMobile && (
              <Button
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
              />
            )}
  
            <Input.Search
              placeholder="Search tickets..."
              style={{ maxWidth: 400, flex: 1 }}
              onChange={(e) => setSearch(e.target.value)}
            />
  
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
            >
              {!isMobile && "Create Ticket"}
            </Button>
          </Header>
  
          {/* Content */}
          <Content style={{ margin: 16, overflowX: "auto" }}>
            {activeTab === "tickets" && (
              <TicketTable search={search} />
            )}
            {activeTab === "metrics" && <MetricsView />}
          </Content>
        </Layout>
  
        <CreateTicketModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </Layout>
    );
  };
  
  export default DashBoard;
  