import AccountInfo from "@/components/Settings/AccountInfo";
import Privacy from "@/components/Settings/Privacy";
import SettingsLeftBar from "@/components/Settings/SettingsLeftBar";
import React, { useState } from "react";

const Settings = () => {
  const [accountTab, setAccountInfo] = useState(true);
  const [privacyTab, setPricacyTab] = useState(false);

  return (
    <div className="flex ">
      <div className="w-full mid:w-2/5 h-screen bg-slate-500 ">
        <SettingsLeftBar
          {...{
            setAccountInfo,
            setPricacyTab,
          }}
        />
      </div>
      <div className="w-3/5 h-screen bg-green-700 hidden mid:block">
        {accountTab && <AccountInfo />}
        {privacyTab && <Privacy />}
      </div>
    </div>
  );
};

export default Settings;
