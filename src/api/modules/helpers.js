/*
*  This function for creating clint response
*  @param { any } data - pass data for send to client
*  @param { any } err
*
*  return { data, err, isSuccess }
*
* */
export function createClientResponse(data, err) {
  return {
    data,
    isSuccess: data !== null,
    error: err
  };
}
