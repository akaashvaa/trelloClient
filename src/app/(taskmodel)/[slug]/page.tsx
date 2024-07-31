'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Priority, TaskTitle } from '@/constant/data'
import { createTask } from '@/lib/slices/todoSlices'
import { CreateTaskPayload } from '@/lib/slices/todoSlices'

const validUrlTaskNames = [
  'To_do',
  'In_Progress',
  'Under_Review',
  'Completed',
  'general',
]

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { createError } = useAppSelector((state) => state.todos)
  const { slug } = params
  const defaultStatus = params.slug.split('_').join(' ')

  const [status, setStatus] = useState<TaskTitle | string>(() => {
    const validStatuses: TaskTitle[] = [
      'To do',
      'In Progress',
      'Completed',
      'Under Review',
    ]
    return validStatuses.includes(defaultStatus as TaskTitle)
      ? defaultStatus
      : ''
  })
  const [prioritiy, setPrioritiy] = useState<Priority | string>('')
  const initialForms = {
    title: '',
    description: '',
    date: '',
  }
  const [forms, setForms] = useState<{
    title: string
    description: string
    date: string
  }>(initialForms)
  const dispatch = useAppDispatch()

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskTitle
    setStatus(newStatus)
  }
  const handleChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Priority
    setPrioritiy(newStatus)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForms({
      ...forms,
      [name]: value,
    })
  }
  useEffect(() => {
    console.log(status)
    if (!(slug && validUrlTaskNames.includes(slug as string))) {
      return router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTask: CreateTaskPayload = {
      title: forms.title,
      description: forms.description,
      status: status as TaskTitle,
      priority: prioritiy === '' ? 'Medium' : (prioritiy as Priority),
      deadline: forms.date,
    }
    dispatch(createTask(newTask))
    setPrioritiy('')
    setStatus('')
    setForms(initialForms)
    router.push('/')
  }
  const handleClose = () => {
    router.push('/')
  }
  if (createError !== null) {
    alert(createError)
  }
  return (
    <div className="flex flex-col border bg-primary-foregound border-[#dedede] font-barlow w-[40%] gap-y-5 p-5 my-5 rounded-md">
      <div className="flex text-secondary-text justify-between items-center">
        <div className="flex gap-x-4">
          <Image
            onClick={handleClose}
            src="/images/close.svg"
            alt="close"
            width="25"
            height="25"
          />
          <Image
            src="/images/maximise.svg"
            alt="maximise"
            width="25"
            height="25"
          />
        </div>
        <div className="flex gap-x-3">
          <div className="bg-secondary-foregound  flex items-center gap-x-2 p-2 rounded-md">
            <p>Share</p>
            <Image src="/images/share.svg" alt="share" width="25" height="25" />
          </div>
          <div className="bg-secondary-foregound flex items-center gap-x-2 px-1 py-2 rounded-md">
            <p>Favorite</p>
            <Image
              src="/images/favorite.svg"
              alt="favourite"
              width="23"
              height="23"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-7  text-[#666666]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col pb-7  gap-y-6 w-full border-b border-[#dedede]"
        >
          <input
            type="text"
            value={forms.title}
            name="title"
            onChange={handleChange}
            className=" placeholder:text-[#CCCCCC] text-[3em] outline-none font-semibold"
            placeholder="Title"
          />
          <div className=" flex">
            <div className="flex w-[230px]  items-center  ">
              <Image
                src="/images/status.svg"
                alt="status"
                width="25"
                height="25"
              />
              <h4 className="pl-7">Status</h4>
            </div>

            <select
              required
              value={status}
              onChange={handleChangeStatus}
              className={`w-[200px] outline-none bg-transparent border-none custom-select ${
                status !== '' ? 'text-black' : 'text-[#C1BDBD]'
              }`}
            >
              <option value="" hidden disabled>
                Not Selected
              </option>
              <option value="To do">To do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Under Review">Completed</option>
            </select>
          </div>
          <div className=" flex">
            <div className="flex  w-[230px] items-center  ">
              <Image
                src="/images/priority.svg"
                alt="priority"
                width="25"
                height="25"
              />
              <h4 className="pl-7">Priority</h4>
            </div>
            <select
              value={prioritiy}
              onChange={handleChangePriority}
              className={`w-[200px] outline-none bg-transparent border-none custom-select ${
                prioritiy !== '' ? 'text-black' : 'text-[#C1BDBD]'
              }`}
            >
              <option value="" hidden disabled>
                Not Selected
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex">
            <div className="flex w-[230px]  items-center  ">
              <Image
                src="/images/deadline.svg"
                alt="dealine"
                width="25"
                height="25"
              />
              <h4 className="pl-7">Deadline</h4>
            </div>

            <input
              type="text"
              name="date"
              value={forms.date}
              onChange={handleChange}
              placeholder="Not Selected"
              pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$"
              title="Please enter a date in the format dd/mm/yyyy"
            />
          </div>

          <div className=" flex">
            <div className="flex w-[230px]   items-center   ">
              <Image
                src="/images/description.svg"
                alt="description"
                width="25"
                height="25"
              />
              <h4 className="pl-7">Description</h4>
            </div>
            <input
              type="text"
              value={forms.description}
              onChange={handleChange}
              name="description"
              placeholder="Not Selected"
              className="w-[230px]"
            />
          </div>
          <div className="flex gap-x-5 text-black">
            <Image
              src="/images/addDark.svg"
              alt="addDark"
              width="25"
              height="25"
            />
            <h5>Add custom property</h5>
          </div>
          <button className="hidden" type="submit"></button>
        </form>
        <p className="text-[#C0BDBD]">
          Start writing, or drag your own files here.{' '}
        </p>
      </div>
    </div>
  )
}
