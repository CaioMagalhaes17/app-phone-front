import { Text } from "@app/ui";
import { getQuestionsByTopic } from "../../../../../constants/solicitation-form-questions";
import { useForm } from "react-hook-form";

export function DefaultForm({ topicSelected }: { topicSelected: string }) {
  const questions = getQuestionsByTopic(topicSelected)
  const { register, watch } = useForm()

  return (
    <>
      <form>
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
                <select {...register(questions[0].questionId)} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option value="default">Selecione</option>
                  {questions[0].options.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item.optionId}>{item.text}</option>
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
                <select {...register(questions[1].questionId)} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option value="default">Selecione</option>
                  {questions[1].options.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item.optionId}>{item.text}</option>
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
                  <select {...register(questions[2].questionId)} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                    <option value="default">Selecione</option>
                    {questions[2].options.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.optionId}>{item.text}</option>
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
                  <select {...register(questions[3].questionId)} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                    <option value="default">Selecione</option>
                    {questions[3].options.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.optionId}>{item.text}</option>
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
                  <select {...register(questions[4].questionId)} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                    <option value="default">Selecione</option>
                    {questions[4].options.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.optionId}>{item.text}</option>
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
                  <select {...register(questions[5].questionId)} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                    <option value="default">Selecione</option>
                    {questions[5].options.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.optionId}>{item.text}</option>
                        </>
                      )
                    })}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </>
  )
}