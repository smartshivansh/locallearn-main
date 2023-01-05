import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Navbar.module.css";
import SkillChip from "./SkillChip";

import logo from "../images/logo.svg";
import holoImg from "../images/holoImg.jpg";
import hamberger from "../images/List.svg";
import profileBtn from "../images/UserCircle.svg";
import xBtn from "../images/X.svg";

import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Navbar = (props) => {
  //sidebar states
  const [showSideBar, setSideBar] = useState(false);
  const [containerHeight, setContainerHeight] = useState(null);
  const [sidebarTransform, setSidebarTransform] = useState(null);
  const [sidebarTransition, setSidebarTransition] = useState(null);
  const [backdropOpacity, setBackdropOpacity] = useState(null);
  const [backdropDisplay, setBackdropDisplay] = useState(null);
  const [sidebarContainerTransform, setSidebarContainerTransform] =
    useState(null);
  const [sidebarDisplay, setSideBarDisplay] = useState("block");
  const [navbarHeight, setNavbarHeight] = useState(null);
  const navigate = useNavigate();

  //profile states
  const [showProfile, setProfile] = useState(false);
  const [profileTransform, setProfileTransform] = useState(null);
  const [profileTransition, setProfileTransition] = useState(null);
  const [profileBackdropOpacity, setProfileBackdropOpacity] = useState(null);
  const [profileBackdropDisplay, setProfileBackdropDisplay] = useState(null);
  const [profileContainerTransform, setProfileContainerTransform] =
    useState(null);
  const [profileDisplay, setProfileDisplay] = useState("block");

  const goodSkill = useSelector((state) => state.skill.good);
  const learnSkill = useSelector((state) => state.skill.learn);
  const names = useSelector((state) => state.userdata.names);
  const location = useSelector((state) => state.userdata.location);
  const profession = useSelector((state) => state.userdata.profession);

  const showSideMenuHandler = () => {
    setSideBar((prevVal) => !prevVal);
    setProfileDisplay("none");
    setProfile(false);

    if (!showSideBar) {
      setSideBarDisplay("block");
      setNavbarHeight("10%");
      setContainerHeight("100%");
      setSidebarContainerTransform("translateX(0)");
      setSidebarTransform("translateX(0)");
      setSidebarTransition("0.5s");
      setBackdropOpacity(0);
      setBackdropDisplay("block");
      setTimeout(() => {
        setBackdropOpacity(1);
      }, 100);
    } else {
      setSidebarTransform("translateX(-110%)");
      setSidebarTransition("1s");
      setTimeout(() => {
        setBackdropOpacity(1);
        setSidebarContainerTransform("translateX(-100%)");
        setContainerHeight("10%");
        setNavbarHeight("100%");
      }, 500);
    }
  };

  const showProfileHandler = () => {
    setProfile((prevVal) => !prevVal);

    setSideBarDisplay("none");
    setSideBar(false);

    if (!showProfile) {
      setProfileDisplay("block");
      setNavbarHeight("10%");
      setContainerHeight("100%");
      setProfileContainerTransform("translateX(0)");
      setProfileTransform("translateX(0)");
      setProfileTransition("0.5s");
      setProfileBackdropOpacity(0);
      setProfileBackdropDisplay("block");
      setTimeout(() => {
        setProfileBackdropOpacity(1);
      }, 100);
    } else {
      setProfileTransform("translateX(110%)");
      setProfileTransition("1s");
      setTimeout(() => {
        setProfileBackdropOpacity(1);
        setProfileContainerTransform("translateX(100%)");
        setContainerHeight("10%");
        setNavbarHeight("100%");
      }, 500);
    }
  };

  const logoutHandler = () => {
    // localStorage.clear();
    return navigate("/home");
  };

  return (
    <div className={classes.container} style={{ height: containerHeight }}>
      {/* navbar */}
      <div className={classes.navbar} style={{ height: navbarHeight }}>
        {/* //sidebar btn */}
        {!showSideBar && (
          <img
            onClick={showSideMenuHandler}
            className={classes.hamberger}
            alt="img"
            src={hamberger}
          />
        )}
        {showSideBar && (
          <img
            src={xBtn}
            alt="img"
            className={classes.btn}
            onClick={showSideMenuHandler}
          />
        )}

        {/* logo */}
        <div className={classes.logoContainer}>
          <div
            onClick={() => {
              navigate("/app/chat");
            }}
            className={classes.link}
          >
            <img src={logo} alt="ll" className={classes.logo} />
          </div>
        </div>

        {/* profile btn */}

        {!showProfile && (
          <img
            className={classes.profileBtn}
            onClick={showProfileHandler}
            src={profileBtn}
            alt="profile"
          />
        )}
        {showProfile && (
          <img
            className={classes.profilexBtn}
            onClick={showProfileHandler}
            src={xBtn}
            alt="close"
          />
        )}
      </div>

      {/* sidebar */}
      <div
        className={classes.sidebarContainer}
        style={{
          transform: sidebarContainerTransform,
          display: sidebarDisplay,
        }}
      >
        <div
          className={classes.backdrop}
          onClick={showSideMenuHandler}
          style={{ opacity: backdropOpacity, display: backdropDisplay }}
        ></div>
        <div
          className={classes.sideBar}
          style={{
            transform: sidebarTransform,
            transition: sidebarTransition,
          }}
        >
          <div
            onClick={() => {
              navigate("/app/aboutus");
            }}
            className={classes.link}
          >
            <p className={classes.sideBarItem}>About locallearn</p>
          </div>
          <div
            onClick={() => {
              navigate("/app/privacypolicy");
            }}
            className={classes.link}
          >
            <p className={classes.sideBarItem}>Privacy policy</p>
          </div>
          <div
            onClick={() => {
              navigate("/app/termsofuse");
            }}
            className={classes.link}
          >
            <p className={classes.sideBarItem}>Terms of use</p>
          </div>
          <div
            onClick={() => {
              navigate("/app/coc");
            }}
            className={classes.link}
          >
            <p className={classes.sideBarItem}>Code of conduct</p>
          </div>
        </div>
      </div>

      {/* profile */}

      <div
        className={classes.profileContainer}
        style={{
          transform: profileContainerTransform,
          display: profileDisplay,
        }}
      >
        <div
          className={classes.profileBackdrop}
          style={{
            opacity: profileBackdropOpacity,
            display: profileBackdropDisplay,
          }}
          onClick={showProfileHandler}
        ></div>
        <div
          className={classes.profile}
          style={{
            transform: profileTransform,
            transition: profileTransition,
          }}
        >
          {/* image Section */}
          <div className={classes.imageContaioner}>
            <img
              className={classes.image}
              src={`https://avatars.dicebear.com/api/croodles-neutral/customer.${names}.svg`}
              alt="img"
            />
            <div className={classes.despContainer}>
              <h4 className={classes.name}>{names}</h4>
              <p className={classes.desp}>{profession}</p>
              <p className={classes.desp}>{location}</p>
            </div>
          </div>

          {/* skills i am good at */}

          <div className={classes.good}>
            <h3>Skills I am good At</h3>
            <div className={classes.skills}>
              {goodSkill.map((skill) => {
                return <SkillChip key={skill} text={skill} />;
              })}
            </div>
          </div>

          {/* skills I want to learn */}
          <div className={classes.good}>
            <h3>Skills I want to learn</h3>
            <div className={classes.skills}>
              {learnSkill.map((skill) => {
                return <SkillChip key={skill} text={skill} />;
              })}
            </div>
          </div>

          <div className={classes.logoutcont}>
            <button className={classes.logout} onClick={logoutHandler}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
