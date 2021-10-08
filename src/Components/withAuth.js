import React from "react";
import { useHistory } from "react-router-dom";
import { getAuth, checkRolesAccepted } from "../utils/helpers";
import { updateRememberedPath } from "../redux/actions/login";
import { useSelector } from "react-redux";

const withAuth = (Component, rolesAccepted = []) => (props) => {
  const auth = getAuth();
  const isAuthenticated = auth.user_login;
  const history = useHistory();

  const isBadToken = useSelector((store) => store.global.isBadToken);

  React.useEffect(() => {
    if (isBadToken) {
      updateRememberedPath(
        props.location ? props.location.pathname + props.location.search : "/"
      );
      history.push("/logout");
    }
  }, [isBadToken, history, props.location]);

  const checkAndRedirect = React.useCallback(() => {
    if (!isAuthenticated) {
      updateRememberedPath(
        props.location ? props.location.pathname + props.location.search : "/"
      );
      return history.push("/login");
    }

    if (!checkRolesAccepted(auth, rolesAccepted)) {
      return history.push("/");
    }
    // eslint-disable-next-line
  }, [history, isAuthenticated, auth]);

  React.useEffect(() => {
    checkAndRedirect();
  }, [checkAndRedirect]);

  return isAuthenticated && !isBadToken ? <Component {...props} /> : null;
};

export default withAuth;
