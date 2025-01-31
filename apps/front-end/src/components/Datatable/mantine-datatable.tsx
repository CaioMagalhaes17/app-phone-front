import { DataTable, DataTableProps } from 'mantine-datatable'

export function MantineDataTable<TypeProps>({
  ...rest
}: DataTableProps<TypeProps>) {
  const height = rest.height
  return (
    <div className="datatables ">
      <DataTable<TypeProps>
        className="whitespace-nowrap table-hover"
        noRecordsText="Nenhum resultado encontrado"
        highlightOnHover
        height={height || 550}
        minHeight={150}
        customLoader={
          (
            <span className="animate-spin border-4 border-primary border-l-transparent rounded-full w-12 h-12 inline-block align-middle" />
          ) as unknown as undefined
        }
        {...rest}
      />
    </div>
  )
}