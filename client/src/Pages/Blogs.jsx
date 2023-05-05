import { useEffect, useState } from "react";
import Blog from "../Components/Blog";
import classes from "../Modules/Blogs.module.css";
import Authorization from "../Components/Authorization";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  }); 

  useEffect(() => {
    fetch('https://localhost:7026/api/Blogs')
      .then(response => response.json())
      .then(data => {
        setBlogs(data.$values);
      });
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token') !== 'null' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined){
      fetch('https://localhost:7026/api/Auth', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email
        });
      });
    }
  }, [])


  const handleDelete = (id) => {
      setBlogs(blogs.filter(item => item.id !== id));
  }
  const handleSave = (title, text) => {
    fetch('https://localhost:7026/api/Blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: title,
        text: text
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setBlogs(prevValue => [{id: data.id, title: data.title, text: data.text, user: data.user}, ...prevValue]);
    });
  }

  const handleLogin = (userId, name, email) => {
    setUser({
      id: userId,
      name: name,
      email: email
    });
  }

  const handleLogout = () => {
    setUser({
      id: "",
      name: "",
      email: ""
    });
    localStorage.removeItem('token');
  }

  return (
    <div className={classes['blogs-page']}>
      <div className={classes["blogs"]}>
          {blogs.map(item => (
              <Blog
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  author={item.user.name}  
                  text={item.text}
                  isAuthor={item.user.email === user.email}
                  onDelete={handleDelete}
              />
          ))}
        </div>
          <div className={classes['aside-div']}>
            <Authorization onLogin={handleLogin} onLogout={handleLogout} onBlogSave={handleSave} user={user} />

          </div>
    
    </div>
  )
}

export default Blogs