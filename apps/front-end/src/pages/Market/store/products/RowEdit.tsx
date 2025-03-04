import { useEffect, useState } from "react";
import { EditProductsRow } from "../../../../components/Market/Products/row/EditProductsRow";
import { useGetStoreProductsRows } from "../../../../hooks/products/useGetStoreProductsRows";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductsRows } from "../../../../api/products/update-products-row";
import Swal from "sweetalert2";
import { Button, IconArrowBackward, Text, VSeparator } from "@app/ui";
import { useNavigate } from "react-router-dom";

export function StoreProductsRowEdit() {
  const { isLoading, rows } = useGetStoreProductsRows()
  const [updateRowData, setUpdateRowData] = useState<{ id: string, name: string, isActive: boolean }>({ id: '', name: '', isActive: false })
  const { mutateAsync } = useMutation({
    mutationFn: UpdateProductsRows
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
          <EditProductsRow row={row} setUpdateRowData={setUpdateRowData} />
        ))
      ) : ''}
    </>
  )
}