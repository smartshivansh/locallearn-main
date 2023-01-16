import React, { useEffect, useState, useRef } from "react";
import Chat, {
  Bubble,
  useMessages,
  Avatar,
  List,
  ListItem,
} from "@chatui/core";
import { useSelector } from "react-redux";
import getUrls from "get-urls";
import "@chatui/core/dist/index.css";
import io from "socket.io-client";
import Tenor from "./Tenor";
import Composer from "../Composer/Composer";
import ReplyBubble from "../MsgBubble/ReplyBubble";
import SendBubble from "../MsgBubble/SendBubble";
import FormBubble from "../MsgBubble/FormBubble";
import NavBar from "./NavBar";
import LinkBubble from "../MsgBubble/LinkBubble";


import classes from "./Chat.module.css";
import Avatars from "./Avatar.module.css";
import apis from "../Constants/api";

import sendSound from "./audio/audioSent.mp3";
import receiveSound from "./audio/receiveMsg.mp3";
import { useNavigate } from "react-router";

let socket;
const ENDPOINT = "https://locallearn.in";
let msg1 = {
  type: "text",
  content: { text: "I would like to learn something new" },
};

// need to be replaced with the sukruti file
const defaultQuickReplies = [
  {
    name: "What is locallearn.in?",
    isNew: false,
    isHighlight: false,
    answer:
      " Local learn is a learning platform where new and interesting educational content is streamed 24 by 7 based on your interests and inclinations. Along with it, I am there to assist you in identifying your learning goals & to help you achieve them.",
    url: "",
  },

  {
    name: "Why would I need a Co-learner?",
    isNew: false,
    url: "video2.mp4",
    answer:
      "Having a co-learner provides you with a companion who has the same learning goals as yours. This will promote a healthy environment to learn, interact, discuss, brainstorm new ideas and perceptions which will support you in your learning journey.",
  },
  {
    name: "What is Co-Learning/collaborative learning?",
    isNew: false,
    isHighlight: false,
    answer:
      "Co-learning is a manner of group learning that enhances communication skills, cultural awareness, thinking skills and so much more. Working in a group also allows students to provide checks and balances of their work on the spot, rather than finding out later, to make the workflow more efficient",
    url: "",
  },
  {
    name: "What is trending?",
    isNew: false,
    isHighlight: false,
    answer:
      "Locallearn is making a bot and its trending as well, so talk to the bot",
    url: "video1.mp4",
  },
  {
    name: "How do i share my learning journey?",
    isNew: false,
    isHighlight: false,
    answer:
      "Myty is a platform where you can create your portfolio and publish your learning journey and showcase it to everyone from anywhere using a link.In this new normal, where the consumer searches everything on the internet before making a decision, myty enables you to appear in those searches and make the most of your web presence with its user friendly and powerful SEO tools. Learn more about making a digital presence on myty here",
    url: "video3.mp4",
  },
  {
    name: "I am bored, entertain me.",
    isHighlight: false,
    url: "video3.mp4",
  },
  {
    name: "I need help",
    isNew: false,
    isHighlight: false,
    answer:
      "Sure, I'm here for you. Can you please explain briefly what you need help with.",
    url: "",
  },
];

