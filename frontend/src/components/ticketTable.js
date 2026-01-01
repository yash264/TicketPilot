import { Table, Select, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { getTickets, updateTicketStatus } from "../externalAPI/ticketAPI";

const TicketTable = ({ search, category }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    const res = await getTickets();
    setTickets(
      Array.isArray(res.data.value) ? res.data.value : []
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || t.category === category;

    return matchesSearch && matchesCategory;
  });

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
      // ellipsis: true
    },

    /* ✅ Category – single clean color */
    {
      title: "Category",
      dataIndex: "category",
      width: 130,
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
      title: "Description",
      dataIndex: "description",
      width: 260,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      )
    },

    /* ✅ Status – colored */
    {
      title: "Status",
      fixed: "right",
      width: 150,
      render: (_, record) => {
        const isOpen = record.status === "Open";

        return (
          <Select
            value={record.status}
            style={{
              width: 120,
              backgroundColor: isOpen ? "#4ade80" : "#fb7185",
              borderRadius: 6,
            }}
            onChange={(value) =>
              updateTicketStatus(record._id, value).then(fetchTickets)
            }
            options={[
              {
                value: "Open",
                label: <span className="text-green-900 font-medium">Open</span>,
              },
              {
                value: "Closed",
                label: <span className="text-rose-900 font-medium">Closed</span>,
              },
            ]}
          />
        );
      },
    }
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={filtered}
      loading={loading}
      bordered
      pagination={{ pageSize: 5 }}
      scroll={{ x: 1300 }}
    />
  );
};

export default TicketTable;


