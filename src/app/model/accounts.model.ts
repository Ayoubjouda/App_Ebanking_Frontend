export interface AccountDetails {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalOperations: number;
  currentPageOperations: number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
}

export interface Account {
  type: string;
  id: string;
  balance: number;
  createdAt: string;
  status: any;
  overDraft?: number;
  interestRate?: number;
}
