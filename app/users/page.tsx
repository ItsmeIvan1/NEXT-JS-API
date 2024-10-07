// Marking this component as a Client Component
"use client";

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Create a new user
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        throw new Error('Failed to create user');
      }
      setName('');
      setEmail('');
      await fetchUsers(); // Re-fetch users after creating a new user
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Start editing a user
  const editUser = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  // Update an existing user
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !name || !email) return;

    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingUser.id,
          name,
          email,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to update user');
      }
      setEditingUser(null);
      setName('');
      setEmail('');
      await fetchUsers(); // Re-fetch users after updating
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Delete a user
  const deleteUser = async (id: number) => {
    try {
      const res = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error('Failed to delete user');
      }
      await fetchUsers(); // Re-fetch users after deleting
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={editingUser ? updateUser : createUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingUser ? 'Update' : 'Create'} User</button>
        {editingUser && <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>}
      </form>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
