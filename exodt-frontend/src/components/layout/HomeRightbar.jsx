import { Box, Button } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
    },
  },
}));

const HomeRightbar = () => {
  const classes = useStyles();

  return (
    <Box
      flex={3}
      sx={{ display: { xs: "none", sm: "block" } }}
      position="sticky"
    >
      <Box position="fixed">
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "20em",
              height: "3em",
              padding: "1em",
              margin: "3em 3em 3em 3em",
            }}
          >
            <AddIcon />
            Create Post
          </Button>
        </div>
        <Typography variant="h6" fontWeight={200}>
          <center>Suggested connections</center>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeRightbar;
