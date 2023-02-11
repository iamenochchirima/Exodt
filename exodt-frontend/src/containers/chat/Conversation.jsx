import React from "react";
import {
  Avatar,
  Box,
  Stack,
  useTheme,
  Badge,
  Typography,
  IconButton,
  TextField,
  styled,
  InputAdornment,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { faker } from "@faker-js/faker";
import {
  ImageOutlined,
  InfoOutlined,
  SendOutlined,
  SentimentSatisfied,
} from "@mui/icons-material";
import { Chat_History } from ".";
import { Timeline, TextMessage, MediaMessage, LinkMessage, DocMessage } from "./MessageTypes";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const Conversation = () => {
  const theme = useTheme();

  return (
    <Box
      flex={5}
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        position: "relative",
      }}
    >
      <Stack
        direction={"column"}
        height={"100%"}
        maxHeight={"100vh"}
        width={"auto"}
      >
        {/* Header */}
        <Box
          p={2}
          sx={{
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.default,
            position: "relative",
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "100%", height: "100%" }}
          >
            <Stack direction={"row"} spacing={2}>
              <Box>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar src={faker.image.avatar()} />
                </StyledBadge>
              </Box>
              <Stack spacing={0.2}>
                <Typography variant="subtitle2">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="caption">Online</Typography>
              </Stack>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
        {/* Messages */}
        <Box width={"100%"} sx={{ flexGrow: 1, overflow: "scroll", height: "300px" }}>
          <Box p={3}>
            <Stack spacing={3}>
              {Chat_History.map((el) => {
                switch (el.type) {
                  case "divider":
                    return <Timeline el={el} />;
                  case "msg":
                    switch (el.subtype) {
                      case "img":
                        return <MediaMessage el={el}/>
                      case "doc":
                        return <DocMessage el={el}/>
                      case "link":
                        return <LinkMessage el={el}/>

                      default:
                        return <TextMessage el={el} />;
                    }

                    break;

                  default:
                    return <></>;
                }
              })}
            </Stack>
          </Box>
        </Box>
        {/* Footer */}
        <Box
          p={2}
          sx={{
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.default,
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <StyledInput
              fullWidth
              placeholder="Write a message"
              variant="filled"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <ImageOutlined />
                    </IconButton>
                    <IconButton>
                      <SentimentSatisfied />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SendOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Conversation;
