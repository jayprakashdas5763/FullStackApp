import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        axios.post("http://localhost:8080/api/user", { name, email, message })
            .then(response => {
                setSuccess("User added successfully!");
                setName("");
                setEmail("");
                setMessage("");
                console.log("User Added", response);
            })
            .catch(error => {
                setError("Error adding user. Please try again later.");
                console.error("Error adding user", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add User</h2>

            {/* Success or error messages */}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full p-2 rounded ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add User"}
                </button>
            </form>
        </div>
    );
}

export default UserForm;
