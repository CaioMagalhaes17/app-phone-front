import { Button, IconPencil, Panel, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { ProblemFormType } from "../../../../types/solicitation";
import { getStepTwoAnswersByForm } from "../../../../constants/solicitation-form-questions";
import { getAnswerColor } from "../../../../formaters/solicitations";
import { EditProblemForm } from "./EditProblemForm";

export function ProblemFormComponent({ topic, problemForm, canEdit, solicitationId }: { solicitationId: string, canEdit?: boolean, problemForm: ProblemFormType, topic: string }) {
  const [formattedProblem, setFormattedProblem] = useState<{ question: string, answer: string }[]>([])
  const [editMode, setEditMode] = useState(false)
  useEffect(() => {
    setFormattedProblem(getStepTwoAnswersByForm(topic, problemForm))
  }, [problemForm])
  return (
    <>
      {formattedProblem.length > 0 && (
        !editMode ? (
          <Panel className="w-full font-bold">
            <div className="flex flex-row">
              <Text className="text-dark dark:text-white text-2xl" as="h1">Sobre o problema:</Text>
              <div className="mr-auto" />
              {canEdit && (<Button onClick={() => setEditMode(true)} className="btn-primary"><IconPencil /></Button>)}
            </div>
            <div className="flex flex-col mt-6 gap-1 mb-5 mt-10">
              {formattedProblem.map((item, i) => (
                <>
                  <Text className="text-dark dark:text-white text-lg" as="h1">{i === 0 ? 'Defeito' : item.question} - <span className={getAnswerColor(item.answer)}>{item.answer}</span></Text>
                </>
              ))}
            </div>
          </Panel>
        ) : (
          <EditProblemForm problemForm={problemForm} setEditMode={setEditMode} solicitationId={solicitationId} topic={topic} />
        )
      )}
    </>
  )
}