export interface ImenuItem {
  url: string;
  title: string;
  icon?: React.ReactNode;
}

export interface IActiveLinkProps {
  url: string;
  children: React.ReactNode;
  exact?: boolean;
}

export interface ICategories {
  _id?: string;
  name: string;
  slug: string;
  status: boolean;
}

export interface IBrands {
  _id?: string;
  name: string;
  thumbnail: string;
  status: boolean;
}

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
  comfirmPassword?: string;
  role?: "admin" | "member";
}

export interface IProduct {
  id?: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  category_id: string;
  brand_id: string;
  status: boolean;
}
