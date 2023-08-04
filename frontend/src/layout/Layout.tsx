import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { listUsers, loadFile } from '../api'
import { AlertNotification, Card, FileUploadButton, Search } from '../components'

import { CardsContainer, Container, TopContainer } from './Layout.styles'

import type { IFilters, IUser } from '../types'
import type { IAlertNotificaiton } from '../components/AlertNotification/types'


export const Layout = () => {
  const [file, setFile] = useState<File | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [alert, setAlert] = useState<IAlertNotificaiton | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type !== 'text/csv') {
        handleAlert({ message: 'Please select a csv', type: 'error' })
      }
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    }
  };

  const handleListUsers = useCallback(async () => {
    try {
      const response = await listUsers();
      setUsers(response);
    } catch (error) {
      handleAlert({ message: 'Something went wrong', type: 'error' });
    }
  }, []);

  const handleUploadFile = useCallback(async () => {
    if (!file) {
      handleAlert({ message: 'Please select a file', type: 'error' });
      return;
    }
    await loadFile(file);
    handleAlert({ message: 'File uploaded successfully', type: 'success' });
  }, [file]);

  const handleUploadFileAndListUsers = useCallback(async () => {
    await handleUploadFile();
    await handleListUsers();
  }, [handleUploadFile, handleListUsers]);

  const handleListUsersWithFilters = useCallback(async (updatedFilters: IFilters) => {
    setFilters(updatedFilters);
    const response = await listUsers(updatedFilters);
    setUsers(response);
    handleAlert({ message: 'Users listed', type: 'success' })

    if (response.length === 0) handleAlert({ message: 'No users found', type: 'error' })

  }, []);

  const handleAlert = (alertInfo: IAlertNotificaiton) => {
    setAlert(alertInfo);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  useEffect(() => {
    handleListUsers();
  }, []);

  return (
    <Container>
      <TopContainer>
        <FileUploadButton
          onChange={handleFileChange}
          onClick={handleUploadFileAndListUsers}
        />
        <Search onChange={handleListUsersWithFilters} />
      </TopContainer>
      <CardsContainer>
        {users.length > 0 ?
          users.map((user) => (
            <Card
              key={user.id}
              name={user.name}
              city={user.city}
              country={user.country}
              favorite_sport={user.favorite_sport}
            />
          )) : <p>Add users to see them here</p>}
      </CardsContainer>
      {alert && (
        <AlertNotification
          message={alert.message}
          type={alert.type}
        />
      )}
    </Container>
  );
}
