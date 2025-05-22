import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Badge,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import ImageIcon from "@mui/icons-material/Image";

import "./styles.css";
import fetchModelData from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ photos: {}, comments: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModelData("/api/user/list")
      .then((data) => {
        setUsers(data.users);
        setStats({
          photos: data.photoStats,
          comments: data.commentStats,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load users.");
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <CircularProgress size={20} />
        <Typography sx={{ ml: 1 }}>Loading users...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <List component="nav">
      {users.map((user) => (
        <React.Fragment key={user._id}>
          <ListItem
            secondaryAction={
              <Stack spacing={1.5} direction="row">
                <Badge
                  badgeContent={stats.photos[user._id] || 0}
                  color="success"
                >
                  <Link to={`/photos/${user._id}`}>
                    <ImageIcon color="action" />
                  </Link>
                </Badge>
                <Badge
                  badgeContent={stats.comments[user._id] || 0}
                  color="error"
                >
                  <Link to={`/comments/${user._id}`}>
                    <CommentIcon color="action" />
                  </Link>
                </Badge>
              </Stack>
            }
          >
            <ListItemText
              primary={
                <Link to={`/users/${user._id}`} className="user-link">
                  {user.first_name}
                </Link>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default UserList;
