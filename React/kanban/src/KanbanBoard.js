/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const newLocal = css`
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin: 0 1rem 1rem;
    `;
export default function KanbanBoard({ children }) {
  return (
    <main
      css={newLocal}
    >
      {children}
    </main>
  );
}
