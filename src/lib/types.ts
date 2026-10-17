export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
};

/** The shape returned by every DummyJSON list endpoint. */
export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

/** Everything the products query key needs to identify a result set. */
export type ProductsQuery = {
  page: number;
  pageSize: number;
  search?: string;
  category?: string;
};
