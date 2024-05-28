interface IGetJobApplicationForCurrentUserParams {
  pageNumber: number;
  query: string;
  companyQuery: string;
  status: string;
  jobType: string;
  sortQuery: string;
}

export const getJobApplicationForCurrentUser = async ({
  pageNumber,
  query,
  companyQuery,
  status,
  jobType,
  sortQuery,
}: IGetJobApplicationForCurrentUserParams) => {};
