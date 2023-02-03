import { Box, Button } from '@mui/material'
import React from 'react'
import {Typography} from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const HomeRightbar = () => {
  const classes = useStyles();

  return (
    <Box flex={3} sx={{ display: { xs: "none", sm: "block"}}} position="sticky">
        <div className={classes.root}>
          <Button variant="contained" color="primary">
            Create Post
          </Button>
        </div>
       <Typography variant="h6" fontWeight={200}>
          Recommendations
        </Typography>
      </Box>
  )
}

export default HomeRightbar