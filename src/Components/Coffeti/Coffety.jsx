import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti";

function Coffety() {
    const [windowDimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight })
    const detectSize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }
    useEffect(() => {
        window.addEventListener("resize", detectSize);
        return () => {
            window.removeEventListener("resize", detectSize);
        }
    })
  return (
      <>
          <ReactConfetti width={windowDimension.width} height={windowDimension.height}></ReactConfetti>
      </>
  )
}
export default Coffety