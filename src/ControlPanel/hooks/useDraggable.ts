import {
  useEffect,
  useState,
} from 'react';

export const useDraggable = (initialPosition: [number, number]) => {
  const [isDragging, setIsDragging] = useState(false)
  const [shiftPosition, setShiftPosition] = useState<[number, number]>([0, 0])
  const [position, setPosition] = useState<[number, number]>(initialPosition)

  const handleDragStart = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const shiftX = e.clientX - rect.left
    const shiftY = e.clientY - rect.top
    setShiftPosition([shiftX, shiftY])
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    localStorage.setItem("position", JSON.stringify(position))
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition([e.pageX - shiftPosition[0], e.pageY - shiftPosition[1]])
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDragging, shiftPosition])

  return {
    position,
    handleDragStart,
    handleDragEnd
  }
}
