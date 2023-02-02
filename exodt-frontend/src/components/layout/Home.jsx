import React from 'react';
import HomeRightbar from './HomeRightbar';
import Feed from '../../containers/posts/Feed';
import { Box, Stack } from '@mui/material';

const Home = () => {
  return (
    <Box>
        <Stack direction="row" spacing={1} justifyContent="space-between">
            <Feed/>
            <HomeRightbar/>
        </Stack>
    </Box>
  )
}

export default Home