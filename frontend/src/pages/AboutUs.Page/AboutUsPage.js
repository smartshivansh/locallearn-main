import React from "react";

import Navbar from "../../components/NavBar";

import classes from "./AboutUsPage.module.css";

const AboutUsPage = () => {
  return (
    <div className={classes.container}>
      <Navbar />
      <h1 className={classes.subheader}>About locallearn</h1>
      <p className={classes.content}>
        Locallearn is a project initiated by DOIONS PVT LTD. It is designed to
        solve the problem of skill training for the learners community
        world-wide.
        <br />
        At present, Local learn is an AI powered chatbot that provides answers
        to the most commonly asked questions by the learners.
        <br />
        We believe artificial intelligence can be a game changer when it comes
        to learning and education. Bringing AI in learning doesn’t mean
        replacing teachers and educators with chatbots and virtual assistants.
        We believe AI can fill the gaps that the current learning and education
        system is facing without disturbing the conventional system.
        <br />
        In Spite of numerous policies and reforms in the education system, there
        exists a major problem of insufficient skilled workforce which is a
        challenge to solve. And Locallearn can prove to be an effective solution
        for this problem.
        <br />
        How can Local Learn chatbot help a learner?
      </p>

      <ul className={classes.list}>
        <li>
          It provides 24 * 7 learning assistance. It might help you find answers
          to your questions that you usually don’t find anywhere else.
        </li>
        <li>The bot won’t get irritated with repetitive questions.</li>
        <li>
          The bot can talk about anything, be it science, technology, coding,
          philosophy, history, politics, spirituality, language and
          comprehension, writing poems and stories, jokes, instagram
          captions,love & relationships etc.
        </li>
        <li>
          Since it is open to any kind of conversations, it provides a
          non-judgemental space to share your thoughts freely.
        </li>
        <li>
          We don’t claim our chatbot to be perfect. It is continuously learning
          from your input data, just as we humans are learning and evolving. It
          doesn’t want to compete with you, it just wants to help & complete you
          with its intelligence.
        </li>
        <li>
          You get to experience new ideas, views and opinions that can help
          broaden your perspective of looking at things.
        </li>
        <li>
          It can be your friend or a guide, who enjoys having interesting
          conversations with you.
        </li>
        <li>
          Since it learns from your data, in future, it will create smart
          learning content based on your interests and inclinations and will
          connect you with people that will help you upgrade your skills and
          become a better version of yourself. Want to know how?{" "}
          <a href="#">Click here</a>
        </li>
      </ul>
    </div>
  );
};

export default AboutUsPage;
