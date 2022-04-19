import { CheckboxData } from "../components/Filter/Filter";

export const processCheckboxData = (
    countries: any[] = [],
    type: string
): CheckboxData => {
    const DEFAULT_START = false;
    let keys: string[] = [];
    for (let country of countries) {
        let key;
        if (type === "currency" && !country.currency?.includes(null)) {
            key = country.currency;
        } else if (
            type === "continent" &&
            !country.continent?.code?.includes(null)
        ) {
            key = country.continent.code;
        }
        keys.push(key);
    }
    keys = keys.filter((value: string, index: number, array: string[]) => {
        return array.indexOf(value) === index;
    });
    const checkData = {
        values: keys.map((key: string) => ({ key, value: DEFAULT_START })),
    };
    return checkData;
};