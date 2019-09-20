export const getFilmId = (item) =>{
  let length = item.url.split('/').length
  let id = item.url.split('/')[length-2]
  return id
}