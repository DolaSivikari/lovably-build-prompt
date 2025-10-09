import { Link } from "react-router-dom";
import { CategoryItem } from "@/data/navigation-structure";
import { ArrowRight } from "lucide-react";

interface MegaMenuDetailProps {
  category: CategoryItem;
  onLinkClick: () => void;
}

export const MegaMenuDetail = ({ category, onLinkClick }: MegaMenuDetailProps) => {
  return (
    <div className="mega-menu-detail">
      <h3 className="mega-menu-detail-title">{category.title}</h3>
      
      <Link 
        to={category.link} 
        className="mega-menu-detail-cta"
        onClick={onLinkClick}
      >
        Learn more about {category.title} <ArrowRight className="inline-block ml-1 h-4 w-4" />
      </Link>
      
      <p className="mega-menu-detail-description">{category.description}</p>
      
      <ul className="mega-menu-detail-sublist">
        {category.subItems.map((item, index) => (
          <li key={index}>
            <Link 
              to={item.link} 
              className="mega-menu-detail-link"
              onClick={onLinkClick}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};