import { useEffect, useMemo, useRef } from 'react'
import debounce from '../utils/debounce.js'

const useDebounce = (callback) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current = callback
  }, [callback])

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.()
    }

    return debounce(func, 1000)
  }, [])

  return debouncedCallback
}

export default useDebounce
