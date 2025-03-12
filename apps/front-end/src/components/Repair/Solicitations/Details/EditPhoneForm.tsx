import { Button, IconSave, IconX, Input, Panel, Text } from "@app/ui";
import { appleModels, phoneQuestions, samsungModels, xiaomiModels } from "../../../../constants/solicitation-form-questions";
import { PhoneFormType } from "../../../../types/solicitation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";
import Swal from "sweetalert2";
import { SearchModelsInput } from "../../../../components/Repair/Solicitations/Create/Phone-Details/SearchModelsInput";

export function EditPhoneForm({ solicitationId, setEditMode }: { setEditMode: React.Dispatch<React.SetStateAction<boolean>>, solicitationId: string }) {
  const { register, handleSubmit, watch } = useForm()
  const [brand, setBrand] = useState('')
  const [searchModel, setSearchModel] = useState('')
  const client = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: ['edit-solicitation'],
    mutationFn: ({ data, solicitationId }: {
      data: Partial<PhoneFormType>; solicitationId: string
    }) =>
      EditSolicitation({ form: { phoneForm: data } }, solicitationId)
  });

  function handleSave(data: FieldValues) {
    if (brand === 'custom') {
      const editData: PhoneFormType = {
        brand: data.brand,
        model: data.customModel,
        previousRepair: data.previousRepair,
        originalHardware: data.originalHardware,
        usageTime: data.usageTime
      }
      editForm(editData)
    }

    if (brand === 'apple') {
      const editData = {
        brand: data.brand,
        model: data.model,
        previousRepair: data.previousRepair,
        originalHardware: data.originalHardware,
        usageTime: data.usageTime
      }
      editForm(editData)

    }

    if (brand === 'samsung' || brand === 'xiaomi' || brand === 'motorola') {
      const editData = {
        brand: data.brand,
        model: searchModel,
        previousRepair: data.previousRepair,
        originalHardware: data.originalHardware,
        usageTime: data.usageTime
      }
      editForm(editData)
    }


  }

  function editForm(editData: Partial<PhoneFormType>) {
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
        }
      }
    })
  }

  useEffect(() => {
    if (watch(phoneQuestions[0].questionId)) return setBrand(watch(phoneQuestions[0].questionId))
  }, [watch()])
  return (
    <>

      <Panel className="w-full border border-primary">
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="flex flex-row">
            <Text className="text-dark dark:text-white font-extrabold text-2xl" as="h1">Questionário do celular:</Text>
            <div className="mr-auto" />
            <Button type="button" onClick={() => setEditMode(false)} className="btn-danger flex flex-row gap-2 mr-2"><IconX />Cancelar</Button>
            <Button className="btn-primary flex flex-row gap-2"><IconSave />Salvar</Button>
          </div>
          <div className="flex flex-col mt-6 gap-1 mb-5">
            <Text className="font-extrabold text-lg" as="h1">Marca - <select {...register(phoneQuestions[0].questionId)} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white">{phoneQuestions[0].options.map((item) => {
              return <option value={item.optionId}>{item.text}</option>
            })}</select></Text>

            {brand === 'apple' && (<Text className="font-extrabold text-lg" as="h1">Modelo - <select {...register(phoneQuestions[1].questionId)} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white">{appleModels.map((item) => {
              return <option value={item}>{item}</option>
            })}</select></Text>)}

            {brand === 'samsung' && (<Text className="font-extrabold text-lg" as="h1">Modelo - <SearchModelsInput searchModel={searchModel} setSearchModel={setSearchModel} brand={'Samsung'} phoneModels={samsungModels} /></Text>)}
            {brand === 'xiaomi' && (<Text className="font-extrabold text-lg" as="h1">Modelo - <SearchModelsInput searchModel={searchModel} setSearchModel={setSearchModel} brand={'Xiaomi'} phoneModels={xiaomiModels} /></Text>)}
            {brand === 'custom' && (<Text className="font-extrabold text-lg" as="h1">Modelo - <Input {...register('customModel')} placeholder="Digite o modelo do aparelho" /></Text>)}

            <Text className="font-extrabold text-lg" as="h1">{phoneQuestions[2].question} - <select {...register(phoneQuestions[2].questionId)} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white">{phoneQuestions[2].options.map((item) => {
              return <option value={item.optionId}>{item.text}</option>
            })}</select></Text>
            <Text className="font-extrabold text-lg" as="h1">{phoneQuestions[3].question} - <select {...register(phoneQuestions[3].questionId)} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white">{phoneQuestions[3].options.map((item) => {
              return <option value={item.optionId}>{item.text}</option>
            })}</select></Text>
            <Text className="font-extrabold text-lg" as="h1">{phoneQuestions[4].question} - <select {...register(phoneQuestions[4].questionId)} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white">{phoneQuestions[4].options.map((item) => {
              return <option value={item.optionId}>{item.text}</option>
            })}</select></Text>
          </div>
        </form>
      </Panel>
    </>
  )
} 