import { useSelector, connect } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { handleAddAnswer } from "../../actions/questions";

const PollPage = ({ dispatch }) => {
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  
  const question = Object.values(questions).find(
    (question) => question.id === id
  );
  const author = Object.values(users).find(
    (user) =>
    {
      if(question!==undefined){
        return user.id === question.author;
      }
      return null;
    }
  );
  if (!authedUser || !question || !author) {
    console.log(`${!authedUser} || ${!question} || !${author}}`);
    //navigate("/*");
    return <Navigate to="/*"/>;
  }

  const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal).toFixed(2) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal).toFixed(2) * 100 + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">Poll by {author.id}</h1>

      <div className="flex justify-center">
        <img src={author.avatarURL} alt="Profile" className="w-24 h-24" />
      </div>

      <div className="flex justify-center">
        <h2 className="mt-6 text-2xl font-bold">Would you rather?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={handleOptionOne}
          disabled={hasVoted}
          className={
            "p-2 rounded-xl bg-amber-300 hover:shadow-xl transition " +
            (hasVotedForOptionOne ? "bg-sky-400 text-white" : "")
          }
        >
          <div className={hasVotedForOptionOne ? "chosen" : ""}>
            <p className="mb-2 font-bold">{question.optionOne.text}</p>
            {!hasVoted && (
              <p className="mb-3 underline underline-offset-4">Click</p>
            )}
            {hasVoted && (
              <p className="text-xs">
                Votes: {question.optionOne.votes.length} (
                {calcPercentage("optionOne", question)})
              </p>
            )}
          </div>
        </button>

        <button
          onClick={handleOptionTwo}
          disabled={hasVoted}
          className={
            "p-2 rounded-xl bg-amber-300 hover:shadow-xl transition " +
            (hasVotedForOptionTwo ? "bg-sky-400 text-white" : "")
          }
        >
          <p className="mb-2 font-bold">{question.optionTwo.text}</p>
          {!hasVoted && (
            <p className="mb-3 underline underline-offset-4">Click</p>
          )}
          {hasVoted && (
            <p className="text-xs">
              Votes: {question.optionTwo.votes.length} (
              {calcPercentage("optionTwo", question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

export default connect ()(PollPage);
