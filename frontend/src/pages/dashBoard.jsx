import { Layout, Input, Button, Drawer, Grid, Select } from "antd";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

import Sidebar from "../components/sideBar";
import TicketTable from "../components/ticketTable";
import TicketModal from "../components/ticketModal";
import MetricsView from "../components/metricsView";

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

const CATEGORIES = [
  "Billing Problem",
  "Payments",
  "Technical Issue",
  "Account / Login",
  "Sales Inquiry",
  "Feature Request",
  "Bug Report",
  "General Question"
];

const DashBoard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [activeTab, setActiveTab] = useState("tickets");
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [category, setCategory] = useState("All");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider collapsible collapsedWidth={80}>
          <div
            style={{
              height: 64,
              background: "linear-gradient(135deg, #fbbf24, #f97316)", // gold → orange
              color: "#ffffff",
              fontSize: 20,
              textAlign: "center",
              lineHeight: "64px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textShadow: "0 2px 4px rgba(0,0,0,0.35)",
              boxShadow: "0 6px 20px rgba(249,115,22,0.45)",
            }}
          >
            Ticket Pilot
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
            style={{ maxWidth: 300, flex: 1 }}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <Select
            value={category}
            style={{ width: 180 }}
            onChange={setCategory}
          >
            <Select.Option value="All">
              All Categories
            </Select.Option>

            {CATEGORIES.map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>


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
            <TicketTable
              search={search}
              category={category}
            />
          )}
          {activeTab === "metrics" && <MetricsView />}
        </Content>
      </Layout>

      <TicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Layout>
  );
};

export default DashBoard;

