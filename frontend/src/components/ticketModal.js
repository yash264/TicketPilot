import { Modal, Form, Input, Button, message } from "antd";
import { createTicket } from "../externalAPI/ticketAPI";

const TicketModal = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const submitTicket = async () => {
    try {
      await createTicket(form.getFieldsValue());
      message.success("Ticket created successfully");
      form.resetFields();
      onClose();
    } catch {
      message.error("Failed to create ticket");
    }
  };

  const floatingWrapper = {
    position: "relative",
    marginBottom: 20
  };

  const floatingInput = {
    padding: "16px 12px 6px"
  };

  const floatingLabel = {
    position: "absolute",
    top: "50%",
    left: 12,
    transform: "translateY(-50%)",
    fontSize: 14,
    color: "#8c8c8c",
    background: "#fff",
    padding: "0 4px",
    pointerEvents: "none",
    transition: "all 0.2s ease"
  };

  return (
    <Modal
      title="Create Support Ticket"
      open={open}
      footer={null}
      onCancel={onClose}
      centered
    >
      <Form form={form} layout="vertical">
        {/* Title */}
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <div style={floatingWrapper}>
            <Input
              style={floatingInput}
              placeholder=" "
              onFocus={(e) =>
                (e.target.nextSibling.style =
                  "top:-6px;font-size:12px;color:#1677ff")
              }
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.nextSibling.style =
                    "top:50%;font-size:14px;color:#8c8c8c";
                }
              }}
            />
            <label style={floatingLabel}>Title</label>
          </div>
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Description is required" }
          ]}
        >
          <div style={floatingWrapper}>
            <Input.TextArea
              rows={4}
              style={floatingInput}
              placeholder=" "
              onFocus={(e) =>
                (e.target.nextSibling.style =
                  "top:-6px;font-size:12px;color:#1677ff")
              }
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.nextSibling.style =
                    "top:50%;font-size:14px;color:#8c8c8c";
                }
              }}
            />
            <label style={floatingLabel}>Description</label>
          </div>
        </Form.Item>

        {/* Centered Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: 24
          }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={submitTicket}>
            Submit Ticket
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TicketModal;

