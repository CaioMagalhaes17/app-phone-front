import { useEffect, useState } from "react";
import { EditProductsRow } from "../../../../components/Market/Products/row/EditProductsRow";
import { useGetStoreProductsRows } from "../../../../hooks/products/useGetStoreProductsRows";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductsRows } from "../../../../api/products/update-products-row";
import Swal from "sweetalert2";
import { Button, IconArrowBackward, IconPlus, Text, VSeparator } from "@app/ui";
import { useNavigate } from "react-router-dom";
import { DeleteProductsRow } from "../../../../api/products/delete-products-row";
import { CreateProductsRows } from "../../../../api/products/create-products-row";
import { CreateProductsRow } from "../../../../components/Market/Products/row/CreateProductsRow";

export function StoreProductsRowEdit() {
  const [newRow, setNewRow] = useState<boolean>(false)
  const { isLoading, rows } = useGetStoreProductsRows()
  const [updateRowData, setUpdateRowData] = useState<{ id: string, name: string, isActive: boolean }>({ id: '', name: '', isActive: false })
  const { mutateAsync } = useMutation({
    mutationFn: UpdateProductsRows
  })

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: DeleteProductsRow
  })

  const { mutateAsync: mutateCreate } = useMutation({
    mutationFn: CreateProductsRows
  })
  const client = useQueryClient()
  useEffect(() => {
    if (updateRowData.id !== '') {
      mutateAsync(updateRowData, {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Prateleira alterada com sucesso!'
          })

          client.refetchQueries({ queryKey: ['get-products-rows'] })
          client.refetchQueries({ queryKey: ['get-products'] })
        }
      })
    }
  }, [updateRowData])

  async function onRowDelete(id: string) {
    Swal.fire({
      titleText: 'Excluir Prateleira?',
      text: 'ATENÇÃO! TODOS OS PRODUTOS DA PRATELEIRA SERÃO EXCLUÍDOS TAMBÉM!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'CANCELAR',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-green btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await mutateDelete(id)
        if (response && response.status == 200) {
          client.refetchQueries({ queryKey: ['get-products-rows'] })
          client.refetchQueries({ queryKey: ['get-products'] })

          Swal.fire({
            titleText: 'Prateleira excluida com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok',
            padding: '2em',
            customClass: {
              confirmButton: 'btn btn-primary btn-lg m-1',
            },
            buttonsStyling: false,
          })
        }
      }
    })
  }

  async function onNewRowSubmit(data: { name: string, isActive: boolean }) {
    await mutateCreate(data, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Prateleira criada com sucesso!'
        })
        client.refetchQueries({ queryKey: ['get-products-rows'] })
        setNewRow(false)
      }
    })
  }

  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-row gap-5 items-center mb-5">
        <Button onClick={() => navigate(-1)} className="btn-outline-primary "><IconArrowBackward /></Button>
        <VSeparator className="mr-1 ml-1" />
        <Text className="text-black dark:text-white font-extrabold text-5xl" as="h1">Edição de Prateleiras</Text>
      </div>
      {rows && !isLoading ? (
        rows.map((row) => (
          <EditProductsRow onRowDelete={onRowDelete} row={row} setUpdateRowData={setUpdateRowData} />
        ))
      ) : ''}
      {newRow && (
        <CreateProductsRow onNewRowSubmit={onNewRowSubmit} />
      )}
      <div className="w-full">
        <Button onClick={() => {
          if (!newRow) return setNewRow(true)
        }} className="mr-auto ml-auto btn-primary flex flex-row gap-2"><IconPlus />Adicionar prateleira</Button>
      </div>
    </>
  )
}