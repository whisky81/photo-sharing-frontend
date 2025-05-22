import React from "react";
import {
  Typography,
  Box,
  Chip
} from "@mui/material";
import './styles.css';

export default function PhotoComment({ comments }) {
  return (
    <>
      {(comments || []).map((e, i) => (
        <Box key={i} className="photo-comment-box">
          <Chip
            label={`Comment #${i + 1}`}
            size="small"
            color="primary"
            className="photo-comment-chip"
          />
          <Typography variant="body2">
            {e.comment}
          </Typography>
          <Typography variant="caption" className="photo-comment-date">
            {e.date_time}
          </Typography>
        </Box>
      ))}
    </>
  );
}
