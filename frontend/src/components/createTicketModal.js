import { Modal, Form, Input, message } from "antd";
import { createTicket } from "../externalAPI/ticketAPI";

const CreateTicketModal = ({ open, onClose }) => {
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

  return (
    <Modal
      title="Create Support Ticket"
      open={open}
      onOk={submitTicket}
      onCancel={onClose}
      okText="Submit"
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="title" label="Title" required>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description" required>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTicketModal;
