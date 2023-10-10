const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");
describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "mtsamis",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionTwo",
    });
    expect(response).toBeTruthy();
  });

  it("should return error for Invalid parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "mtsamis",
      qid: undefined,
      answer: "optionOne",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
describe("_saveQuestion", () => {
  it("should return true for correct parameters", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: {id:"Saraheden"},
    };
    const result = await _saveQuestion(question);
    expect(result).toEqual({
      author: "Saraheden" ,
      id: expect.any(String),
      optionOne: { text: "Option One", votes: [] },
      optionTwo: { text: "Option Two", votes: [] },
      timestamp: expect.any(Number),
    });
  });

  it("should return error for Invalid parameters", async () => {
    const response = await _saveQuestion({
      optionOneText: "first",
      optionTwoText: "second",
      author: undefined,
    }).catch((e) => e);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});