export interface Response {
  monthlyApplications: MonthlyApplication[];
}

export interface MonthlyApplication {
  date: string;
  count: number;
}

// Chart Data

//     "monthlyApplications": [
//         {
//             "date": "Jul 2021",
//             "count": 1
//         },
//         {
//             "date": "Aug 2021",
//             "count": 4
//         },
//         {
//             "date": "Sep 2021",
//             "count": 3
//         },
//         {
//             "date": "Oct 2021",
//             "count": 2
//         },
//         {
//             "date": "Nov 2021",
//             "count": 2
//         },
//         {
//             "date": "Dec 2021",
//             "count": 5
//         }
//     ]
