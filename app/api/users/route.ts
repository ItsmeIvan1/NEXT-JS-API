import { NextResponse } from 'next/server';
import connection from '@/lib/db';

// Create a new user (POST)
export async function POST(req: Request) {
  const { name, email } = await req.json();
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const values = [name, email];
  await connection.execute(query, values);
  return NextResponse.json({ message: 'User created successfully' });
}

// Read all users (GET)
export async function GET() {
  const [rows] = await connection.execute('SELECT * FROM users');
  return NextResponse.json(rows);
}

// Update a user (PUT)
export async function PUT(req: Request) {
  const { id, name, email } = await req.json();
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  const values = [name, email, id];
  await connection.execute(query, values);
  return NextResponse.json({ message: 'User updated successfully' });
}


// Delete a user (DELETE)
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const query = 'DELETE FROM users WHERE id = ?';
  const values = [id];
  await connection.execute(query, values);
  return NextResponse.json({ message: 'User deleted successfully' });
}
