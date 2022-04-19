export const processCheckboxData = (
    countries: any[] = [],
    type: string
): string[] => {
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
    return keys;
};


export function escapeRegExp(value: string): string {
    return value.replace(/[^\w_]/g, "");
}