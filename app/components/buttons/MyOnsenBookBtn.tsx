import React, { forwardRef, useState } from "react"
import { Button } from "@nextui-org/react"
import axios from "axios"
import { useParams } from "next/navigation"

interface MyOnsenBookBtnProps {
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
  marked: boolean
}

const MyOnsenBookBtn = forwardRef<HTMLButtonElement, MyOnsenBookBtnProps>(
  ({ color, marked }) => {
    const [isFavorite, setIsFavorite] = useState(marked)

    const params = useParams()
    const id = params.id

    const handleFavorite = async () => {
      try {
        const res = await axios.post(`http://localhost:3000/api/v1/onsens/${id}/toggle_my_onsen`, {}, { withCredentials: true })

        if (res.status === 200 || res.status === 201) {
          setIsFavorite(res.data.is_owner)
        }
      } catch (err) {
        alert('MyOnsenBookへの追加に失敗しました。')
        console.log(err)
      }
    }
    return (
      <Button
        className={`w-40 ${isFavorite && "text-white"}`}
        color={color}
        variant={isFavorite ? "solid" : "bordered"}
        onClick={handleFavorite}
      >
        {
          isFavorite ? "追加済み" : "MyOnsenBookに追加"
        }
      </Button>
    )
  })

MyOnsenBookBtn.displayName = 'MyOnsenBookBtn'
export default MyOnsenBookBtn
