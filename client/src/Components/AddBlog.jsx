import { useState, useRef } from "react";
import classes from "../Modules/AddBlog.module.css";
import Button from "../UI/Button";

const AddBlog = (props) => {
    const titleRef = useRef();
    const textRef = useRef();
    const [adding, setAdding] = useState(false);

  return (
    <>
        {adding ? 
            <>
                <input placeholder="Title" ref={titleRef}/>
                <textarea ref={textRef} placeholder="Text"></textarea>
                
                <div style={{display: "flex", justifyContent: "space-between", gap: "1rem"}}>
                        <Button className={classes['save-button']} onClick={() => {
                            setAdding(false);
                            props.onSave(titleRef.current.value, textRef.current.value);
                            }}>Save</Button>
                        <Button type="button" onClick={() => setAdding(false)}>Cancel</Button>
                    </div>
            </> 
        : 
            <Button className={classes['add-button']} onClick={() => setAdding(true)}>Add</Button>}
    </>
  )
}

export default AddBlog