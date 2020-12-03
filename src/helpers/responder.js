export const successRespond = ( res, code, data ) => {
  res.status(code).send({
    status: code,
    data: data,
  })
}

export const errorRespond = (code, message, next ) => {
  const error = new Error(message);
  error.status = code;
  return next(error)
}