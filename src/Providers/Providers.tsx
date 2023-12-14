import React from "react";
import NoteProvider from "../context/NoteContext.";
import TodoProvider from "../Context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoteProvider>
        <TodoProvider>{children}</TodoProvider>
      </NoteProvider>
    </>
  );
}
