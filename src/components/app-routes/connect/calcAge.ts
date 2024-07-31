/**
 * Calculates age based on the date of birth.
 * @param dob - The date of birth as a string or Date object.
 * @returns The age in years.
 */
export function calculateAge(dob: Date | string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
  
  // Example usage:
  const age = calculateAge("1996-04-26T00:00:00.000+00:00");
  console.log(age); // Outputs the current age based on the DOB  