import { useEffect, useState } from 'react'
import { LuAlertCircle } from 'react-icons/lu'
import { BiCheckCircle } from 'react-icons/bi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { AlertNotificationContainer, AlertNotificationMessage } from "./AlertNotification.styles"
import type { IAlertNotificaiton } from "./types"

export const AlertNotification = ({ type, message }: IAlertNotificaiton) => {
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const handleTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <LuAlertCircle />
      case 'warning':
        return <BiCheckCircle />
      case 'success':
        return <AiOutlineCloseCircle />
    }
  }

  useEffect(() => {
    setTimeout(() => { setShowAlert(true) }, 7000)
    setShowAlert(false)
  }, [])

  return (
    { showAlert } && (<AlertNotificationContainer type={type}>
      {handleTypeIcon(type)}
      <AlertNotificationMessage>{message}</AlertNotificationMessage>
    </AlertNotificationContainer>)
  )
}