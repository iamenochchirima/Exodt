import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Topbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="w-full h-[100px] bg-blue-700 ss:hidden fixed">
      <div className="">
        <div className="">The current theme is: {theme}</div>
        <button onClick={() => setTheme("light")}>Light Mode</button>
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
      </div>
    </div>
  );
};

export default Topbar;
