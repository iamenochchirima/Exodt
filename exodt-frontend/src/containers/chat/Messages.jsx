import React, { Suspense, lazy } from "react";
import { Box, Stack } from "@mui/material";

const Chats = lazy(() => import("./Chats"));
const Conversation = lazy(() => import("./Conversation"));

const Messages = () => {
  return (
    <Box color={"text.primary"}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Suspense
          fallback={
            <Box flex={5} sx={{ margin: 5 }}>
              Loading...
            </Box>
          }
        >
          <Chats />
        </Suspense>
        <Suspense
          fallback={
            <Box flex={5} sx={{ margin: 5 }}>
              Loading...
            </Box>
          }
        >
          <Conversation />
        </Suspense>
      </Stack>
    </Box>
  );
};

export default Messages;