const ChatUI = (props) => {
  const email = localStorage.getItem("email");
  const chat = useSelector(s => s.chat.chat)

  const [initialMessages, setInitialMessages] = useState(chat);

  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const [connected, setConnected] = useState(false);

  const [myplaceholder, setMyplaceholder] = useState("Go on, ask me something");
  const referenceForMessageBox = useRef();
  const chatUiRef = useRef();
  const composerRef = useRef();

  const send = new Audio(sendSound);
  const receive = new Audio(receiveSound);

  useEffect(() => {
    socket = io(ENDPOINT);

    if (connected) {
      socket.emit(
        "user connected",
        {
          name: "anurag",
        },
        () => {
          setConnected(true);
        }
      );
    }
  }, [connected]);

  useEffect(() => {
    socket.emit("onlineStatus", { id: "hi you are online" }, (response) => {
      console.log("response", response);
    });

    socket.on("broadcast", (data) => {
      // console.log(data);
    });
    socket.on("send-msg-response", (data) => {
      // console.log("response msg  ----> ", data);
      if (getUrls(data).size > 0) {
        let url = getUrls(data);
        url = url.values();
        url = url.next();

        fetch(`${apis.quesans}`, {
          method: "POST",
          body: JSON.stringify({
            email,
            data: {
              type: "link",
              content: { href: url.value, message: data, index: 0 },
              position: "left",
            },
          }),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => JSON.parse(res))
          .then((res) => console.log(res));

        appendMsg({
          type: "link",
          content: { href: url.value, message: data },
        });
        return;
      } else {
        fetch(`${apis.quesans}`, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            data: {
              type: "qr",
              content: { text: data, response: "no response", index: 0 },
              position: "left",
            },
          }),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => JSON.parse(res))
          .then((res) => {
            console.log(1111, res);
            appendMsg({
              type: "qr",
              content: { text: data, index: res.index, response:"no response" },
            });
          });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [appendMsg]);

  const handleQuickReplyClick = (item) => {
    send.play();
    appendMsg({
      type: "text",
      content: { text: item.name },
      user: {
        avatar:
          "https://avatars.dicebear.com/api/croodles-neutral/shivansh.svg",
      },

      position: "right",
    });
    setTyping(true);

    setTimeout(() => {
      receive.play();
      appendMsg({
        type: "qr",
        content: { text: item.answer },
      });
    }, 1000);
  };

  function handleSend(type, val) {
    var tenor = true;

    if (type === "text" && val.trim()) {
      fetch(`${apis.quesans}`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          data: {
            type: "text",
            content: { text: val, index: 0 },
            position: "right",
          },
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => JSON.parse(res))
        .then((res) => console.log(res));

      if (val.length > 10) {
        socket.emit("SendMessage", { text: val }, (data) => {});
        tenor = false;
      }
      appendMsg({
        type: "text",
        content: { text: val },
        // user: {
        //   avatar:
        //     "https://avatars.dicebear.com/api/croodles-neutral/shivansh.svg",
        // },
        position: "right",
      });
      send.play();

      setTyping(true);

      if (tenor) {
        fetch(`${apis.quesans}`, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            data: {
              type: "text",
              content: { text: val, index: 0 },
              position: "right",
            },
          }),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => JSON.parse(res))
          .then((res) => {
            fetch(`${apis.quesans}`, {
              method: "POST",
              body: JSON.stringify({
                email: email,
                data: {
                  type: "tenor",
                  content: { item: val, index: 0 },
                  position: "left",
                },
              }),
              headers: {
                "content-type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((res) => JSON.parse(res))
              .then((res) => console.log(res));
          });

        setTimeout(() => {
          appendMsg({
            type: "tenor",
            content: { item: val },
          });
          receive.play();
        }, 1000);
      }
    }
  }

  function handlelist(x) {
    let msg = {
      type: "text",
      content: { text: "I would like to learn something new" },
    };
    renderMessageContent(msg);
  }
  const oninputfocushandle = () => {
    setMyplaceholder("");
  };

  function renderMessageContent(msg) {
    const { type, content, user } = msg;
    switch (type) {
      case "text":
        return (
          <div style={{ display: "flex", alingItems: "center" }}>
            <SendBubble content={content.text} />
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/shivansh.svg"
              size="md"
              className={Avatars.container}
            />
          </div>
        );
        break;

      case "link":
        return (
          <>
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg"
              size="md"
              className={Avatars.container}
            />
            <LinkBubble href={content.href} message={content.message} />
          </>
        );
        break;

      case "qr":
        return (
          <>
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg"
              size="md"
              className={Avatars.container}
            />
            <ReplyBubble
              content={content.text}
              index={content.index}
              response={content.response}
            />
          </>
        );
        break;

      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
        break;

      case "gipphy":
        return <div>test gipphy</div>;

      case "list":
        return (
          <>
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg"
              size="lg"
              className={Avatars.container}
            />
            <List bordered="true">
              <ListItem
                className="ActionItems"
                content=">>I want to know more about locallearn"
                onClick={() => {
                  renderMessageContent(msg1);
                }}
              />
              <ListItem
                className="ActionItems"
                content=">>I would like to learn something new"
                onClick={handlelist()}
              />
              <ListItem
                className="ActionItems"
                content=">>I would like share skills and knowledge with others"
                onClick={handlelist({
                  type: "text",
                  content: {
                    text: "I would like share skills and knowledge with others",
                  },
                })}
              />
            </List>
          </>
        );
        break;
      case "tenor":
        const { innerWidth, innerHeight } = window;
        let flag = 1;
        if (innerWidth < 600) {
          flag = 2;
        }
        return (
          <>
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg"
              size="lg"
              className={Avatars.container}
            />
            <Tenor item={content.item} size={flag} />
          </>
        );

      case "form":
        return (
          <>
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg"
              size="md"
              className={Avatars.container}
            />
            <FormBubble text="tell me something about yourself" />
          </>
        );
      default:
        return null;
    }
  }

  const quickReplyRenderHandler = () => {
    return <div></div>;
  };

  function handlerenderNavbar() {
    // return <Navbar display={showMenu} show={showSideMenuHandler} />;
  }

  useEffect(() => {
    if (chatUiRef) {
      chatUiRef.current.id = `${classes.chatbox}`;
    }
  }, [chatUiRef]);

  useEffect(() => {
    if (referenceForMessageBox) {
      referenceForMessageBox.current.ref.current.children[0].className = `${classes.scroller}`;
      referenceForMessageBox.current.ref.current.children[0].children[0].className = `${classes.scroller}`;
    }
  }, [referenceForMessageBox]);

  
  return (
    <div className={classes.container} id={classes.chatbox}>
      <NavBar />
      <div className={classes.chat}>
        <Chat
          wideBreakpoint="800px"
          renderNavbar={handlerenderNavbar}
          messages={messages}
          renderMessageContent={renderMessageContent}
          onSend={handleSend}
          placeholder={myplaceholder}
          locale="en-US"
          quickReplies={defaultQuickReplies}
          onQuickReplyClick={handleQuickReplyClick}
          onInputFocus={oninputfocushandle}
          messagesRef={referenceForMessageBox}
          Composer={Composer}
          ref={chatUiRef}
          composerRef={composerRef}
          renderQuickReplies={quickReplyRenderHandler}
        />
      </div>
    </div>
  );
};

export default ChatUI;
