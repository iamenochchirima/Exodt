import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Box flex={3} sx={{ display: { xs: "none", sm: "block"}}} >
      Sidebar
      <Link
							to="/"
							underline="none"
							color="textPrimary"
						>
							Home
						</Link>
      </Box>
  )
}

export default Sidebar