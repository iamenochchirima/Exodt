import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Layout from "@/components/Layout"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
  <Layout>
    <div className="">The current theme is: {theme}</div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
  </Layout>
  )
}
