"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import Image from "next/image";

interface User {
  id: number;
  username: string;
  public_key_x: string;
  public_key_y: string;
}

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    api
      .get("/api/me")
      .then((res) => setCurrentUser(res.data))
      .catch(() => setAuthFailed(true));
  }, []);

  if (!authFailed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-rose-500 p-6">
        <Card className="w-full max-w-xl rounded-xl shadow-xl shadow-rose-500/20">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold text-blue-600">
              Welcome to AxoSharkPing!
            </CardTitle>
            <Image
              src="/team.png"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto my-4 rounded-4xl shadow-lg"
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-6 items-center">
            <p className="text-center text-gray-600 max-w-md">
              A secure and fun messaging experience, protected by cryptography and inspired by the power of Axolotls, Sharks, and Penguins.
            </p>
            <div className="flex flex-col justify-center items-center gap-4 w-full max-w-sm">
                <h1 className="text-2xl font-bold">Welcome back,</h1> 
                <h1 className="text-blue-600 text-6xl font-bold">{currentUser?.username}</h1> 
                <h1 className="text-blue-600 text-6xl font-bold">👋 </h1>
                <Button className="w-full" variant="default" onClick={() => router.push("/chatroom")}>Start chatting now!</Button>
                <Button className="w-full" variant="outline" onClick={() => router.push("/register")}>Register</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-rose-500 p-6">
        <Card className="w-full max-w-xl rounded-xl shadow-xl shadow-rose-500/20">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold text-blue-600">
              Welcome to AxoSharkPing!
            </CardTitle>
            <Image
              src="/team.png"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto my-4 rounded-4xl shadow-lg"
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-6 items-center">
            <p className="text-center text-gray-600 max-w-md">
              A secure and fun messaging experience, protected by cryptography and inspired by the power of Axolotls, Sharks, and Penguins.
            </p>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Button variant="default" onClick={() => router.push("/login")}>Login</Button>
              <Button variant="outline" onClick={() => router.push("/register")}>Register</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}