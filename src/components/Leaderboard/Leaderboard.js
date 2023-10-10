import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">Leaderboard</h1>

      <table className="border-collapse table-auto w-full text-sm mt-6">
        <thead className="table-header-group">
          <tr className="table-row">
            <th className="border-b dark:border-slate-600 text-xl p-4 pl-8 pt-0 pb-3  text-sky-500 text-left">
              User
            </th>
            <th className="border-b dark:border-slate-600 ftext-xl p-4 pl-8 pt-0 pb-3  text-sky-500 text-left">
              Answered
            </th>
            <th className="border-b dark:border-slate-600 text-xl p-4 pl-8 pt-0 pb-3  text-sky-500 text-left">
              Created
            </th>
          </tr>
        </thead>
        <tbody className=" text-sky-400">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8  text-sky-400">
                <span className="font-bold">{user.name}</span>
                <br />
                {user.id}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8  text-sky-400">
                {Object.keys(user.answers).length}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8  text-sky-400">
                {user.questions.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  ),
});

export default connect(mapStateToProps)(Leaderboard);
