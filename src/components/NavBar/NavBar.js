import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../../actions/authedUser";

const Nav = ({ dispatch, authedUserId }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };

  return (
    <nav className="flex justify-start space-x-4 bg-amber-300">
      <Link
        to="/"
        className="px-3 py-2 font-medium rounded-lg hover:scale-75 text-sky-700 hover:bg-sky-400 hover:text-white"
      >
        Home
      </Link>
      <Link
        to="/leaderboard"
        className="px-3 py-2 font-medium rounded-lg hover:scale-75 text-sky-700 hover:bg-sky-400 hover:text-white"
      >
        Leaderboard
      </Link>
      <Link
        to="/new"
        className="px-3 py-2 font-medium rounded-lg hover:scale-75 text-sky-700 hover:bg-sky-400 hover:text-white"
      >
        New Poll
      </Link>
      <span
        className="flex-1 px-3 py-2 font-medium text-right text-sky-700"
        data-testid="user-information"
      >
        Login User: {authedUserId}
      </span>
      <button
        onClick={logout}
        className="px-3 py-2 font-medium rounded-lg hover:scale-75 text-sky-700 hover:bg-sky-400 hover:text-white"
      >
        Logout
      </button>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
});

export default connect(mapStateToProps)(Nav);
