import express from "express";

export const RESTSendError = (res: express.Response, status: number, message: string) => {

  res.status(status)
  res.send(JSON.stringify({
    message: message
  }))
}