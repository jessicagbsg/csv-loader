
import { LuAlertCircle } from 'react-icons/lu'
import { BiCheckCircle } from 'react-icons/bi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { AlertNotificationContainer, AlertNotificationMessage } from "./AlertNotification.styles"
import type { IAlertNotificaiton } from "./types"

export const AlertNotification = ({ type, message }: IAlertNotificaiton) => {

  const handleTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <LuAlertCircle />
      case 'success':
        return <BiCheckCircle />
      case 'error':
        return <AiOutlineCloseCircle />
    }
  }

  return (
    <AlertNotificationContainer type={type}>
      {handleTypeIcon(type)}
      <AlertNotificationMessage>{message}</AlertNotificationMessage>
    </AlertNotificationContainer>
  );
};