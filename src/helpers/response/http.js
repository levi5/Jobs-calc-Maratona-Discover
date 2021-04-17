export function  httpResponse(status, values, error) {

  const response = {status, body: values}

  if (status === 200) {
    return {
      ...response,
      valid: true,
      error
    }
  }
  else if(status === 401){
    return {
      ...response,
      valid: false,
      error
    }
  }
}