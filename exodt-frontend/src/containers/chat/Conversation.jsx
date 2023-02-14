import React, { useEffect, useRef, useState } from "react";
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
import {
  ImageOutlined,
  InfoOutlined,
  SendOutlined,
  SentimentSatisfied,
} from "@mui/icons-material";
import {
  TextMessage,
  MediaMessage,
  DocMessage,
} from "./MessageTypes";
import { useSelector } from "react-redux";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../redux/features/api/chatApi";
import io from "socket.io-client";

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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketMessage, setSocketMessage] = useState(null);

  const socket = useRef();

  const { activeChat } = useSelector((state) => state.chat);

  const { userProfileDetails } = useSelector((state) => state.auth);

  const user_id = userProfileDetails?.id;

  const chat_id = activeChat?.id;

  const recieverId = activeChat?.participant_profile.id;

  const { data } = useGetMessagesQuery(chat_id, {
    pollingInterval: 900000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("getMessage", (data) => {
      setSocketMessage({
        sender: data.senderId,
        message: data.message,
        timestamp: Date.now(),
        image: null,
        document: null,
      });
    });
  }, []);

  console.log(socketMessage, "here socket message")

  useEffect(() => {
    socketMessage &&
      activeChat?.participants.includes(socketMessage.sender) &&
      setMessages((prev) => [...prev, socketMessage]);
      console.log(socketMessage, "Socket message")
  }, [socketMessage, activeChat]);

  useEffect(() => {
    socket.current.emit("addUser", user_id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user_id]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const [sendMessage] = useSendMessageMutation();
  const scrollRef = useRef();

  const body = { sender: user_id, conversation: chat_id, message: newMessage };

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.current.emit("sendMessage", {
      senderId: user_id,
      recieverId,
      message: newMessage,
    });

    if (body) {
      try {
        await sendMessage(body)
          .unwrap()
          .then((payload) => {
            console.log("fulfilled", payload);
            setMessages([...messages, payload]);
          });
      } catch (err) {
        console.error("Failed to send message: ", err);
      }
    }
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      flex={5}
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        position: "relative",
      }}
    >
      {activeChat ? (
        <>
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
                      <Avatar
                        src={activeChat?.participant_profile.profile_image}
                      />
                    </StyledBadge>
                  </Box>
                  <Stack spacing={0.2}>
                    <Typography variant="subtitle2">
                      {activeChat?.participant_profile.first_name +
                        " " +
                        activeChat?.participant_profile.last_name}
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
            <Box
              width={"100%"}
              sx={{ flexGrow: 1, overflow: "scroll", height: "300px" }}
            >
              <Box p={3}>
                <Stack spacing={3}>
                  {messages?.map((el) => {
                    console.log(el)
                    switch (true) {
                      case el.image !== null:
                        return (
                          <div ref={scrollRef}>
                            <MediaMessage el={el} />
                          </div>
                        );
                      case el.document !== null:
                        return (
                          <div ref={scrollRef}>
                            <DocMessage el={el} />
                          </div>
                        );
                      default:
                        return (
                          <div ref={scrollRef}>
                            <TextMessage el={el} />
                          </div>
                        );
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
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
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
                        <IconButton onClick={handleSubmit}>
                          <SendOutlined />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Select a chat and start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Conversation;
