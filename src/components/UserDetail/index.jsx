import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
import { Link } from 'react-router-dom'; 
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const userDetail = models.userModel(user.userId);
    return (
        <>
          <Typography variant="body1">
            <div>
              <h2>{`${userDetail.first_name} ${userDetail.last_name}`}</h2>
              <p>{userDetail.description}</p>
              <p>Live: {userDetail.location}</p>
            </div>
            <div>
              <h3><Link to={`/photos/${user.userId}`}>Gallery</Link></h3>
            </div>
          </Typography>
        </>
    );
}

export default UserDetail;
