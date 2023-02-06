import React, {Suspense, lazy} from 'react';
import HomeRightbar from './HomeRightbar';
import { Box, Stack } from '@mui/material';

const Feed = lazy(() => import('../../containers/posts/Feed') )

const Home = () => {
  return (
    <Box>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Suspense fallback={<Box flex={5} sx={{margin: 5}}>Loading...</Box>}>
            <Feed/>
          </Suspense>
            <HomeRightbar/>
        </Stack>
    </Box>
  )
}

export default Home