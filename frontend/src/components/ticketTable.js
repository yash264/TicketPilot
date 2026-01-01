import { Table, Select, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { getTickets, updateTicketStatus } from "../externalAPI/ticketAPI";

const TicketTable = ({ search }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    const res = await getTickets();
    setTickets(Array.isArray(res.data.value) ? res.data.value : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filtered = tickets.filter(
    (t) =>
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      width: 120,
      render: (id) => <Tag color="geekblue">{id}</Tag>
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 180,
      ellipsis: true
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 260,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      )
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 120,
      render: (v) => <Tag color="blue">{v}</Tag>
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 120,
      render: (v) => (
        <Tag
          color={
            v === "High"
              ? "red"
              : v === "Medium"
              ? "orange"
              : "green"
          }
        >
          {v}
        </Tag>
      )
    },
    {
      title: "Assigned Queue",
      dataIndex: "assignedQueue",
      width: 160
    },
    {
      title: "Created (IST)",
      dataIndex: "createdAt",
      width: 170,
      render: (date) =>
        moment(date)
          .utcOffset("+05:30")
          .format("DD MMM YYYY, hh:mm A")
    },
    {
      title: "Status",
      fixed: "right",
      width: 140,
      render: (_, record) => (
        <Select
          value={record.status}
          style={{ width: 120 }}
          onChange={(value) =>
            updateTicketStatus(record._id, value).then(fetchTickets)
          }
          options={[
            { value: "Open", label: "Open" },
            { value: "Closed", label: "Closed" }
          ]}
        />
      )
    }
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={filtered}
      loading={loading}
      bordered
      pagination={{ pageSize: 6 }}
      scroll={{ x: 1300 }}
    />
  );
};

export default TicketTable;

