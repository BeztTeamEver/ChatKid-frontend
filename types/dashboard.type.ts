export type DASHBOARD_TYPE = {
  totalAccounts: number;
  totalPackages: number;
  totalRevenue: number;
  monthlyPackageSold: [
    {
      id: string;
      name: string;
      total: number;
    },
  ];
  monthlyTransactions: [
    {
      date: string;
      packages: [
        {
          id: string;
          name: string;
          amount: number;
        },
      ];
    },
  ];
};
