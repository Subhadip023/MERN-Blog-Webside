import React from "react";
import { Link } from 'react-router-dom'


const categories = [
  "Science News",
  "Technology Trends",
  "Innovation and Startups",
  "Gadgets and Gear Reviews",
  "How-To Guides and Tutorials",
  "Science Education and Outreach",
  "Future Tech and Futurism",
  "Tech and Society",
  "Data Science and Analytics",
  "Entrepreneurship and Business",
  "Internet and Digital Culture",
  "Green Tech and Sustainability"
];

function Footer() {


  return (
    <footer>
       <ul className="footer_categories">
      {categories.map(category => (
        <li key={category}>
          <Link to={`/posts/categories/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
      <div className="footer_copyright">
        <small>
          All Right Resolved &copy; copyright, TechTrove Tribune 
        </small>
      </div>
    </footer>
  );
}

export default Footer;
