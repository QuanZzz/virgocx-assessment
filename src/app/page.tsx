"use client";

import { Layout } from "@/components/Layout";
import { Switch, Typography, Radio, Checkbox, Button, Space } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { RadioChangeEvent } from "antd/lib/radio";
import { useState, useEffect } from "react";
import { TOOLS_LIST } from "@/data/toolsList";
import "./globals.css";
import FloatingLabelInput from "@/components/floating-label-input/FloatingLabelInput";

export default function Home() {
  const [isEditable, setIsEditable] = useState(true);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
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

  const handleUserOnChange = (
    e:
      | CheckboxValueType[]
      | RadioChangeEvent
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Array.isArray(e)) {
      const toolsIndices = e.map((value) =>
        TOOLS_LIST.findIndex((tool) => tool.value === value)
      );
      setUser({ ...user, toolsUsed: toolsIndices.join(",") });
      return;
    }

    if (e.target && e.target.id === "first_name_input") {
      setUser({ ...user, firstName: e.target.value });
    }

    if (e.target && e.target.name === "isProficient") {
      setUser({ ...user, isProficient: e.target.value === "yes" });
    }
  };

  const handleUserOnClick = () => {
    console.log(user);
  };

  return (
    <Layout>
      <div className="flex flex-col max-w-[380px] border border-black rounded-xl p-5 bg-white">
        <div className="flex items-center justify-between">
          <Typography.Text>Editable</Typography.Text>
          <Switch
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
          />
        </div>

        <FloatingLabelInput
          handleOnChange={handleUserOnChange}
          value={user.firstName}
          placeholder=" "
          label="First Name"
          disabled={!isEditable}
        />
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
