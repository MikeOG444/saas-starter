/*
  A wrapper around React Router that adds a useRouter() hook so that any component
  can easily access params, location, history, and trigger navigation.
  Import from this file instead of react-router-dom directly.
*/

import React, { useMemo, useEffect } from "react";
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
  Link,
  NavLink,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import queryString from "query-string";

// Use a custom history object and pass to Router so that we
// can utilize history.listen() where needed (such as for pageview tracking)
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

// Export our <Router> component
// Includes custom history object and component for auto-scrolling to top
export function Router({ children }) {
  return (
    <HistoryRouter history={history}>
      <ScrollToTop />
      {children}
    </HistoryRouter>
  );
}

// Custom useRouter hook for getting route data and methods inside any component.
// NOTE: This hook includes all React Router hooks, which can result in extra re-renders
// in some cases. When needed, you can optimize performance by importing the specific hook
// you need (such as useParams or useLocation) instead of this custom useRouter hook.
export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = useMemo(() => {
    return {
      ...queryString.parse(location.search || ""),
      ...params,
    };
  }, [location.search, params]);

  return useMemo(() => {
    const push = (to, options) => navigate(to, { ...(options || {}), replace: false });
    const replace = (to, options) => navigate(to, { ...(options || {}), replace: true });

    return {
      params,
      location,
      history,
      match: undefined,
      push,
      replace,
      navigate,
      pathname: location.pathname,
      query,
    };
  }, [params, location, navigate, query]);
}

// Remove or customize if you need more advanced scroll behavior
// and don't want to always scroll to top when location.pathname changes.
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export { Route, Routes, Link, NavLink, useParams, useLocation, useNavigate };
