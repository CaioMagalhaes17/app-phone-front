import { Button, IconPencil, IconSave, Panel, Text } from "@app/ui";
import { formatTopic, getAnswerColor } from "../../../../formaters/solicitations";
import { useEffect, useState } from "react";
import { BatteryFormType, DisplayFormType, ProblemTopicType } from "../../../../types/solicitation";
import { FieldValues, useForm } from "react-hook-form";
import { avaliableTopics, getQuestionsByTopic, getStepTwoAnswersByForm } from "../../../../constants/solicitation-form-questions";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";

export function ProblemForm({ problemForm, topic, solicitationId, canEdit }: { canEdit: boolean, solicitationId: string, topic: string, problemForm: BatteryFormType | DisplayFormType }) {
  const client = useQueryClient()
  const [editMode, setEditMode] = useState(false)
  const { register, watch, handleSubmit } = useForm()
  const [formattedProblem, setFormattedProblem] = useState<{ question: string, answer: string }[]>([])
  const [problemQuestions, setProblemQuestions] = useState<{
    questionId: string;
    question: string;
    options: {
      optionId: string;
      text: string;
    }[];
  }[]>()
  useEffect(() => {
    setFormattedProblem(getStepTwoAnswersByForm(topic, problemForm))
    setProblemQuestions(getQuestionsByTopic(topic))
  }, [])
  useEffect(() => {
    if (watch('topic')) return setProblemQuestions(getQuestionsByTopic(watch('topic')))
  }, [watch()])

  const { mutateAsync } = useMutation({
    mutationKey: ['edit-solicitation'],
    mutationFn: ({ data, solicitationId }: {
      data: { problemTopic: ProblemTopicType, problemForm: BatteryFormType | DisplayFormType }; solicitationId: string
    }) =>
      EditSolicitation({ form: { problemTopic: data.problemTopic, problemForm: data.problemForm } }, solicitationId)
  });

  function onSave(data: FieldValues) {
    if (data.topic === 'battery') {
      const dataToSave = {
        problemForm: {
          'battery-A': data['battery-A'],
          'battery-B': data['battery-B'],
          'battery-C': data['battery-C'],
          'battery-D': data['battery-D'],
          'battery-E': data['battery-E'],
          'battery-F': data['battery-F'],
        },
        problemTopic: data.topic
      }
      editForm(dataToSave)
    }
    if (data.topic === 'display') {
      const dataToSave = {
        problemForm: {
          'display-A': data['display-A'],
          'display-B': data['display-B'],
          'display-C': data['display-C'],
          'display-D': data['display-D'],
          'display-E': data['display-E'],
          'display-F': data['display-F'],
        },
        problemTopic: data.topic
      }
      editForm(dataToSave)
    }
  }

  function editForm(editData: { problemTopic: ProblemTopicType, problemForm: BatteryFormType | DisplayFormType }) {
    Swal.fire({
      titleText: 'Editar solicitação?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await mutateAsync({ data: editData, solicitationId })
        if (response && response.status == 200) {
          client.refetchQueries({ queryKey: ['get-solicitation'] })
          client.refetchQueries({ queryKey: ['get-solicitations'] })
          Swal.fire({
            titleText: 'Solicitação editada com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Sim',
            padding: '2em',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg m-1',
            },
            buttonsStyling: false,
          })
          setEditMode(false)
          window.location.reload()
        }
      }
    })
  }
  return (
    <>
      {formattedProblem.length > 0 && (
        !editMode ? (
          <Panel className="w-full">
            <div className="flex flex-row">
              <Text className="text-white font-extrabold text-2xl" as="h1">Questionário do problema:</Text>
              <div className="mr-auto" />
              {canEdit && (<Button onClick={() => setEditMode(true)} className="btn-primary"><IconPencil /></Button>)}
            </div>
            <div className="flex flex-col mt-6 gap-1 mb-5 mt-10">
              <Text className="font-extrabold text-lg" as="h1">Defeito - <span className="text-white">{formattedProblem[0].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[1].question} - <span className={`text-white`}>{formattedProblem[1].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[2].question} - <span className={`text-${getAnswerColor(formattedProblem[2].answer)}`}>{formattedProblem[2].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[3].question} - <span className={`text-${getAnswerColor(formattedProblem[3].answer)}`}>{formattedProblem[3].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[4].question} - <span className={`text-${getAnswerColor(formattedProblem[4].answer)}`}>{formattedProblem[4].answer}</span></Text>
              <Text className="font-extrabold text-lg" as="h1">{formattedProblem[5].question} - <span className={`text-${getAnswerColor(formattedProblem[5].answer)}`}>{formattedProblem[5].answer}</span></Text>
            </div>
          </Panel>
        ) : (
          <Panel className="w-full">
            <form onSubmit={handleSubmit(onSave)}>
              <div className="flex flex-row">
                <Text className="text-white font-extrabold text-2xl" as="h1">Questionário do problema:</Text>
                <div className="mr-auto" />
                <Button className="btn-primary flex flex-row gap-2"><IconSave />Salvar</Button>
              </div>
              <div className="flex flex-col mt-6 gap-3 mb-5 mt-10">
                <Text className="font-extrabold text-lg" as="h1">Raiz do problema - <select {...register('topic')} defaultValue={topic} className="form-select rounded bg-black form-select-lg text-white">{avaliableTopics.map((item: ProblemTopicType) => <option key={item} value={item}>{formatTopic(item)}</option>)}</select></Text>
                <Text className="font-extrabold text-lg" as="h1">Defeito -<select className="form-select rounded bg-black form-select-lg text-white" {...register(problemQuestions[0].questionId)}>{problemQuestions[0].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
                <Text className="font-extrabold text-lg" as="h1">{problemQuestions[1].question} - <select className="form-select rounded bg-black form-select-lg text-white" {...register(problemQuestions[1].questionId)}>{problemQuestions[1].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
                <Text className="font-extrabold text-lg" as="h1">{problemQuestions[2].question} - <select className="form-select rounded bg-black form-select-lg text-white" {...register(problemQuestions[2].questionId)}>{problemQuestions[2].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
                <Text className="font-extrabold text-lg" as="h1">{problemQuestions[3].question} - <select className="form-select rounded bg-black form-select-lg text-white" {...register(problemQuestions[3].questionId)}>{problemQuestions[3].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
                <Text className="font-extrabold text-lg" as="h1">{problemQuestions[4].question} - <select className="form-select rounded bg-black form-select-lg text-white" {...register(problemQuestions[4].questionId)}>{problemQuestions[4].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
                <Text className="font-extrabold text-lg" as="h1">{problemQuestions[5].question} - <select className="form-select rounded bg-black form-select-lg text-white" {...register(problemQuestions[5].questionId)}>{problemQuestions[5].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
              </div>
            </form>
          </Panel>
        )
      )}
    </>
  )
}