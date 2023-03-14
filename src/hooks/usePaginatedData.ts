import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';

/*
EXAMPLE USAGE

  const myQueryObject: QueryObject<ConsumableExercise> = {
    tableName: 'consumableexercises',
    select: "*",
    filters: [['eq', 'exerciseName', 'Bicep Curl']],
    sort: {column: 'created_at'}
  }
*/
export interface QueryObject<T extends object> {
  tableName: string;
  select: string;
  filters?: [[string, keyof T, number | string]]; // gt, gte, lt, lte, eq, ...
  sort?: { column: keyof T; ascending?: boolean };
  single?: boolean;
}

/**
 * Paginization layer on data from inputted query
 * @param query - custom query sent to supabase
 * @param size - the max amount of items that can be returned per fetch
 */
export const usePaginatedData = <T extends object>(queryObject: QueryObject<T>, size: number) => {
  const [paginatedData, setPaginatedData] = useState<Array<T>>([]);
  const [error, setError] = useState<PostgrestError | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(0);

  const parseQueryObject = () => {
    let queryBuilder;
    if (queryObject.filters) {
      queryBuilder = queryObject.filters.reduce((acc, [filter, ...args]) => {
        // @ts-expect-error ts can't parse that acc[filter] is a function
        return acc[filter](...args);
      }, supabase.from(queryObject.tableName).select(queryObject.select));
    } else {
      queryBuilder = supabase.from(queryObject.tableName).select(queryObject.select);
    }
    if (queryObject.sort) {
      queryBuilder.order(String(queryObject.sort.column), {
        ascending: queryObject.sort.ascending ?? true,
      });
    }
    if (queryObject.single) {
      queryBuilder.single();
    }
    return queryBuilder;
  };

  const [queryBuilder] = useState(parseQueryObject());

  // fetch data from supabase
  const fetchData = async () => {
    setLoading(true);

    // Send query to supabase
    const limit = index + size - 1;
    const { data, error } = await queryBuilder.range(index, limit);
    const count = data?.length;
    if (error) {
      setError(error);
      return;
    }
    if (count && count > 0) {
      setPaginatedData(paginatedData.concat(data as T));
      setIndex(index + count);
    }
    setError(undefined);
    setLoading(false);
  };

  // Run on first render
  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreData = () => {
    fetchData();
  };

  return { paginatedData, loading, error, loadMoreData };
};
