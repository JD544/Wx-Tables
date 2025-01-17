import React, { FormEvent, useEffect, useMemo } from 'react'
import { useBuilder } from '../../../func/hooks/useBuilder'
import './main.css'
import { BuilderComponent } from '../../../func/builder'
import { GenerateTable } from '../../Advanced/Table/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function WxTablesPlugin() {
    const { getComponent, updateComponent } = useBuilder()
    const [ tableComponent, setTableComponent ] = React.useState<BuilderComponent>()

    useEffect(() => {
        if (getComponent()?.type === 'Table') {
            setTableComponent(getComponent())
        }
    }, [ getComponent() ])

    const formDataRemove = (form: FormEvent) => {
        form.preventDefault()
        const formData = new FormData(form.target as HTMLFormElement)
        const dataId = formData.get('data-id')
        if (!dataId) return
        if (tableComponent?.type !== 'Table') return
        const dataArray = tableComponent?.data || []
        const filteredData = dataArray.filter(item => item.id !== dataId)
        updateComponent({
            ...tableComponent,
            data: filteredData
        })
}

    const ColumnInputs = useMemo(() => {
        if (!tableComponent) return []
        if (tableComponent.type !== 'Table') return []
        return tableComponent.columns &&
            tableComponent.columns.map((column, index) => (
                <>
                    <div className="table__column" key={index}>
                        <label htmlFor={`column-${index}`}>Column {index + 1}</label>
                        <input type="text" id={`column-${index}`} value={column.title} />
                    </div>                
                    <form className='table__data__entry__actions' onSubmit={formDataRemove}>                        
                        <input type="hidden" name="data-id" value={column.id} />
                        <button type="submit" className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                    </form>
                </>
            ))        
    }, [ tableComponent ])

    
    const DataInputs = useMemo(() => {
        if (!tableComponent) return []
        if (tableComponent.type !== 'Table') return []
        return tableComponent.columns && tableComponent.data &&
        tableComponent.data.map((row, index) => (
            <div className="table__data__entry">    
                    <div className="form__group">
                        {tableComponent.columns?.map((column, index) => (
                            <div className="table__column" key={index}>
                                <label htmlFor={`column-${index}`}>Column {index + 1}</label>
                                <input type="text" id={`column-${index}`} name={`column-${index}`} defaultValue={row.fields[index]} />                                
                            </div>
                        ))}
                    </div>
                    <form className='table__data__entry__actions' onSubmit={formDataRemove}>                        
                        <input type="hidden" name="data-id" value={row.id} />
                        <button type="submit" className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                    </form>
                </div>
        ))                                
    }, [ tableComponent ])

    const formColunmAdd = (form: FormEvent) => {
        form.preventDefault()
        const formData = new FormData(form.target as HTMLFormElement)
        const columnTitle = formData.get('add__col')
        if (tableComponent?.type !== 'Table') return
        const cols = tableComponent?.columns 

        updateComponent({
            ...tableComponent,

            columns: [
                ...cols || [],
                {
                    title: columnTitle as string,
                    id: `column-${Math.random().toString(36).substring(2, 9)}`
                }
            ]
        })        
    }

    const formDataAdd = (form: FormEvent) => {
        form.preventDefault()
        if (tableComponent?.type !== 'Table') return
        const dataArray = tableComponent?.data || []
        
        // Get all the input fields in the form
        const inputFields = form.target as HTMLFormElement
        const inputElements = inputFields.querySelectorAll('input')

        const data: string[] = []

        inputElements.forEach((input) => {
            data.push(input.value)
        })

        updateComponent({
            ...tableComponent,
            data: [
                ...dataArray,
                {
                    id: `data-${Math.random().toString(36).substring(2, 9)}`,
                    fields: data                        
                }
            ]
        })

        // Reset the form
        inputFields.reset()
    }

  return (
    <div className="popout dialog site__editor dialog__full __tool__edit web__editor__dialog Tables">
<div className="dialog__body">
    <div className="dialog__header">
      <h3 className="dialog__title">WX Tables</h3>
      <div className="dialog__desc"><p>
              Wx Tables is a plugin that allows you to create tables in your website        
    </p></div>
    </div>
    <div className="dialog__content">
        {tableComponent ? (
            <div className="wx-tables table__designer">
            <table id={tableComponent.id} className={`wx-table__table ${tableComponent.className}`}>
                {tableComponent.type === 'Table' && (GenerateTable(tableComponent.data || [], tableComponent.columns || [], tableComponent.classNameRow))}
            </table>
            <div className="wx-tables__creator">
                <div className="wx-tables__creator__sections">
                    <div className="wx-tables__creator__section">
                        <div className="wx-tables__creator__section__title">
                            <h3>Data Builder</h3>
                        </div>
                        <div className="wx-tables__creator__section__builder">
                                {DataInputs}
                                <div className="table__data__entry">
                                    {tableComponent.type === 'Table' && (
                                        <form onSubmit={formDataAdd}>
                                            <div className="form__group">
                                                {tableComponent.columns?.map((column, index) => (
                                                    <div className="table__column" key={index}>
                                                        <label htmlFor={`column-${index}`}>Column {index + 1}</label>
                                                        <input type="text" id={`column-${index}`} name={`column-${index}`} placeholder='Value...' />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="table__data__action">
                                                <button type="submit">Add Row</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    <div className="wx-tables__creator__section">
                        <div className="wx-tables__creator__section__title">
                            <h3>Column Builder</h3>
                        </div>
                        <div className="wx-tables__creator__section__builder">
                                {ColumnInputs}
                                <div className="table__column">
                                    <label htmlFor="column-add">Add Column</label>
                                    <form className='wx-tables__creator__section__builder__form' onSubmit={formColunmAdd}>
                                        <input type="text" name='add__col' id="column-add" placeholder="Column Name" />
                                        <button type="submit">+</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
        ) : (
            <div className="wx-tables__not__selected">
                Please select a table to edit
            </div>
        )}
</div>      
</div>
</div>
  )
}