import React from 'react';
import { Alert, AlertTitle, AlertDescription } from './alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'


export function CustomAlert({ title, description }) {
  return (
    <Alert variant="default">
      <AlertTitle className="mb-5"><FontAwesomeIcon icon={faBell} className="mr-5"/> {title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}