import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

type LayoutPropsType = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="relative flex-1 overflow-y-auto z-10">
        <div className="flex flex-col mx-auto min-h-full px-6 py-16 max-w-7xl">
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#6B47ED",
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </div>
      </div>
    </div>
  );
};
