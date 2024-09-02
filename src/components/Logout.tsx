"use client";
import { URL } from "@/constant/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { setCookie } from 'nookies';
function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post(`${URL}/users/signout`, {}, { withCredentials: true });
      setCookie(null, 'authToken', '', {
        maxAge: -1, 
        path: '/', 
        secure: location.protocol === 'https:',
        sameSite: 'lax',
      });
    router.push("/signin");
  };
  return (
    <button
      onClick={handleLogout}
      className="p-2 text-sm  bg-secondary-foregound rounded-[0.2rem]"
    >
      Logout
    </button>
  );
}

export default Logout;
