export default function calculatePetAge(dob) {
  if (!dob) return 'Invalid date';

  const today = new Date();
  const birthDate = new Date(dob);
  const ageYears = today.getFullYear() - birthDate.getFullYear();
  const ageMonths = today.getMonth() - birthDate.getMonth();
  const totalMonths = ageYears * 12 + ageMonths;

  if (totalMonths < 12) return `${totalMonths} tháng tuổi`;
  return `${Math.floor(totalMonths / 12)} tuổi`;
}
