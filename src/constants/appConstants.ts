export const userValidations = {
  EMAIL: 'Email is required',
  PASSWORD: 'Password is required',
};

export const memberValidations = {
  FIRST_NAME: 'First name is required',
  LAST_NAME: 'Last name is required',
  ROLE: 'Role is required',
  DOB: 'Date of birth is required',
  GENDER: 'Gender is required',
};

export const memberRoleOptions = [
  { value: 1, label: 'Doctor' },
  { value: 2, label: 'Patient' },
];

export const memberGenderOptions = [
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' },
];

export const opportunityValidations = {
  PROCEDURE: 'Procedure is required',
  DOCTOR: 'Doctor is required',
  PATIENT: 'Patient is required',
};

export const opportunityStages = ['leads', 'qualified', 'booked', 'treated'];
