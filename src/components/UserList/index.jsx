import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import fetchModelData from "../../lib/fetchModelData";
import { Link } from 'react-router-dom'; 
/**
 * Define UserList, a React component of Project 4.
 */
import { useState, useEffect } from "react";

function UserList () {
    const [users, setUsers] = useState([]); 
    useEffect(() => {
      fetchModelData("/api/user/list")
        .then(data => {
          setUsers(data.users);
        })
    }, [users]);


    
    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography>
        <List component="nav">
          {users.map((item) => (
            <>
              <ListItem>
                <Link to={`/users/${item._id}`}><ListItemText primary={item.first_name}/></Link>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography>
      </div>
    );
}

export default UserList;
