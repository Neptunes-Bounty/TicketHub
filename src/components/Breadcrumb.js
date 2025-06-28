import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

export default function BreadcrumbNav() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(x => x);

  // Map of path names to display names
  const pathNames = {
    movies: 'Movies',
    concerts: 'Concerts',
    trains: 'Train Tickets',
    mybookings: 'My Bookings',
    wallet: 'Wallet',
    signup: 'Sign Up'
  };

  return paths.length > 0 ? (
    <Breadcrumb className="px-3 py-2 bg-light">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>
      {paths.map((path, index) => {
        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const displayName = pathNames[path] || path;

        return isLast ? (
          <Breadcrumb.Item active key={path}>
            {displayName}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            key={path}
            linkAs={Link}
            linkProps={{ to: routeTo }}
          >
            {displayName}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  ) : null;
}