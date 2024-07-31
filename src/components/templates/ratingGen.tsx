import { HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import { MdStarRate } from 'react-icons/md';

/**
 * Generates an array of star icons based on the given rating.
 * @param rating - The rating number between 1 and 5.
 * @returns An array of JSX elements representing stars.
 */
export function renderStars(rating: number): JSX.Element[] {
  // Clamp the rating between 1 and 5 to ensure valid input
  const clampedRating = Math.max(1, Math.min(rating, 5));

  // Create an array of MdStarRate components
  return Array.from({ length: clampedRating }, (_, index) => (
    <MdStarRate key={index} style={{ color: '#FFD700' }} /> // Customize the color as needed
  ));
}

// Example usage in a component:
const UserRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <Stack>
      <HStack spacing={-1}>
        {renderStars(rating)}
      </HStack>
    </Stack>
  );
};

export default UserRating;