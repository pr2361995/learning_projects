import { NestedKeys } from "../../utils/utils";

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface ContactDetails {
    email: string;
    phone: string;
    address: Address;
}

export interface Identification {
    idType: string;
    idNumber: string;
}

export enum AccountType {
    Savings, 
    Current
}

export enum Status {
    Active = 'Active', 
    Inactive = 'Inactive', 
    Closed = 'Closed' 
}

export enum AccountStatus {
    Operational, 
    Overdrawn, 
    Suspended, 
    Dormant, 
    Closed
}

export interface AccountDetails {
    accountNumber: string;
    accountType: AccountType; 
    branch: string;
    ifscCode: string;
    balance: number;
    currency: string;
    openedDate: string; 
    status: Status;
    accountStatus: AccountStatus;
}

export interface Nominee {
    name: string;
    relationship: string;
    contact: string;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; 
    gender: 'Male' | 'Female' | 'Other';
    contactDetails: ContactDetails;
    identification: Identification;
    accountDetails: AccountDetails;
    kycStatus: 'Verified' | 'Pending' | 'Rejected';
    nominee: Nominee;
}

export interface Filter {
    name: NestedKeys<Customer>;
    term: string;
}

export interface Sorting {
    name: NestedKeys<Customer>;
    isASC: boolean;
}

export interface Paging {
    currentPage: number;
    pageSize: number;
}

export interface RootData {
    customers: Customer[];
    indicator: 'loading' | 'success' | 'failure' | 'idle';
    filter: Filter;
    sorting: Sorting;
    paging: Paging;
    error: string | null;
}

export type CustomerAPIResponse = 
  | { 
      first: number | null; 
      prev: number | null; 
      next: number | null; 
      last: number | null; 
      pages: number | null; 
      items: number | null; 
      data: Customer[]; 
    }
  | Customer[];
