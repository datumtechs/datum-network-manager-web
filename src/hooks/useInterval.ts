import { useEffect, useRef } from 'react'

const useInterval = (callback, delay) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  // 下面的可用
  // useEffect(() => {
  //   if (delay !== null) {
  //     const time = setTimeout(() => {
  //       callback()
  //     }, delay)
  //     return () => clearTimeout(time)
  //   }
  // });
};


export default useInterval