import React, { useEffect, useState } from "react";
import "./Users.css";
import { getUsersData } from "../../Services/API_Services";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const GetAllUsers = async () => {
    try {
      const response = await getUsersData();
      if (response) {
        if (response.length > 0) {
          console.log(response);
          setUsers(response);
          setLoader(false);
        }
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const NavToProfile = (UserName) => {
    navigate(`/users/:${UserName}`);
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  return (
    <div className="d-flex flex-column gap-3 justify-content-center align-items-center outerPage">
      <div className="d-flex flex-column gap-2 align-items-center">
        <div className="usersLabel">Git Hub Users List</div>
        <span className="info-Click">Click to see profile of the users...</span>
      </div>
      <div>
        {loader ? (
          <div className="d-flex align-items-center justify-content-center mt-4">
            <CircularProgress />
          </div>
        ) : (
          <div className="scrollBox">
            {users.map((user, index) => (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "#f1f1f1",
                }}
                className="UserList"
                onClick={() => NavToProfile(user.login)}
              >
                <ListItem alignItems="flex-start center">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.avatar_url}
                      style={{ width: "60px", height: "60px" }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className="px-3"
                    primary={
                      <Typography
                        fontFamily={"Nunito"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        textTransform={"capitalize"}
                      >
                        {user.login}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          fontFamily={"Nunito"}
                          fontSize={"14px"}
                          fontWeight={"600"}
                        >
                          ID: {user.node_id}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <OpenInNewIcon
                    sx={{ fontSize: 20, color: "#0a58ca" }}
                    onClick={() => NavToProfile(user.login)}
                  />
                </ListItem>
              </List>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
