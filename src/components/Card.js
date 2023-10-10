import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ question, author }) => {
  return (
    <Link to={"questions/" + question.id}>
      <div className="flex items-center max-w-sm p-2 m-3 mx-auto space-x-4 transition shadow-md rounded-xl hover:shadow-xl bg-amber-300">
        <div className="shrink-0">
          <img className="w-12 h-12" src={author?.avatarURL} alt="Author" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">
            {question.author}
          </div>
          <p className="text-xs italic">
            {new Date(question.timestamp).toDateString()}
          </p>
          <p className="underline underline-offset-4">Show</p>
        </div>
      </div>
    </Link>
  );
};

export default connect()(Card);
