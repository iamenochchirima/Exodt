import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const TextMessage = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        pading={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant={"body2"}
          color={el.incoming ? theme.palette.text : "#FFF"}
        >
          {el.message}
        </Typography>
      </Box>
    </Stack>
  );
};

const Timeline = ({ el }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width="46%" />
      <Typography variant="caption">{el.text}</Typography>
      <Divider width="46%" />
    </Stack>
  );
};

export { Timeline, TextMessage };
