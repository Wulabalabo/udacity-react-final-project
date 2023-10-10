import { Navigate, Outlet} from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children,loggedIn }) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];
  
    if(!loggedIn) {
      return <Navigate to={`/login?redirectUrl=${redirectUrl}`} />;
    }
  return <Outlet />;
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
