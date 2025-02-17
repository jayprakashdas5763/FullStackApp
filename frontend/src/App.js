import { useState, useEffect } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import profilePic from "./assets/profile.jpg";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const addUser = async () => {
    if (!email || !name || !message) {
      setError("Please fill out all fields.");
      return;
    }

    setError(null); // Reset error
    try {
      const response = await axios.post("http://localhost:8080/user", { name, email, message });
      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      fetchUsers();
    } catch (error) {
      setError("Failed to send message.");
      console.error("Error adding user:", error);
    }
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Jayaprakash Das</h1>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Toggle Theme
        </button>
      </header>

      {/* Portfolio Section */}
      <section className="text-center mt-10">
        <img
          src={profilePic}
          alt="Jayaprakash Das"
          className="w-40 h-40 rounded-full mx-auto shadow-lg border-4 border-blue-500"
        />
        <h2 className="text-4xl font-bold mt-4">Jayaprakash Das</h2>
        <p className="mt-2 text-lg text-gray-400">MCA Student & Developer</p>
        <p className="mt-3 text-lg max-w-2xl mx-auto">
          Passionate about coding, development, and learning new technologies.
          Skilled in Java, web development, and problem-solving.
        </p>
      </section>

      {/* Social Links */}
      <section className="mt-10 text-center">
        <h3 className="text-2xl font-semibold">Find Me On</h3>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://github.com/jayprakashdas5763"
            target="_blank"
            className="text-3xl text-gray-400 hover:text-white"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/jayaprakashdas"
            target="_blank"
            className="text-3xl text-blue-400 hover:text-blue-600"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com/jayprakash_das_5763"
            target="_blank"
            className="text-3xl text-blue-300 hover:text-blue-500"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </section>

      {/* User Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4 text-black">Add a Message</h3>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

        <label className="block text-black font-semibold mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black"
        />

        <label className="block text-black font-semibold mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black"
        />

        <label className="block text-black font-semibold mb-1">Message</label>
        <textarea
          placeholder="Enter Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 mb-4 border rounded text-black"
        />

        <button
          onClick={addUser}
          className={`w-full py-2 rounded ${email ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          disabled={!email}
        >
          Add Message
        </button>
      </div>

      {/* User List */}
      <h2 className="text-xl font-semibold text-center mt-6">User List</h2>
      <ul className="w-full max-w-md mx-auto mt-3">
        {user?.length > 0 ? (
          user.map((user) => (
            <li
              key={user.id}
              className="bg-white p-3 rounded-lg shadow mb-2 text-black"
            >
              <span className="font-bold"> 👨🏻‍💻- {user.name}&nbsp; &nbsp; </span> 📧- {user.email} <br /> <br />
              💭{user.message && <span className="text-gray-600 mt-1 border-t pt-2">{user.message}</span>}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No user found.</p>
        )}
      </ul>
    </div>
  );
}
