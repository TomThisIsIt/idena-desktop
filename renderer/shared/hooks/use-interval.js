import {useEffect, useRef} from 'react'

export function useInterval(callback, delay, useImmediately = false) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      if (useImmediately) {
        tick()
      }
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, useImmediately])
}

export function usePoll([{method, params, ...rest}, callRpc], delay) {
  useInterval(() => callRpc(method, ...params), delay)
  return [{method, params, ...rest}, callRpc]
}
