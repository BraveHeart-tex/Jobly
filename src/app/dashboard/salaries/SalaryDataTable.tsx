'use client';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';
import { SalaryEstimationDataset } from '@prisma/client';
import React from 'react';

interface ISalaryDataTableProps {
  data: SalaryEstimationDataset[];
}

const SalaryDataTable = ({ data }: ISalaryDataTableProps) => {
  return (
    <TableContainer mt={4}>
      <Table
        variant='striped'
        colorScheme={useColorModeValue('facebook', 'gray')}
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        <TableCaption>
          Glassdoor Salary Estimations City and Job Title
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Job Title</Th>
            <Th>Avg Salary Estimation</Th>
            <Th>City / State</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((salaryEstimation) => (
              <Tr key={salaryEstimation.id}>
                <Td>{salaryEstimation.jobTitle}</Td>
                <Td>{`${salaryEstimation.salary_estimate}.000`}$</Td>
                <Td>{salaryEstimation.location}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SalaryDataTable;
