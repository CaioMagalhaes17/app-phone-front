import { Button, IconSave, IconX, Panel, Text } from "@app/ui";
import { formatTopic } from "../../../../formaters/solicitations";
import { useEffect, useState } from "react";
import { ProblemFormType, ProblemTopicType } from "../../../../types/solicitation";
import { FieldValues, useForm } from "react-hook-form";
import { avaliableTopics, getQuestionsByTopic } from "../../../../constants/solicitation-form-questions";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";

export function EditProblemForm({ topic, solicitationId, setEditMode }: { setEditMode: React.Dispatch<React.SetStateAction<boolean>>, solicitationId: string, topic: string, problemForm: ProblemFormType }) {
  const client = useQueryClient()
  const { register, watch, handleSubmit } = useForm()
  const [problemQuestions, setProblemQuestions] = useState<{
    questionId: string;
    question: string;
    options: {
      optionId: string;
      text: string;
    }[];
  }[]>()
  useEffect(() => {
    setProblemQuestions(getQuestionsByTopic(topic))
  }, [])
  useEffect(() => {
    if (watch('topic')) return setProblemQuestions(getQuestionsByTopic(watch('topic')))
  }, [watch()])

  const { mutateAsync } = useMutation({
    mutationKey: ['edit-solicitation'],
    mutationFn: ({ data, solicitationId }: {
      data: { problemTopic: ProblemTopicType, problemForm: ProblemFormType }; solicitationId: string
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

  function editForm(editData: { problemTopic: ProblemTopicType, problemForm: ProblemFormType }) {
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
      {problemQuestions && (
        <Panel className="w-full">
          <form onSubmit={handleSubmit(onSave)}>
            <div className="flex flex-row">
              <Text className="text-dark dark:text-white font-extrabold text-2xl" as="h1">Questionário do problema:</Text>
              <div className="mr-auto" />
              <Button type="button" onClick={() => setEditMode(false)} className="btn-danger flex flex-row gap-2 mr-2"><IconX />Cancelar</Button>
              <Button className="btn-primary flex flex-row gap-2"><IconSave />Salvar</Button>
            </div>
            <div className="flex flex-col mt-6 gap-3 mb-5 mt-10">
              <Text className="font-extrabold text-lg" as="h1">Raiz do problema - <select {...register('topic')} defaultValue={topic} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white">{avaliableTopics.map((item: ProblemTopicType) => <option key={item} value={item}>{formatTopic(item)}</option>)}</select></Text>
              <Text className="font-extrabold text-lg" as="h1">Defeito -<select className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white" {...register(problemQuestions[0].questionId)}>{problemQuestions[0].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
              <Text className="font-extrabold text-lg" as="h1">{problemQuestions[1].question} - <select className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white" {...register(problemQuestions[1].questionId)}>{problemQuestions[1].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
              <Text className="font-extrabold text-lg" as="h1">{problemQuestions[2].question} - <select className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white" {...register(problemQuestions[2].questionId)}>{problemQuestions[2].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
              <Text className="font-extrabold text-lg" as="h1">{problemQuestions[3].question} - <select className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white" {...register(problemQuestions[3].questionId)}>{problemQuestions[3].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
              <Text className="font-extrabold text-lg" as="h1">{problemQuestions[4].question} - <select className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white" {...register(problemQuestions[4].questionId)}>{problemQuestions[4].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
              <Text className="font-extrabold text-lg" as="h1">{problemQuestions[5].question} - <select className="form-select roundeddark:bg-black form-select-lg text-dark dark:text-white" {...register(problemQuestions[5].questionId)}>{problemQuestions[5].options.map((item) => <option value={item.optionId}>{item.text}</option>)}</select></Text>
            </div>
          </form>
        </Panel>
      )}
    </>
  )
}