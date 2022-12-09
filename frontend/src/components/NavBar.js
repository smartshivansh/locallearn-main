import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Navbar.module.css";
import SkillChip from "./SkillChip";

import { useNavigate } from "react-router-dom";

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

  const goodSkill = useSelector((state) => state.skill.good);
  const learnSkill = useSelector((state) => state.skill.learn);

  const showSideMenuHandler = () => {
    setSideBar((prevVal) => !prevVal);
    //only git
    if (!showSideBar) {
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

    if (!showProfile) {
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

  return (
    <div className={classes.container} style={{ height: containerHeight }}>
      {/* navbar */}
      <div className={classes.navbar} style={{ height: navbarHeight }}>
        {/* //sidebar btn */}
        {!showSideBar && (
          <div
            onClick={showSideMenuHandler}
            className={classes.hamberger}
          ></div>
        )}
        {showSideBar && (
          <div className={classes.btn} onClick={showSideMenuHandler}></div>
        )}

        {/* logo */}
        <div className={classes.logoContainer}>
          <p className={classes.logo}>
            <div
              onClick={() => {
                navigate("/app/chat");
              }}
              className={classes.link}
            >
              LOCALLEARN
            </div>
          </p>
        </div>

        {/* profile btn */}

        {!showProfile && (
          <div
            className={classes.profileBtn}
            onClick={showProfileHandler}
          ></div>
        )}
        {showProfile && (
          <div
            className={classes.profilexBtn}
            onClick={showProfileHandler}
          ></div>
        )}
      </div>

      {/* sidebar */}
      <div
        className={classes.sidebarContainer}
        style={{ transform: sidebarContainerTransform }}
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
        style={{ transform: profileContainerTransform }}
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
            <div className={classes.image}></div>
            <div className={classes.despContainer}>
              <h4 className={classes.name}>Shivansh shrivastava</h4>
              <p className={classes.desp}>Software Engineer</p>
              <p className={classes.desp}>jabalpur</p>
            </div>
          </div>

          {/* skills i am good at */}

          <div className={classes.good}>
            <h3>Skills I am good At</h3>
            <div className={classes.skills}>
              {goodSkill.map((skill) => {
                return <SkillChip text={skill} />;
              })}
            </div>
          </div>

          {/* skills I want to learn */}
          <div className={classes.good}>
            <h3>Skills I am want to learn</h3>
            <div className={classes.skills}>
              {learnSkill.map((skill) => {
                return <SkillChip text={skill} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
