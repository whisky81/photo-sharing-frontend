import React from 'react';
import fetchModelData from '../../lib/fetchModelData';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


export default function UserComment() {
    const [comments, setComments] = useState([]);
    const { userId } = useParams();
    useEffect((
    ) => {
        fetchModelData(`/api/comments/${userId}`)
            .then(data => {
                setComments(data.comments);
            })
    }, [comments]);

    return (
        <ImageList sx={{ width: 500, height: 450 }}>
            {comments.map((item) => (
                <ImageListItem key={item._id}>
                    <Link to={`/photos/detail/${item._id}`} >
                    <img
                        srcSet={`/images/${item.file_name}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`/images/${item.file_name}?w=248&fit=crop&auto=format`}
                        alt={item.file_name}
                        loading="lazy"
                    />
                    <div>
                        {item.comments.map((e, i) => (e.user === userId ? <span key={i}>Comment {i + 1}:{e.comment}<br /><br /></span> : null))}
                    </div>
                    </Link>
                </ImageListItem>
            ))}
        </ImageList>
    );
}