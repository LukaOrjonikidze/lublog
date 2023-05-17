import { useState } from 'react';
import classes from '../Modules/Blog.module.css';
import Button from '../UI/Button';
import DeleteButton from "../UI/DeleteButton";

const Blog = (props) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);

    const onEdit = () => {
      setEditing(true);
    }

    const onSave = () => {
      setEditing(false);
      fetch('http://localhost:5157/api/Blogs/' + props.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          id: props.id,
          title: title,
          text: text,
        })
      }).then(response => response.json())
        .then(data => console.log(data));
    }
    
    const onDelete = () => {
      fetch('http://localhost:5157/api/Blogs/' + props.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
      }).then(response => response.json())
        .then(data => console.log(data));
      console.log(props.id);
      props.onDelete(props.id);
    }

    
    if (editing){
      return (<form><div className={classes['blog']}>
                <div className={classes['blog-head']}>
                  <input className={classes['blog-title']} value={title} onChange={(e) => setTitle(e.target.value)} />
                  <strong className={classes['blog-author']}>{props.author}</strong>
                </div>
              <textarea className={classes['blog-text']} value={text} onChange={(e) => setText(e.target.value)} />
              <div style={{display: "flex", justifyContent: "space-between", gap: "1rem"}}>
              <Button className={classes['blog-edit']} onClick={onSave}>Save</Button>
                        <Button type="button" onClick={() => setEditing(false)}>Cancel</Button>
                    </div>
          </div>
          </form>
      )
    }

    return (<div className={classes['blog']}>
                <div className={classes['blog-head']}>
                  <strong className={classes['blog-title']}>{title}</strong>
                  <strong className={classes['blog-author']}>{props.author}</strong>
                </div>
              <span className={classes['blog-text']}>{text}</span>
              {props.isAuthor && <div className={classes['blog-controls']}>
                    <Button className={classes['blog-edit']} onClick={onEdit}>Edit</Button>
                    <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                </div>}
          </div>
    )
}

export default Blog