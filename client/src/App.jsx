import classes from './Modules/App.module.css';
import DUMMY_BLOGS from './DUMMY_BLOGS';
import Blogs from './Pages/Blogs';

const App = () => {
  return (
    <Blogs items={DUMMY_BLOGS} />
  )
}

export default App;

