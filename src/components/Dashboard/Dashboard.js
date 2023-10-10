import { connect } from "react-redux";
import { useState } from 'react';
import Card from "../Card";

const Dashboard = ({ authedUser, questions, users }) => {
  const [answeredQuestions, unansweredQuestions] = useState(1);
  console.log(questions);
  const unanswered = (question) =>
    !question.optionOne.votes?.includes(authedUser.id) &&
    !question.optionTwo.votes?.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes?.includes(authedUser.id) ||
    question.optionTwo.votes?.includes(authedUser.id);

  const setAnsweredQuestions = (value) => {
    unansweredQuestions(value);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9" data-testid="heading">
        Dashboard
      </h1>
      <ul className="flex w-full ml-auto justify-evenly">
        <li>
          <button
            onClick={() => setAnsweredQuestions(1)}
            className={`${answeredQuestions ? "bg-sky-500" : "bg-sky-300"
              } px-3 py-2 font-medium rounded-lg w-64 text-white`}
          >
            New Questions
          </button>
        </li>
        <li>
          <button
            onClick={() => setAnsweredQuestions(0)}
            className={`${answeredQuestions ? "bg-sky-300" : "bg-sky-500"
              } px-3 py-2 font-medium rounded-lg w-64 text-white`}
          >
            Answered Questions
          </button>
        </li>
      </ul>
      <div style={{ display: answeredQuestions === 1 ? "block" : "none" }}>
        <h2 className="mt-6 text-2xl font-bold">New Questions</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {questions.filter(unanswered).map((question) => (
            <li key={question.id}>
              <Card question={question} author={users[question.author]} />
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: answeredQuestions === 0 ? "block" : "none" }}>
        <h2 className="mt-6 text-2xl font-bold">Answered Questions</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {questions.filter(answered).map((question) => (
            <li key={question.id}>
              <Card question={question} author={users[question.author]} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
