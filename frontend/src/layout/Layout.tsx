import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { listUsers, loadFile } from '../api'
import { AlertNotification, Card, FileUploadButton, Search } from '../components'

import { CardsContainer, Container, TopContainer } from './Layout.styles'

import type { IFilters, IUser } from '../types'

export const Layout = () => {
  const [file, setFile] = useState<File>();
  const [users, setUsers] = useState<IUser[]>([])
  const [filters, setFilters] = useState<IFilters>({})

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleListUsers = useCallback(async () => {
    const response = await listUsers()
    setUsers(response)
  }, [])

  const handleUploadFile = useCallback(async () => {
    if (!file) {
      return;
    }
    await loadFile(file)
  }, [file]);

  const handleUploadFileAndListUsers = useCallback(async () => {
    await handleUploadFile()
    await handleListUsers()
  }, [file])

  const handleListUsersWithFilters = useCallback(async (updatedFilters: IFilters) => {
    setFilters(updatedFilters);
    try {
      const response = await listUsers(updatedFilters);
      setUsers(response);
    } catch (error) {
      <AlertNotification message="Something went wrong" type='error' />
    }
  }, []);

  useEffect(() => {
    handleListUsers()
  }, [])

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
          users.map((user) => {
            return (
              <Card
                key={user.id}
                name={user.name}
                city={user.city}
                country={user.country}
                favorite_sport={user.favorite_sport}
              />
            )
          }) : <p>Add users to see them here</p>}
      </CardsContainer>
    </Container>
  )
}
