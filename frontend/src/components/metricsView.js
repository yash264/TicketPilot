import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line
} from "recharts";
import { getMetrics } from "../externalAPI/ticketAPI";

/* 🎨 Color Maps */
const CATEGORY_COLORS = {
  Billing: "#1677ff",
  Technical: "#52c41a",
  Sales: "#faad14",
  General: "#8c8c8c",
  Security: "#ff4d4f",
  Account: "#722ed1",
  Feature: "#13c2c2",
  Other: "#eb2f96"
};

const PRIORITY_COLORS = {
  High: "#ff4d4f",
  Medium: "#faad14",
  Low: "#52c41a"
};

const QUEUE_COLORS = [
  "#1677ff",
  "#52c41a",
  "#faad14",
  "#722ed1",
  "#13c2c2",
  "#eb2f96",
  "#fa541c",
  "#2f54eb"
];

const MetricsView = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getMetrics().then((res) => setMetrics(res.data));
  }, []);

  if (!metrics) return null;

  return (
    <>
      {/* Summary */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card title="Tickets This Week">
            <h2>{metrics.weeklyCount}</h2>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Tickets This Month">
            <h2>{metrics.monthlyCount}</h2>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={24}>
        {/* Category */}
        <Col span={8}>
          <Card title="By Category">
            <PieChart width={260} height={260}>
              <Pie
                data={metrics.byCategory}
                dataKey="count"
                nameKey="_id"
                outerRadius={90}
              >
                {metrics.byCategory.map((item, i) => (
                  <Cell
                    key={i}
                    fill={
                      CATEGORY_COLORS[item._id] ||
                      QUEUE_COLORS[i % QUEUE_COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>

        {/* Priority */}
        <Col span={8}>
          <Card title="By Priority">
            <BarChart
              width={260}
              height={260}
              data={metrics.byPriority}
            >
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count">
                {metrics.byPriority.map((item, i) => (
                  <Cell
                    key={i}
                    fill={PRIORITY_COLORS[item._id]}
                  />
                ))}
              </Bar>
            </BarChart>
          </Card>
        </Col>

        {/* Assigned Queue */}
        <Col span={8}>
          <Card title="By Assigned Queue">
            <BarChart
              width={260}
              height={260}
              data={metrics.byQueue}
            >
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count">
                {metrics.byQueue.map((_, i) => (
                  <Cell
                    key={i}
                    fill={QUEUE_COLORS[i % QUEUE_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </Card>
        </Col>
      </Row>

      {/* Trend */}
      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Last 7 Days Trend">
            <LineChart
              width={800}
              height={300}
              data={metrics.dailyTrend}
            >
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#1677ff"
                strokeWidth={2}
              />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MetricsView;


