'use client'
import { useEffect, useRef, useState } from 'react'
import TaskHeader from './TaskHeader'
import NewTaskButton from './NewTaskButton'
import { ButtonType } from './Button'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { fetchTodos, UpdateTask } from '@/lib/slices/todoSlices'
import TaskCard from './TaskCard'
import { TaskTitle } from '@/constant/data'

function Tasks({ type }: { type: TaskTitle }) {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const dispatch = useAppDispatch()
  const { allTodos, fetchError } = useAppSelector((state) => state.todos)
  const data = allTodos.filter((el) => el.status === type)

  const name = type.split(' ').join('_')
  // console.log({ name });
  useEffect(() => {
    dispatch(fetchTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleDragEnterCapture = (e: React.DragEvent<HTMLDivElement>) => {
    const sourceStatus = e.dataTransfer.getData('text/plain').split(',')[1]
    if (sourceStatus !== type) {
      setIsDragging(true)
    }
  }

  const handleDragLeaveCapture = (e: React.DragEvent<HTMLDivElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      setIsDragging(false)
    }, 200) // Delay in milliseconds
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const data = e.dataTransfer.getData('text/plain').split(',')
    const id = data[0]
    const status = data[1] as TaskTitle
    // console.log("Dropped task:", { id, status });

    if (status !== type) {
      dispatch(UpdateTask({ id, status: type }))
    }
  }
  if (fetchError !== null) {
    alert(fetchError)
  }
  return (
    <div
      onDragEnterCapture={handleDragEnterCapture}
      onDragLeaveCapture={handleDragLeaveCapture}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={handleDrop}
      className={`flex h-fit flex-col rounded-md p-2 gap-y-3 ${
        isDragging ? 'bg-secondary-foreground border border-stroke' : ''
      }`}
    >
      <TaskHeader title={type} />
      <div className="flex rounded-md flex-col gap-y-3">
        {data.map((el, i) => (
          <TaskCard key={el._id} taskData={el} />
        ))}
      </div>

      <NewTaskButton
        name={name}
        title="Add new"
        imgPath="images/addSecondary.svg"
        btnType={ButtonType.secondry}
      />
    </div>
  )
}

export default Tasks
