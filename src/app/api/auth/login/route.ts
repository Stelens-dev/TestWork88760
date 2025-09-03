import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

/*
  Emulate a database of users
  username: "TEfVzqMoE" password: TE*VzqMlE~c*oU|vq%6iGb@8
  username: "Ekoq6as"   password: Ekoq6as%d1Q|X|WQT0LB{~IL
*/
const users: User[] = [
  {
    id: 1,
    username: "TEfVzqMoE",
    name: "Haris",
    surname: "Buchanan",
    email: "user789@hotmail.com",
    password: "$2a$12$6KW6v10FHI9vlIh7Fj7DgOJXI/V70wlLubMquA9zE3ppHwvZixfKG",
  },
  {
    id: 2,
    username: "Ekoq6as",
    name: "Nicolas",
    surname: "Morgan",
    email: "user456@yahoo.com",
    password: "$2a$12$mILzxZ/YbN/a44/5.CdLxeT1aUbswyu.hlUX90K19Z7kw2eJ3lQjW",
  },
];

interface LoginRequest {
  username: string;
  password: string;
}

export const POST = async (req: Request) => {
  const { username, password }: LoginRequest = await req.json();

  // Find user
  const user = users.find((user) => user.username === username);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  // Generating JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  return NextResponse.json({
    token,
    name: user.name,
    surname: user.surname,
    email: user.email,
  });
};
