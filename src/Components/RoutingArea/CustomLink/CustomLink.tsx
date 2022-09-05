import { NavLink } from "react-router-dom";
import { useResolvedPath, useMatch, Link } from "react-router-dom";
import "./CustomLink.css";

interface CustomLinkProps {
  to: string;
  children: any;
}

function CustomLink(props: CustomLinkProps): JSX.Element {
  //let resolved = useResolvedPath(props.to);
  //let match = useMatch({ path: resolved.pathname, end: true });
  //<Link className={match?"CustomLink active":"CustomLink"} to={props.to}>{props.children}</Link>
  return (
    <div className="CustomLink">
      <NavLink className="CustomLink" to={props.to}>
        {props.children}
      </NavLink>
    </div>
  );
}

export default CustomLink;
