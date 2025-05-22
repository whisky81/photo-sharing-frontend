import React from "react";
import {
  Typography,
  Box,
  Chip
} from "@mui/material";
export default function PhotoComment({ comments }) {
    return (
        <>
            {(comments || []).map((e, i) => (
                <Box key={i} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Chip
                        label={`Comment #${i + 1}`}
                        size="small"
                        sx={{ mb: 1 }}
                        color="primary"
                    />
                    <Typography variant="body2">
                        {e.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                        {e.date_time}
                    </Typography>
                </Box>
            ))}
        </>
    )
}