import { DownloadOutlined, ImageOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const TextMessage = ({ el }) => {

  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const match = el.message.match(linkRegex);
  const link = match ? match[0] : null;

  const theme = useTheme();
  const { userProfileDetails } = useSelector((state) => state.auth);

  const user_id = userProfileDetails.id

  return (
    <Stack direction={"row"} justifyContent={el.sender !== user_id ? "start" : "end"}>
      <Stack>
      <Box
        pading={1.5}
        sx={{
          backgroundColor: el.sender !== user_id
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant={"body2"}
          color={el.sender !== user_id ? theme.palette.text : "#fff"}
          sx={{ padding: "10px" }}
        >
          {link ? (
        // Render the link preview here
        <a href={link}>{link}</a>
      ) : (
        el.message
      )}
        </Typography>
      </Box>
      <Typography align={el.sender !== user_id ? "left" : "right"} variant="caption">
        {el.timestamp_formatted}
      </Typography>
      </Stack>
     
    </Stack>
  );
};

const DocMessage = ({ el }) => {
  const theme = useTheme();

  const { userProfileDetails } = useSelector((state) => state.auth);

  const user_id = userProfileDetails.id

  return (
    <Stack direction={"row"} justifyContent={el.sender !== user_id ? "start" : "end"}>
      <Box
        pading={1.5}
        sx={{
          backgroundColor: el.sender !== user_id
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack>
          <Stack
            p={2}
            directio="row"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
            direction="row"
          >
            <ImageOutlined />
            <Typography variant="caption">{el.document}</Typography>
            <IconButton>
              <DownloadOutlined />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              color: el.sender !== user_id ? theme.palette.text : "#fff"
            }}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const MediaMessage = ({ el }) => {
  const theme = useTheme();

  const { userProfileDetails } = useSelector((state) => state.auth);

  const user_id = userProfileDetails.id

  return (
    <Stack direction={"row"} justifyContent={el.sender !== user_id ? "start" : "end"}>
      <Box
        pading={1.5}
        sx={{
          backgroundColor: el.sender !== user_id
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.image}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.sender !== user_id ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export { TextMessage, MediaMessage, DocMessage };
