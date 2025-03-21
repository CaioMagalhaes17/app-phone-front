import ReactInputMask from 'react-input-mask'
import { Button, IconPencil, IconWhatsApp, Input, Text } from "@app/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { UpdateStoreContacts } from '../../../../../api/user/store/update-contact';
import Swal from 'sweetalert2';
import { useGetStoreContacts } from '../../../../../hooks/profile/useGetStoreContacts';

export function StoreContact() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const client = useQueryClient()

  const { contacts } = useGetStoreContacts()

  const { mutateAsync: updateContact } = useMutation({
    mutationFn: UpdateStoreContacts,
    mutationKey: ['update-contact']
  })


  async function onContactEdit(data: FieldValues) {
    const response = await updateContact({ email: data.email, telNum: data.telNum, wppNum: data.wppNum })
    if (response && response.status === 200) {
      Swal.fire({
        titleText: 'Contatos alterados com sucesso!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Sim',
        padding: '2em',
        customClass: {
          confirmButton: 'btn btn-primary btn-lg m-1',
        },
        buttonsStyling: false,
      }).then(() => {
        client.refetchQueries({ queryKey: ['get-contacts'] })
      })
    }
  }


  return (
    <>
      {contacts && (
        <form onSubmit={handleSubmit(onContactEdit)}>
          <Text className="text-dark dark:text-white mr-auto flex flex-row text-3xl " as="span">Contato</Text>
          <div className="flex flex-col text-lg mt-10">
            <div className="flex items-center flex-row gap-5 mb-10">
              <div className='flex flex-col w-full '>
                <Button className='btn-green w-full flex flex-row gap-2'> <IconWhatsApp />Whatsapp</Button>
                {errors.wppNum && (<span className="text-left text-danger">Campo Obrigatório</span>)}
              </div>
              <div className="w-full flex flex-col">
                <ReactInputMask
                  className="form-input-custom"
                  mask={'(99) 99999-9999'}
                  alwaysShowMask={false}
                  maskPlaceholder="(99) 99999-9999"
                  type={'text'}
                  defaultValue={contacts.wppNum}
                  {...register('wppNum', { required: true })}
                />
              </div>
              <Button type="submit" onClick={() => ''} className="btn-outline-green flex flex-row gap-5"><IconPencil /> {contacts.wppNum ? 'Editar' : 'Adicionar'}</Button>
            </div>
            <div className="flex items-center flex-row gap-5 mb-10">
              <div className="w-full flex flex-col">
                <Text as="span">{'Número de telefone'}</Text>
                <ReactInputMask
                  className="form-input-custom"
                  mask={'(99) 99999-9999'}
                  alwaysShowMask={false}
                  maskPlaceholder="(99) 99999-9999"
                  type={'text'}
                  defaultValue={contacts.telNum}
                  {...register('telNum', { required: true })}
                />
                {errors.telNum && (<span className="text-left text-danger">Campo Obrigatório</span>)}
              </div>
              <Button type="submit" className='btn-outline-primary flex flex-row gap-5 mt-7'><IconPencil />Editar</Button>
            </div>
            <div className="flex items-center flex-row gap-5 mb-10">
              <div className="w-full flex flex-col">
                <Text as="span">{'E-mail'}</Text>
                <Input defaultValue={contacts.email} {...register('email', { required: true })} />
                {errors.email && (<span className="text-left text-danger">Campo Obrigatório</span>)}
              </div>
              <Button type="submit" className='btn-outline-primary flex flex-row gap-5 mt-7'><IconPencil />Editar</Button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}