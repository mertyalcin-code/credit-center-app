export interface CreditApplyResponseModel {
    id:number;
    nationalityNo: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    creditAmount: number;
    creditScore:number;
    approved: boolean;
  }