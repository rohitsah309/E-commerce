import { useState } from "react";
import Mail from "lucide-react/dist/esm/icons/mail";
import Phone from "lucide-react/dist/esm/icons/phone";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Send from "lucide-react/dist/esm/icons/send";
import PageWrapper from "../components/UI/PageWrapper";
import "./contact.css";

const contactInfo = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "support@voltex.com",
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+91 7742913873",
  },
  {
    icon: <MapPin size={20} />,
    label: "Address",
    value: "123 Tech Avenue, San Francisco, CA 94102",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setLoading(true);
    setStatus(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setStatus({ type: "success", message: "Message sent! We'll get back to you soon." });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageWrapper>
      <section className="contact-section">
        <div className="contact-wrapper">
          <div className="contact-form-side">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">Have a question? We&apos;d love to hear from you.</p>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              />

              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                rows={6}
              />

              {status && (
                <p className={`form-status ${status.type}`}>{status.message}</p>
              )}

              <button type="submit" className="send-btn" disabled={loading}>
                <Send size={16} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="contact-info-side">
            {contactInfo.map(({ icon, label, value }) => (
              <div className="info-card" key={label}>
                <div className="info-icon">{icon}</div>
                <div>
                  <p className="info-label">{label}</p>
                  <p className="info-value">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Contact;
