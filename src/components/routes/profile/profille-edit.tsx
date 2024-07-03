import React from 'react';
import { useState } from "react";
import ProfileForm from "@/components/routes/profile/profile-form";
import { Card } from '@chakra-ui/react';

const ProfileEdit = () => {
    const [edit, setEdit] = useState<any>(false);

  function handleToggleEdit() {
    setEdit(true);
  }

  function handleBackToTop() {
    (e: any) => e.preventDefault();
    setEdit(false);
  }

  return (
    <>
      <Card className="edit-btn">
        <button
          onClick={() => handleToggleEdit()}
          className="text-info hover:text-yellow-100"
        >
          Edit your profile information
        </button>
      </Card>
      {edit && (
      <Card p={5} className='edit-container'>
        <ProfileForm />
        <button
          onClick={() => handleBackToTop()}
          type="button"
          className="rounded-md bg-gray-600 px-3 py-3"
        >
          <span className='text-warning'>Cancel Changes</span>
        </button>
      </Card>
      )}   
    </>
  )
}

export default ProfileEdit