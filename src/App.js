import "./App.css";
import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComment from "./components/UserComment";
import PhotoViewDetail from "./components/PhotoViewDetail";
import PhotoList from "./components/PhotoList";
import fetchModel from "./lib/fetchModelData";

const App = () => {
  const [photos, setPhotos] = React.useState();
  React.useEffect(() => {
    fetchModel("/api/photo/list").then((data) => setPhotos(data));
  }, []);

  if (!photos) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar />
          </Grid>
          <div className="main-topbar-buffer" />

          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<PhotoList photos={photos} />} />
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/comments/:userId" element={<UserComment />} />
                <Route
                  path="/photos/detail/:photoId"
                  element={<PhotoViewDetail />}
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
