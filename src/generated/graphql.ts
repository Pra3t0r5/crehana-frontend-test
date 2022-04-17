import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _Any: any;
};

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['ID'];
  countries?: Maybe<Array<Country>>;
  name: Scalars['String'];
};

export type ContinentFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Country = {
  __typename?: 'Country';
  capital?: Maybe<Scalars['String']>;
  code: Scalars['ID'];
  continent: Continent;
  currency?: Maybe<Scalars['String']>;
  emoji: Scalars['String'];
  emojiU: Scalars['String'];
  languages: Array<Language>;
  name: Scalars['String'];
  native: Scalars['String'];
  phone: Scalars['String'];
  states?: Maybe<Array<State>>;
};

export type CountryFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
  continent?: InputMaybe<StringQueryOperatorInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  native?: Maybe<Scalars['String']>;
  rtl: Scalars['Boolean'];
};

export type LanguageFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  continent?: Maybe<Continent>;
  continents: Array<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  language?: Maybe<Language>;
  languages: Array<Language>;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};


export type QueryContinentArgs = {
  code: Scalars['ID'];
};


export type QueryContinentsArgs = {
  filter?: InputMaybe<ContinentFilterInput>;
};


export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>;
};


export type QueryCountryArgs = {
  code: Scalars['ID'];
};


export type QueryLanguageArgs = {
  code: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguageFilterInput>;
};

export type State = {
  __typename?: 'State';
  code?: Maybe<Scalars['String']>;
  country: Country;
  name: Scalars['String'];
};

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  glob?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['String']>;
};

export type _Entity = Continent | Country | Language;

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type CountriesQueryVariables = Exact<{
  filter?: InputMaybe<CountryFilterInput>;
}>;


export type CountriesQuery = { __typename?: 'Query', countries: Array<{ __typename: 'Country', capital?: string | null, code: string, currency?: string | null, emoji: string, emojiU: string, name: string, native: string, phone: string, continent: { __typename?: 'Continent', code: string, name: string }, languages: Array<{ __typename?: 'Language', code: string, name?: string | null }>, states?: Array<{ __typename?: 'State', code?: string | null, name: string }> | null }> };

export type CountryQueryVariables = Exact<{
  code: Scalars['ID'];
}>;


export type CountryQuery = { __typename?: 'Query', country?: { __typename?: 'Country', code: string, name: string, native: string, phone: string, capital?: string | null, currency?: string | null, emoji: string, emojiU: string, continent: { __typename?: 'Continent', code: string, name: string }, languages: Array<{ __typename?: 'Language', code: string, name?: string | null, rtl: boolean }> } | null };

export type ContinentsQueryVariables = Exact<{
  filter?: InputMaybe<ContinentFilterInput>;
}>;


export type ContinentsQuery = { __typename?: 'Query', continents: Array<{ __typename?: 'Continent', code: string, name: string, countries?: Array<{ __typename?: 'Country', code: string }> | null }> };

export type LanguageQueryVariables = Exact<{
  filter?: InputMaybe<LanguageFilterInput>;
}>;


export type LanguageQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', code: string, name?: string | null, native?: string | null, rtl: boolean }> };


export const CountriesDocument = `
    query Countries($filter: CountryFilterInput = {}) {
  countries(filter: $filter) {
    __typename
    capital
    code
    continent {
      code
      name
    }
    currency
    emoji
    emojiU
    languages {
      code
      name
    }
    name
    native
    phone
    states {
      code
      name
    }
  }
}
    `;
export const useCountriesQuery = <
      TData = CountriesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: CountriesQueryVariables,
      options?: UseQueryOptions<CountriesQuery, TError, TData>
    ) =>
    useQuery<CountriesQuery, TError, TData>(
      variables === undefined ? ['Countries'] : ['Countries', variables],
      fetcher<CountriesQuery, CountriesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CountriesDocument, variables),
      options
    );
export const CountryDocument = `
    query Country($code: ID!) {
  country(code: $code) {
    code
    name
    native
    phone
    continent {
      code
      name
    }
    capital
    currency
    languages {
      code
      name
      rtl
    }
    emoji
    emojiU
  }
}
    `;
export const useCountryQuery = <
      TData = CountryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: CountryQueryVariables,
      options?: UseQueryOptions<CountryQuery, TError, TData>
    ) =>
    useQuery<CountryQuery, TError, TData>(
      ['Country', variables],
      fetcher<CountryQuery, CountryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CountryDocument, variables),
      options
    );
export const ContinentsDocument = `
    query Continents($filter: ContinentFilterInput = {}) {
  continents(filter: $filter) {
    code
    name
    countries {
      code
    }
  }
}
    `;
export const useContinentsQuery = <
      TData = ContinentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: ContinentsQueryVariables,
      options?: UseQueryOptions<ContinentsQuery, TError, TData>
    ) =>
    useQuery<ContinentsQuery, TError, TData>(
      variables === undefined ? ['Continents'] : ['Continents', variables],
      fetcher<ContinentsQuery, ContinentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ContinentsDocument, variables),
      options
    );
export const LanguageDocument = `
    query Language($filter: LanguageFilterInput = {}) {
  languages(filter: $filter) {
    code
    name
    native
    rtl
  }
}
    `;
export const useLanguageQuery = <
      TData = LanguageQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: LanguageQueryVariables,
      options?: UseQueryOptions<LanguageQuery, TError, TData>
    ) =>
    useQuery<LanguageQuery, TError, TData>(
      variables === undefined ? ['Language'] : ['Language', variables],
      fetcher<LanguageQuery, LanguageQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, LanguageDocument, variables),
      options
    );