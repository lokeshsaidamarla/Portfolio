import emailjs from "@emailjs/browser"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import ScrollFloat from "./reactbit/ScrollFloat";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSending(true);
      emailjs
        .send("service_msi8f1f", "template_9z9usxe", formData, "h_02gm6x0awX1VmLu")
        .then(() => {
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        })
        .catch((error) => {
          console.log("FAILED...", error);
          toast.error("Failed to send message. Please try again.");
        })
        .finally(() => setIsSending(false));
    }
  };

  const inputBase = {
    background: "transparent",
    border: "none",
    borderBottom: "0.5px solid #2a2a2a",
    color: "#facc15",
    fontSize: 13,
    fontFamily: "monospace",
    padding: "4px 0 8px",
    outline: "none",
    caretColor: "#4ade80",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div className="p-4 w-full max-w-2xl mx-auto" id="contact">
      <Toaster />

      {/* Fix autofill white bg globally for this component */}
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px #0d0d0d inset !important;
          -webkit-text-fill-color: #facc15 !important;
          caret-color: #4ade80;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* ── Heading ── */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center text-3xl lg:text-4xl"
        style={{ fontFamily: "Roboto Flex", fontWeight: 600, letterSpacing: "0.08em" }}
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          LET'S CONNECT
        </ScrollFloat>
      </motion.h2>

      {/* ── Terminal panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          background: "#0d0d0d",
          border: "0.5px solid #2a2a2a",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "#161616",
            borderBottom: "0.5px solid #222",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#444", marginLeft: 8 }}>contact.sh</span>
        </div>

        {/* Terminal body */}
        <form onSubmit={handleSubmit} style={{ padding: "20px 24px 8px", fontFamily: "monospace" }}>

          {/* Name */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <span style={{ color: "#4ade80" }}>lokesh</span>
              <span style={{ color: "#555" }}>@portfolio</span>
              <span style={{ color: "#888" }}>:~$</span>
              <span style={{ color: "#ccc" }}> ./contact --name</span>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name here"
              autoComplete="off"
              style={{
                ...inputBase,
                borderBottomColor: errors.name ? "#e24b4a" : "#2a2a2a",
              }}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 11, color: "#e24b4a", margin: "4px 0 0", fontFamily: "monospace" }}
              >
                # {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <span style={{ color: "#4ade80" }}>lokesh</span>
              <span style={{ color: "#555" }}>@portfolio</span>
              <span style={{ color: "#888" }}>:~$</span>
              <span style={{ color: "#ccc" }}> ./contact --email</span>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              autoComplete="off"
              style={{
                ...inputBase,
                borderBottomColor: errors.email ? "#e24b4a" : "#2a2a2a",
              }}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 11, color: "#e24b4a", margin: "4px 0 0", fontFamily: "monospace" }}
              >
                # {errors.email}
              </motion.p>
            )}
          </div>

          {/* Message */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <span style={{ color: "#4ade80" }}>lokesh</span>
              <span style={{ color: "#555" }}>@portfolio</span>
              <span style={{ color: "#888" }}>:~$</span>
              <span style={{ color: "#ccc" }}> ./contact --message</span>
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={4}
              style={{
                ...inputBase,
                resize: "none",
                borderBottomColor: errors.message ? "#e24b4a" : "#2a2a2a",
              }}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 11, color: "#e24b4a", margin: "4px 0 0", fontFamily: "monospace" }}
              >
                # {errors.message}
              </motion.p>
            )}
          </div>

          {/* Prompt line + cursor */}
          <div style={{ fontSize: 13, lineHeight: 2.5, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#4ade80" }}>lokesh</span>
            <span style={{ color: "#555" }}>@portfolio</span>
            <span style={{ color: "#888" }}>:~$</span>
            <span style={{ color: "#ccc" }}> send_message</span>
            {!isSending && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 14,
                  background: "#4ade80",
                  verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }}
              />
            )}
          </div>

          {/* Submit */}
          <div style={{ padding: "12px 0 20px" }}>
            <button
              type="submit"
              disabled={isSending}
              style={{
                background: isSending ? "transparent" : "#4ade80",
                border: isSending ? "0.5px solid #2a2a2a" : "none",
                borderRadius: 6,
                padding: "10px 28px",
                fontSize: 13,
                fontWeight: 600,
                color: isSending ? "#555" : "#0a0a0a",
                cursor: isSending ? "not-allowed" : "pointer",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                opacity: isSending ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              {isSending ? "$ sending..." : "$ execute"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;