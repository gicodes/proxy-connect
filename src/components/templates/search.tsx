import { Input, Stack } from '@chakra-ui/react'
import React from 'react'

/* 1 pending function to implement
  function handleSearch: Modify handleSearch to filter results from all Riders 
*/

const handleSearch = (e: MouseEvent) => {
    return e.preventDefault();
  };

const Search = () => {
  return (
    <div className="bg-grey shadow">
    <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Stack spacing={3}>
        <form method="post">
          <Input
            id="search"
            variant="filled"
            // onClick={handleSearch}
            placeholder="Search for a ryder"
          />
        </form>
      </Stack>
    </div>
  </div>
  )
}

export default Search