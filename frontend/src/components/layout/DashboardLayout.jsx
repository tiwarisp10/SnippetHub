import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import CreateSnippetModal from "../snippets/CreateSnippetModal";

import { SIDEBAR_WIDTH } from "../../constants/layout";

export default function DashboardLayout({ children }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div
        className="min-h-screen"
        style={{
          marginLeft: SIDEBAR_WIDTH,
        }}
      >
        <Navbar
          onCreate={() => setOpenModal(true)}
        />

        <main className="p-8">
          {children}
        </main>
      </div>

      <CreateSnippetModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={() => {
          setOpenModal(false);

          window.location.reload();
        }}
      />

    </div>
  );
}