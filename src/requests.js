
const fields_check = (type, body) =>
{
  switch (type)
  {
    case 'GET': return true; break;
    case 'POST': return body?.name && body?.sum && body?.category; break;
    case 'PATCH': return body?.id && body?.name && body?.sum && body?.category; break;
    case 'DELETE': return body?.id; break;
    default: return false; break;
  }
}

const constructor = (type, method, body) =>
{
  if (fields_check(type, body))
  {
    console.log("request fields check failed", type, method, body)
    return
  }
  return fetch(`http://localhost:5000/items?type=${ type }`,
  {
    method,
    headers:
    {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  })
  .then(res => res.json())
  .catch(err => console.log("constructor request error: ", err.message))
}

const get_all = type => constructor(type, 'GET')

const post_item = (type, body) => constructor(type, 'POST', body)

const patch_item = (type, body) => constructor(type, 'PATCH', body)

const delete_item = (type, body) => constructor(type, 'DELETE', body)

export { get_all, post_item, patch_item, delete_item }
