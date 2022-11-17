import { Pizza } from '../../../application/schema/types/schema';

export interface QueryInput {
  limit?: number | null;
  cursor?: string | null;
}

export interface GetPizzasResponse {
  results: Pizza[];
  totalCount: number;
  hasNextPage: boolean;
  cursor: string;
}
