import { Response } from "express"

interface ISuccessResponse<T> {
  status: boolean
  message: string
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: ISuccessResponse<T>) => {
  res.json({
    status: true,
    message: data.message,
    data: data.data,
  })
}

export default sendResponse
