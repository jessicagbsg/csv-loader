import styled from "styled-components";
import { IAlertNotificaiton } from "./types";

export const AlertNotificationContainer = styled.div<{ type: IAlertNotificaiton['type'] }>`
  background-color: ${({ type }) => { if (type === 'success') { return 'var(--success-secondary)' } else if (type === 'warning') { return 'var(--warning-secondary)' } else { return 'var(--error-secondary)' } }};
  color: ${({ type }) => { if (type === 'success') { return 'var(--success-primary)' } else if (type === 'warning') { return 'var(--warning-primary)' } else { return 'var(--error-primary)' } }};
  border: 1px solid ${({ type }) => { if (type === 'success') { return 'var(--success-primary)' } else if (type === 'warning') { return 'var(--warning-primary)' } else { return 'var(--error-primary)' } }};
  border-radius: 8px;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  z-index: 10;
  position: absolute;
  bottom: 1rem;
`
export const AlertNotificationMessage = styled.p`
  margin-left: 1rem;
`
