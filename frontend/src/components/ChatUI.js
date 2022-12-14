import React, { useEffect, useState, useRef } from "react";
import Chat, {
  Bubble,
  useMessages,
  Avatar,
  List,
  ListItem,
} from "@chatui/core";
import "@chatui/core/dist/index.css";
import io from "socket.io-client";
import Tenor from "./Tenor";
import Composer from "../Composer/Composer";
import ReplyBubble from "../MsgBubble/ReplyBubble";
import SendBubble from "../MsgBubble/SendBubble";
import FormBubble from "../MsgBubble/FormBubble";
import NavBar from "./NavBar";

import classes from "./Chat.module.css";
import Avatars from "./Avatar.module.css";

import sendSound from "./audio/audioSent.mp3";
import receiveSound from "./audio/receiveMsg.mp3";

let socket;
const ENDPOINT = "https://locallearn.in/";
let msg1 = {
  type: "text",
  content: { text: "I would like to learn something new" },
};
const initialMessages = [
  {
    type: "qr",
    content: { text: "Hi there! How are you?" },
    // user: {
    //   avatar: "https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg",
    // },
  },
];
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
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const [connected, setConnected] = useState(false);
  const [myplaceholder, setMyplaceholder] = useState("Go on, ask me something");
  const referenceForMessageBox = useRef();
  const chatUiRef = useRef();
  const composerRef = useRef();

  const send = new Audio(sendSound);
  const receive = new Audio(receiveSound);

  const msgdata = { question: "", answer: "" };

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

    socket.on("broadcast", (data) => {});
    socket.on("send-msg-response", (data) => {
      // console.log("response msg  ----> ", data);
      appendMsg({
        type: "qr",
        content: { text: data },
        // user: {
        //   avatar:
        //     "https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg",
        // },
      });
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
      if (val.length > 10) {
        socket.emit("SendMessage", { text: val }, () => {});
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
        msgdata.question = content.text;
        return (
          <>
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/shivansh.svg"
              size="md"
              className={Avatars.container}
            />
            <SendBubble content={content.text} />
          </>
        );

      case "qr":
        msgdata.answer = content.text;
        // questionAnswer();
        return (
          <>
            <Avatar
              src="https://avatars.dicebear.com/api/croodles-neutral/vibhavari.svg"
              size="md"
              className={Avatars.container}
            />
            <ReplyBubble content={content.text} />
          </>
        );

      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );

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

  const email = localStorage.getItem("email");

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (msgdata.question === "" || msgdata.answer === "" || !email) {
        return;
      }
      await fetch("http://doornextshop.com/quesans", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, msgdata }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      msgdata.question = "";
      msgdata.answer = "";
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [msgdata.answer]);

  // const questionAnswer = async () => {
  //   const email = localStorage.getItem("email");
  //   if (msgdata.question === "" || msgdata.answer === "" || !email) {
  //     return;
  //   }

  //   await fetch("http://doornextshop.com/quesans", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ email, msgdata }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  //   msgdata.question = "";
  //   msgdata.answer = "";
  // };

  return (
    <div className={classes.container} id={classes.chatbox}>
      <NavBar />
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
  );
};

export default React.memo(ChatUI);
