import * as React from 'react';
import { Link } from 'react-router-dom';

const linkStyle: React.CSSProperties = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'blue',
  fontSize: '12px',
};

interface StyledLinkProps {
  to: string;
  linkStyle?: React.CSSProperties | null;
  children: React.ReactNode;
}

export const StyledLink = (props: StyledLinkProps) => {
  return (
    <Link to={props.to} style={props.linkStyle ?? linkStyle}>
      {props.children}
    </Link>
  );
};
