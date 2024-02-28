import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="relative flex-1 overflow-y-auto z-10">
        <div className="flex flex-col mx-auto min-h-full px-6 py-16 max-w-7xl">
          <AntdRegistry>{children}</AntdRegistry>
        </div>
      </div>
    </div>
  );
};
