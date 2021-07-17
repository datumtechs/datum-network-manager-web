const useHasDid = () => {
  const did = localStorage.getItem('did')
  return did
}

export default useHasDid