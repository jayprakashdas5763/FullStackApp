import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user')
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user", error);
                setError("Failed to load user. Please try again later.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            {error && <p className="text-red-500">{error}</p>}
            {loading ? <p>Loading user...</p> : (
                user.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {user.map(user => (
                            <li key={user.id} className="mb-2">
                                <strong>{user.name}</strong> - {user.email} - {user.message}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No user found.</p>
                )
            )}
        </div>
    );
}

export default Home;
