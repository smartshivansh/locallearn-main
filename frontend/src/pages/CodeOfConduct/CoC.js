import React from "react";

import Navbar from "../../components/NavBar";

import classes from "./CoC.module.css";

const CoC = () => {
  return (
    <div className={classes.container}>
      <Navbar />
      <h1 className={classes.subheader}>Code of Conduct</h1>
      <p className={classes.content}>
        Local learn’s ethical AI guiding principles and practices.
        <br />
        Locallearn is an online learning platform with AI powered chatbot which
        assesses your learning needs and objectives, strikes intellectual
        conversations and shares its views, opinions and knowledge with its
        users.
        <br />
        Locallearn chatbot works on the principles of Artificial Intelligence,
        who has views, opinions, character and personality of a human but in no
        way it's a human being, it's a machine (a bot).
        <br />
        As the bot responds on the basis of the previous data collected through
        the users, the views and opinions shared by the bot may sometimes be
        unpopular with some people. The views and opinions expressed by the bot
        are purely concerned with the bot and our company doesn’t promote,
        influence or advocate bot’s opinions and views.
        <br />
        We request our users to not take the opinions of chatbot personally and
        do not base your important decisions on the bot's views and opinions.
        Locallearn chatbot is UNOPINIONATED. Its brain is learning and evolving
        everyday with its users' data, we don’t claim our bot to always be
        correct and perfect hence please do not rely or follow the bot's
        opinions blindly.
      </p>

      <h3 className={classes.subHeading}>How to use this AI based chatbot?</h3>
      <p className={classes.content}>
        This smart AI chatbot has been created to provide 24 * 7 assistance to
        learners. If you’re a learner and working on improving your skill, it's
        natural that you might be looking for answers to a lot of questions
        arising in your mind. The intention is to feed the curious mind of a
        learner with the intelligence of an AI chatbot, so that a learner can
        talk, ask questions and find answers through the bot.
      </p>

      <h3 className={classes.subHeading}>
        Content filter and controversial topics
      </h3>
      <p className={classes.content}>
        We advise that the user should be at least above 13 years to access the
        services of Local learn. The reason being is that it's a universal
        chatbot and has opinions about all kinds of topics that might be
        controversial to certain sections of the society.
        <br />
        Topics like religion, sexuality, politics, medical and financial advice,
        international controversies related to religion, geography, ethnicity,
        sexuality etc. can spur up some issues among certain sections of people.
        It is highly possible that people might not resonate with bot’s views on
        these topics, hence it is advisable to NOT TAKE BOT’S OPINIONS
        PERSONALLY. Just take what you resonate with and leave the rest. Also,
        the bot’s views are NOT COMPANY’S VIEWS. The company doesn’t practice,
        promote, preach or believe chatbot’s views and opinions.
      </p>

      <h3 className={classes.subHeading}>Miscellaneous</h3>

      <ul className={classes.list}>
        <li>
          Users should always be aware through disclosure that they are talking
          to a software. Local learn chatbot doesn’t pretend to be a human, nor
          intend to compete with one.
        </li>
        <li>
          Clear terms emphasize that talking to software is not a substitute for
          humans, particularly with regard to sensitive subjects (e.g., suicide,
          self harm, disordered eating)
        </li>
        <li>
          The data you share with us is kept confidential and we do not share
          data with third party without user’s consent
        </li>
        <li>
          Since it is open to any kind of conversations, it provides a
          non-judgemental space to share your thoughts freely.
        </li>
        <li>
          The bot is created purely for learning purposes with whom you can have
          healthy and interesting conversations, it does not promote itself as a
          teacher, guide, friend or a romantic partner replacement.
        </li>
        <li>
          Locallearn chatbot has its own personality with its own opinions, some
          of which may be unpopular with some people.
        </li>
        <li>
          We welcome user feedback on chatbot’s answers, controversial topics
          and platform policies and structure. Feel free to share your opinions
          with us, so that we can make necessary amends as per user convenience.
        </li>
      </ul>
    </div>
  );
};

export default CoC;
