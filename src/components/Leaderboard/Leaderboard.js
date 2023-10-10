import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">Leaderboard</h1>

      <table className="w-full mt-6 text-sm border-collapse table-auto">
        <thead className="table-header-group">
          <tr className="table-row">
            <th className="p-4 pt-0 pb-3 pl-8 text-xl text-left border-b dark:border-slate-600 text-sky-500">
              User
            </th>
            <th className="p-4 pt-0 pb-3 pl-8 text-left border-b dark:border-slate-600 ftext-xl text-sky-500">
              Answered
            </th>
            <th className="p-4 pt-0 pb-3 pl-8 text-xl text-left border-b dark:border-slate-600 text-sky-500">
              Created
            </th>
          </tr>
        </thead>
        <tbody className=" text-sky-400">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-4 pl-8 border-b border-slate-100 dark:border-slate-700 text-sky-400">
                <img className="w-12 h-12" src={user?.avatarURL} alt="Author" />
                <span className="font-bold">{user.name}</span>
                <br />                
                {user.id}
              </td>
              <td className="p-4 pl-8 border-b border-slate-100 dark:border-slate-700 text-sky-400">
                {Object.keys(user.answers).length}
              </td>
              <td className="p-4 pl-8 border-b border-slate-100 dark:border-slate-700 text-sky-400">
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
    (a, b) => Object.keys(a.answers).length - Object.keys(b.answers).length
  ),
});

export default connect(mapStateToProps)(Leaderboard);
