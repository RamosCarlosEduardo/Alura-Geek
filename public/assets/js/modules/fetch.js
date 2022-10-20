const getDb = (url) => {
  return fetch(url)
    .then(res => res.json())
}

export {getDb}