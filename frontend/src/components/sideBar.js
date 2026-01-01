import { Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined
} from "@ant-design/icons";

const Sidebar = ({ activeTab, onChange }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        onClick={(e) => onChange(e.key)}
        items={[
          {
            key: "tickets",
            icon: <AppstoreOutlined />,
            label: "Tickets"
          },
          {
            key: "metrics",
            icon: <BarChartOutlined />,
            label: "Metrics"
          }
        ]}
        style={{ flex: 1 }}
      />

      {/* Bottom Branding */}
      <div
        style={{
          textAlign: "center",
          padding: 12,
          borderTop: "1px solid #333",
          color: "#aaa",
          fontWeight: "bold"
        }}
      >
        TicketPilot 🚀
      </div>
    </div>
  );
};

export default Sidebar;
