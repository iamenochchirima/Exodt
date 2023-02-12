import React, { useContext } from "react";
import {
  Box,
  Stack,
  Typography,
  InputBase,
  Button,
  Divider,
  Avatar,
  Badge,
} from "@mui/material";
import { ArchiveOutlined, Search } from "@mui/icons-material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useGetChatsQuery } from "../../redux/features/api/chatApi";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Searchbar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.default),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
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

const ChatElement = ({ el }) => {
  const theme = useTheme();
  console.log(el);
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#2D3B43",
      }}
      p={0.5}
      key={el.id}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          {el.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar src={el.participant_profile.profile_image} />
            </StyledBadge>
          ) : (
            <Avatar src={el.participant_profile.profile_image} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">
              {el.participant_profile.first_name +
                " " +
                el.participant_profile.last_name}
            </Typography>
            <Typography variant="caption">
              {el.latest_message?.message.length > 20
                ? el.latest_message?.message.substr(0, 20) + "..."
                : el.latest_message?.message}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          alignItems={"center"}
          sx={{ pt: 0, pr: 1, pb: 1, pl: 1 }}
        >
          <Typography sx={{ fontWeight: 600 }} variant={"caption"}>
            {el.latest_message.timestamp_formatted}
          </Typography>
          <Badge color="primary" badgeContent={2} />
        </Stack>
      </Stack>
    </Box>
  );
};

const Chats = () => {
  const theme = useTheme();

  const { userProfileDetails } = useSelector((state) => state.auth);

  const id = userProfileDetails?.id;

  const { data: ChatList } = useGetChatsQuery(id, {
    pollingInterval: 900000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  return (
    <Box
      flex={2.5}
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.default,
        position: "relative",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        marginLeft: [4, 4, 5],
      }}
    >
      <Stack p={2} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row">
          <Typography variant="h5" fontWeight="600">
            Chats
          </Typography>
        </Stack>
        <Stack>
          <Searchbar>
            <SearchIconWrapper>
              <Search color="secondary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Searchbar>
        </Stack>
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems="center">
            <ArchiveOutlined />
            <Button style={{ textTransform: "none" }}>Archive</Button>
          </Stack>
          <Divider />
        </Stack>
        <Stack
          spacing={2}
          direction={"column"}
          sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
        >
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              Pinned Chat
            </Typography>
            {ChatList?.filter((el) => el.latest_message && el.pinned).map((el) => {
              return <ChatElement el={el} />;
            })}
          </Stack>
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              All Chats
            </Typography>
            {ChatList?.filter((el) => el.latest_message && !el.pinned ).map((el) => {
              return <ChatElement el={el} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
