// import React, { useState } from "react";

// import QuestionPanel from "./QuestionPanel";
// import classes from "./Questionwindow.module.css";

// const Questionwindow = () => {
//   const questions = [
//     {
//       question:
//         "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       options: [
//         "option1",
//         "option2",
//         "option3",
//         "option4",
//         "option5",
//         "option6",
//         "option7",
//         "option8",
//         "option9",
//         "option10",
//         "option12",
//         "option13",
//         "option14",
//         "option15",
//         "option16",
//         "option17",
//         "option18",
//       ],
//       min: 1,
//       max: 5,
//       last: true,
//     },
//     {
//       question:
//         "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       options: [
//         "option1",
//         "option2",
//         "option3",
//         "option4",
//         "option5",
//         "option6",
//         "option7",
//         "option8",
//         "option9",
//         "option10",
//         "option12",
//         "option13",
//         "option14",
//         "option15",
//         "option16",
//         "option17",
//         "option18",
//       ],
//       min: 1,
//       max: 5,
//       last: false,
//     },
//     {
//       question:
//         "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//       options: [
//         "option1",
//         "option2",
//         "option3",
//         "option4",
//         "option5",
//         "option6",
//         "option7",
//         "option8",
//         "option9",
//         "option10",
//         "option12",
//         "option13",
//         "option14",
//         "option15",
//         "option16",
//         "option17",
//         "option18",
//       ],
//       min: 1,
//       max: 5,
//       last: false,
//     },
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.left}></div>
//       <div className={classes.right}></div>
//       <div className={classes.questionBox}>
//         {questions.map((question) => (
//           <QuestionPanel
//             question={question.question}
//             options={question.options}
//             min={question.min}
//             max={question.max}
//             key={question.question}
//             last={question.last}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Questionwindow;
