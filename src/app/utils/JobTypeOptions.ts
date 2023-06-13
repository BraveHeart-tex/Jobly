const JobTypeOptions = {
  FULL_TIME: 'Full-Time',
  PART_TIME: 'Part-Time',
  CONTRACT: 'Contract',
  TEMPORARY: 'Temporary',
  VOLUNTEER: 'Volunteer',
  INTERNSHIP: 'Internship',
};

export function capitalizeJobTypeParams(value: string) {
  if (value === 'part-time' || value === 'Part-time') {
    return 'Part-Time';
  }

  if (value === 'full-time' || value === 'Full-time') {
    return 'Full-Time';
  }

  return value;
}

export default JobTypeOptions;
