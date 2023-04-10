import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
  <div className="">
    <div className="">The current theme is: {theme}</div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
  </div>
  )
}
