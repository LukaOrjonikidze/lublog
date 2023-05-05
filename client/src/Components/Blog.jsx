import { useState } from 'react';
import classes from '../Modules/Blog.module.css';

const Blog = (props) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [author, setAuthor] = useState(props.author);
    const [text, setText] = useState(props.text);

    const onEdit = () => {
      setEditing(true);
    }

    const onSave = () => {
      setEditing(false);
      fetch('https://localhost:7026/api/Blogs/' + props.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          id: props.id,
          title: title,
          author: author,
          text: text,
        })
      }).then(response => response.json())
        .then(data => console.log(data));
    }
    
    const onDelete = () => {
      fetch('https://localhost:7026/api/Blogs/' + props.id, {
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
                  <input className={classes['blog-author']} value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
              <textarea className={classes['blog-text']} value={text} onChange={(e) => setText(e.target.value)} />
              <button className={classes['blog-edit']} onClick={onSave}>Save</button>
          </div>
          </form>
      )
    }

    return (<div className={classes['blog']}>
                <div className={classes['blog-head']}>
                  <strong className={classes['blog-title']}>{title}</strong>
                  <strong className={classes['blog-author']}>{author}</strong>
                </div>
              <span className={classes['blog-text']}>{text}</span>
              {props.isAuthor && <div className={classes['blog-controls']}>
                    <button className={classes['blog-edit']} onClick={onEdit}>Edit</button>
                    <button className={classes['blog-delete']} onClick={onDelete}>Delete</button>
                </div>}
          </div>
    )
}

export default Blog