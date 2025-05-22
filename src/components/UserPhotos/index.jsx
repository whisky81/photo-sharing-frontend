import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import PhotoList from "../PhotoList";
import fetchModel from "../../lib/fetchModelData";
import { CircularProgress, Typography, Box } from "@mui/material";

function UserPhotos() {
    const { userId } = useParams();
    const [photos, setPhotos] = React.useState();
    const [owner, setOwner] = React.useState();

    React.useEffect(() => {
        fetchModel(`/api/photo/user/${userId}`)
            .then(data => {
                setPhotos(data.photos);
                setOwner(data.owner);
            })
    }, [userId]);
    if (!photos || !owner || owner._id !== userId) {
        return (
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body1">Loading photos...</Typography>
            </Box>
        )
    }

    return <PhotoList photos={photos} owner={owner} />;
}

export default UserPhotos;
