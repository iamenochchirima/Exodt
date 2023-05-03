import AccountInfo from "@/components/Settings/AccountInfo";
import Privacy from "@/components/Settings/Privacy";
import SettingsLeftBar from "@/components/Settings/SettingsLeftBar";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex ">
      <div className="w-full mid:w-2/5 h-screen ">
        <SettingsLeftBar
          {...{
            setActiveTab,
          }}
        />
      </div>
      <div className="w-3/5 h-screen hidden mid:block">
        {activeTab === "account" && <AccountInfo />}
        {activeTab === "privacy" && <Privacy />}
      </div>
    </div>
  );
};

export default Settings;
