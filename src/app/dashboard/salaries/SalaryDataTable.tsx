import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SalaryEstimationDataset } from "@prisma/client";

interface ISalaryDataTableProps {
  data: SalaryEstimationDataset[];
}

const SalaryDataTable = ({ data }: ISalaryDataTableProps) => {
  const formatThousands = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Average Salary Estimation</TableHead>
            <TableHead>City / State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((salaryData, index) => (
              <TableRow className="odd:bg-gray-200 transition-all hover:bg-gray-300" key={index}>
                <TableCell>{salaryData.jobTitle}</TableCell>
                <TableCell>${formatThousands(salaryData.salary_estimate)}</TableCell>
                <TableCell>{salaryData.location}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalaryDataTable;
