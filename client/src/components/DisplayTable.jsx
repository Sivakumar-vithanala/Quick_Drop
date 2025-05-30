import React from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, } from '@tanstack/react-table'

const DisplayTable = ({ data, column }) => {
    const table = useReactTable({
        data,
        columns: column,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="p-2">
            <table className='w-full py-0 px-0 border-collapse'>
                <thead className='bg-black text-white'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                           <th>Sr.No</th>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border whitespace-nowrap'>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row,index) => (
                        <tr key={row.id}>
                            <td className='border px-2 py-1'>{index+1}</td>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='border px-2 py-2 whitespace-nowrap'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    )
}

export default DisplayTable