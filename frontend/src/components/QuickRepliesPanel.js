import {
  QuickReply,
  ScrollView,
} from "@chatui/core/lib/components/QuickReplies";
// };

import classes from "./QuickReplies.module.css";

import { useRef } from "react";

const QuickRepliesPanel = (props) => {
  return (
    <div className={classes.container}>
      {props.quickReplies.map((item, index) => {
        return (
          <QuickReply
            item={item}
            index={index}
            onClick={props.onClick}
            key={item.name}
          />
        );
      })}
    </div>
  );
};

export default QuickRepliesPanel;
