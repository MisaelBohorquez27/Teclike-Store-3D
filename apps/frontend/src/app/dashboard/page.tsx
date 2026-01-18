"use client";

import React from "react";
import { useAuth } from "@/context/authcontext";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-10">Cargando...</div>;
  }

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mi Dashboard</h1>
        <p className="text-lg">Bienvenido, {user?.username}</p>
        
        {/* Contenido del dashboard aquí */}
      </div>
    </div>
  );
}
