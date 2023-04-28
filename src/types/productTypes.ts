export interface Product {
    id: number;
    name: string;
    mark: string;
    price: number;
    slug:string;
    images: {
      secure_url: string;
    }[];
  }