import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">User Listing</Link></li>
          <li><Link to="/posts">Post Listing</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
