import { ReactComponent as ArrowIcon } from "./arrow.svg";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./RedirectLink.module.css";

interface RedirectLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export const RedirectLink: React.FC<RedirectLinkProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  return (
    <Link to={href} {...props} className={cn(styles.link, className)}>
      {children}
      <ArrowIcon />
    </Link>
  );
};
