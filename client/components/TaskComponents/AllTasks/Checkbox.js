// import React, { useEffect, useState } from "react";
// import { connect, useDispatch } from "react-redux";
// import { Form } from "react-bootstrap";
// import { updateTask } from "../../../redux/taskReducer";

// const TasksInProgress = (props) => {
//   const dispatch = useDispatch();

//   const [checked, setChecked] = useState(false);
//   const handleChange = () => {
//     setChecked(!checked);
//   };

//   const id = props.singleTask.id;
//   useEffect(() => {
//     if (checked && props.singleTask.status === "in progress") {
//       dispatch(updateTask({ status: "complete" }), id);
//     }
//     if (!checked && props.singleTask.status === "complete") {
//       dispatch(updateTask({ status: "in progress" }, id));
//     }
//   });

//   return (
//     <div>
//       <Form>
//         <Form.Check
//           reverse
//           type="checkbox"
//           id="taskCheckbox"
//           label="completed"
//           onChange={handleChange}
//         />
//       </Form>
//     </div>
//   );
// };

// export default connect(null)(TasksInProgress);
