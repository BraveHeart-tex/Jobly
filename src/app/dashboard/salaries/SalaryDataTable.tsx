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
import React from 'react';

interface ISalaryDataTableProps {}

const SalaryDataTable = (props: ISalaryDataTableProps) => {
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
          <Tr>
            <Td>Software Engineer</Td>
            <Td>51.000-70.000$</Td>
            <Td>New York, NY</Td>
          </Tr>
          <Tr>
            <Td>Software Engineer</Td>
            <Td>51.000-70.000$</Td>
            <Td>New York, NY</Td>
          </Tr>
          <Tr>
            <Td>Software Engineer</Td>
            <Td>51.000-70.000$</Td>
            <Td>New York, NY</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SalaryDataTable;
