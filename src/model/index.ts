import { Country } from "../generated/graphql";

export interface CountriesPageProps { }

export interface CountryDetailsPageProps { }

export interface SearchProps {
    searchParams: {
        filter?: {
            [key: string]: {
                in: string[];
            };
        };
    };
    onSearchParamsChange: (searchParams: any) => void;
}

export interface CountriesProps {
    countries?: CountryRowProps[];
    loading?: boolean;
}


export interface FilterProps extends SearchProps {
    onFilter: (rows: CountryRowProps[]) => void;
    onLoading: (loading: boolean) => void;
    type: string;
}


export interface CountryProps {
    country: Country;
}

export interface CountryRowProps {
    code: string;
    name: string;
    continent: {
        code: string;
    };
    currency?: string | null;
}

export interface SearchBarProps extends SearchProps {
    onLoading: (loading: boolean) => void;
    onComplete: (rows: CountryRowProps[]) => void;
}