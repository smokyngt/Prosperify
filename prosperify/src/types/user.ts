export type User = {
  id?: string;
  name: string;
  email?: string;
  role?: string;
  status?: 'Active' | 'Warning' | 'Inactive';
  created?: string;
};
