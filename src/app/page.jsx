"use client";

import { Layout } from "@/components/Layout";
import { Switch, Typography, Radio, Checkbox, Button, Space } from "antd";
import { useState, useEffect } from "react";
import { TOOLS_LIST } from "@/data/toolsList";
import "./globals.css";

export default function Home() {
  const [isEditable, setIsEditable] = useState(true);
  const [selectedTools, setSelectedTools] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    isProficient: false,
    toolsUsed: "0,2,3,4",
  });

  useEffect(() => {
    const selectedIndices = user.toolsUsed
      .split(",")
      .map((index) => parseInt(index, 10));
    const selectedValues = selectedIndices
      .map((index) => TOOLS_LIST[index]?.value)
      .filter(Boolean);

    setSelectedTools(selectedValues);
  }, [user.toolsUsed]);

  const handleUserOnChange = (e) => {
    if (e.target && e.target.id === "first_name_input") {
      setUser({ ...user, firstName: e.target.value });
    }

    if (e.target && e.target.name === "isProficient") {
      setUser({ ...user, isProficient: e.target.value === "yes" });
    }

    if (Array.isArray(e)) {
      const toolsIndices = e.map((value) =>
        TOOLS_LIST.findIndex((tool) => tool.value === value)
      );
      setUser({ ...user, toolsUsed: toolsIndices.join(",") });
    }
  };

  const handleUserOnClick = () => {
    console.log(user);
  };

  return (
    <Layout>
      <div className="flex flex-col max-w-[360px] border border-black rounded-xl p-5 bg-white">
        <div className="flex items-center justify-between">
          <Typography.Text>Editable</Typography.Text>
          <Switch
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
          />
        </div>

        <div className="relative">
          <input
            type="text"
            id="first_name_input"
            className="first-name-input mt-4 block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm 
            hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border peer
            disabled:border-slate-50"
            placeholder=""
            onChange={handleUserOnChange}
            value={user.firstName}
            disabled={!isEditable}
          />
          <label
            htmlFor="first_name_input"
            className="mt-4 absolute text-sm text-gray-500 duration-300 transform 
            -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
            rtl:peer-focus:left-auto"
          >
            First Name
          </label>
        </div>

        <div className="flex flex-col">
          <Typography.Title level={5} className="pt-4">
            Are you proficient in ReactJS development?
          </Typography.Title>
          <Radio.Group
            name="isProficient"
            onChange={handleUserOnChange}
            value={user.isProficient ? "yes" : "no"}
            disabled={!isEditable}
          >
            <Space direction="vertical">
              <Radio value="no">No</Radio>
              <Radio value="yes">Yes</Radio>
            </Space>
          </Radio.Group>
        </div>

        <Typography.Title
          level={5}
          className="pt-4"
          style={{ marginBottom: 0 }}
        >
          Which tools do you use?
        </Typography.Title>
        <Typography.Text className="mt-0 mb-4 text-gray-500">
          Please select all that apply.
        </Typography.Text>
        <Checkbox.Group
          className="flex flex-col gap-4 appearance-none rounded-full"
          options={TOOLS_LIST}
          onChange={handleUserOnChange}
          disabled={!isEditable}
          value={selectedTools}
        />
        <div className="w-full flex justify-center pt-10">
          <Button
            type="primary"
            size="large"
            shape="round"
            className="w-40"
            disabled={!isEditable}
            onClick={handleUserOnClick}
          >
            Process
          </Button>
        </div>
      </div>
    </Layout>
  );
}
