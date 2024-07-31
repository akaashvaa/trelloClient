import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { deleteTask, Task } from '@/lib/slices/todoSlices'
import Image from 'next/image'
import React, { useState } from 'react'
function timeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1)
    return interval + (interval === 1 ? ' year ago' : ' years ago')

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1)
    return interval + (interval === 1 ? ' month ago' : ' months ago')

  interval = Math.floor(seconds / 86400)
  if (interval >= 1)
    return interval + (interval === 1 ? ' day ago' : ' days ago')

  interval = Math.floor(seconds / 3600)
  if (interval >= 1)
    return interval + (interval === 1 ? ' hour ago' : ' hours ago')

  interval = Math.floor(seconds / 60)
  if (interval >= 1)
    return interval + (interval === 1 ? ' minute ago' : ' minutes ago')

  return 'just now'
}
function TaskCard({ taskData }: { taskData: Task }) {
  const [isDragStarted, setIsDragStarted] = useState(false)
  const dispatch = useAppDispatch()
  const { deleteError } = useAppSelector((state) => state.todos)
  // console.log(taskData);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragStarted(true)
    e.dataTransfer.setData('text/plain', `${taskData._id},${taskData.status}`)
  }
  const handleDragEnd = () => {
    setIsDragStarted(false)
  }
  const handleDelete = () => {
    dispatch(deleteTask(taskData._id))
  }

  const handleEdit = () => {
    console.log('edit')
  }
  if (deleteError !== null) {
    alert(deleteError)
  }
  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      className={`w-full text-[14px] flex flex-col border border-[#DEDEDE] rounded-md bg-[#F9F9F9] p-2 gap-y-2 ${
        isDragStarted && 'opacity-50'
      }`}
    >
      <h1 className="font-medium text-[16px] text-primary-text">
        {taskData.title}
      </h1>
      {taskData.description && (
        <p className=" text-secondary-text">{taskData.description}</p>
      )}

      <p
        className={`${
          taskData.priority === 'Low'
            ? 'bg-Low'
            : taskData.priority === 'Medium'
            ? 'bg-Medium'
            : 'bg-Urgent'
        } text-[12px] rounded-md px-2 py-1 text-white w-fit`}
      >
        {taskData.priority}
      </p>
      <div className="flex  items-center gap-x-2 py-1">
        <Image src="images/date.svg" alt="date" width="24" height="24" />
        <p className="text-primary-text  font-semibold">
          {taskData?.deadline ? taskData.deadline : 'No deadline'}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-secondary-text font-medium">
          {timeAgo(new Date(taskData.createdAt))}
        </p>
        <div className="flex gap-x-3">
          <Image
            onClick={handleEdit}
            src="images/description.svg"
            alt="edit"
            width="15"
            height="15"
            className="cursor-pointer"
          />
          <Image
            onClick={handleDelete}
            src="images/delete.svg"
            alt="delete"
            width="15"
            height="15"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default TaskCard
