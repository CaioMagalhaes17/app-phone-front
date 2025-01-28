import { Text } from "@app/ui";
import { getQuestionsByKosky } from "../../../../../constants/solicitation-form-questions";

export function StepTwo({ topicSelected }: { topicSelected: string }) {
  const questions = getQuestionsByKosky(topicSelected)
  console.log(questions)
  return (
    <>
      {questions && (
        <div className="mt-5">
          {/* Linha 1 */}
          <div className="flex items-center !mb-10">
            <div className="flex-1 p-4">
              <Text
                className="font-extrabold text-xl text-white"
                as="span"
              >
                {questions[0].question}
              </Text>
              <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                <option>Selecione</option>
                {questions[0].options.map((item) => {
                  return (
                    <>
                      <option>{item.text}</option>
                    </>
                  )
                })}
              </select>
            </div>
            <div className="flex-1 p-4">
              <Text
                className="font-extrabold text-xl text-white"
                as="span"
              >
                {questions[1].question}
              </Text>
              <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                <option>Selecione</option>
                {questions[1].options.map((item) => {
                  return (
                    <>
                      <option>{item.text}</option>
                    </>
                  )
                })}
              </select>
            </div>
          </div>
          {/* Linha 2 */}
          {questions.length >= 3 && (
            <div className="flex items-center !mb-10">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[2].question}
                </Text>
                <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option>Selecione</option>
                  {questions[2].options.map((item) => {
                    return (
                      <>
                        <option>{item.text}</option>
                      </>
                    )
                  })}
                </select>
              </div>
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[3].question}
                </Text>
                <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option>Selecione</option>
                  {questions[3].options.map((item) => {
                    return (
                      <>
                        <option>{item.text}</option>
                      </>
                    )
                  })}
                </select>
              </div>
            </div>
          )}

          {/* Linha 3 */}
          {questions.length >= 5 && (
            <div className="flex items-center">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[4].question}
                </Text>
                <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option>Selecione</option>
                  {questions[4].options.map((item) => {
                    return (
                      <>
                        <option>{item.text}</option>
                      </>
                    )
                  })}
                </select>
              </div>
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[5].question}
                </Text>
                <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option>Selecione</option>
                  {questions[5].options.map((item) => {
                    return (
                      <>
                        <option>{item.text}</option>
                      </>
                    )
                  })}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

    </>
  )
}