import { useState, useRef } from "react";
import classes from "../Modules/AddBlog.module.css";

const AddBlog = (props) => {
    const titleRef = useRef();
    const textRef = useRef();
    const [adding, setAdding] = useState(false);

  return (
    <>
        {adding ? 
            <>
                <input placeholder="title" ref={titleRef}/>
                <textarea ref={textRef} placeholder="Text"></textarea>
                <button className={classes['save-button']} onClick={() => {
                    setAdding(false);
                    props.onSave(titleRef.current.value, textRef.current.value);
                    }}>Save</button>
            </> 
        : 
            <button className={classes['add-button']} onClick={() => setAdding(true)}>Add</button>}
    </>
  )
}

export default AddBlog