import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { getUserDetail } from "../../Services/API_Services";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import XIcon from "@mui/icons-material/X";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import CircularProgress from "@mui/material/CircularProgress";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const Params = useParams();
  const UserName = Params.UserName;
  const [userDetail, setUserDetail] = useState({});
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const UserDetail = async () => {
    try {
      const response = await getUserDetail(UserName.substring(1));
      if (response) {
        console.log(response);
        setUserDetail(response);
        setLoader(false);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    UserDetail();
  }, [Params]);

  return (
    <>
      <div className="BackBtn" onClick={() => navigate("/")}>
        <ArrowBackIcon sx={{ fontSize: 20 }} /> &nbsp;Back
      </div>
      <div>
        {loader ? (
          <div className="d-flex align-items-center justify-content-center mt-4">
            <CircularProgress />
          </div>
        ) : (
          <div className="d-flex gap-3 cardOuter">
            <div>
              <img
                src={userDetail.avatar_url}
                width={150}
                height={150}
                alt="Profile"
                onError={(e) => {
                  e.target.src = "../Assets/ErrorImg.png";
                }}
                style={{ borderRadius: "4px" }}
              />
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-1">
                  <span>
                    <PersonIcon />
                  </span>
                  <span className="nameLabel">{userDetail?.name}</span>&nbsp;
                  <span className="mb-1">
                    <XIcon sx={{ fontSize: 10 }} />
                  </span>
                  <span className="acc_label">{userDetail?.login}</span>
                </div>
                <div className="d-flex align-items-center gap-1 mx-3"></div>
                <div className="reps_label mx-1">
                  <BusinessIcon sx={{ fontSize: 20 }} />
                  &nbsp;
                  {userDetail?.company === null
                    ? "No company found"
                    : userDetail?.company}
                </div>
              </div>
              <div className="d-flex gap-2 card-body reps_label">
                <div>{userDetail?.public_repos}&nbsp;Public Repos</div> •
                <div>{userDetail?.followers}&nbsp;Followers</div> •
                <div>{userDetail?.following}&nbsp;Following</div>
              </div>
              <div className="d-flex gap-4">
                {userDetail?.location !== null && (
                  <div>
                    <LocationOnIcon sx={{ fontSize: 20 }} />
                    &nbsp;
                    <span className="reps_label">{userDetail?.location}</span>
                  </div>
                )}
                <div>
                  <LanguageIcon sx={{ fontSize: 20 }} />
                  &nbsp;
                  <a
                    href={userDetail?.blog}
                    className="reps_label uderlineTxt"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Blog Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
