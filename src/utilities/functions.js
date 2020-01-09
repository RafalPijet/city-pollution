export const createActionName = (reducerName, name) => `app/${reducerName}/${name}`;

export const links = [{path: "/", title: "Home"}, {path: "/countries", title: "Countries"}];

export const availableCountries = [
    {country: "PL", name: "Poland"},
    {country: "FR", name: "France"},
    {country: "DE", name: "Germany"},
    {country: "ES", name: "Spain"}
];

export const checkPath = (path, link) => {
    let result = false;
    if (path === link) {
        result = true
    } else if (link !== "/") {
        availableCountries.forEach(item => {
                if (path.includes(item.name)) result = true
            });
    }
    return result
};

export const transformData = data => {
    let set = Array.from(new Set(data.map(item => JSON.stringify(item.city)))).map(JSON.parse);
    let result = [];
    data.forEach(item => {

        if (set.includes(item.city)) {
            result = [...result, {name: item.city, value: item.value}];
            set.splice(set.indexOf(item.city), 1);
        }
    });
    return result.slice(0, 10);
};

export const sortByValue = (a, b) => {
    let comparison = 0;

    if (a.value > b.value) {
        comparison = -1;
    } else if (a.value < b.value) {
        comparison = 1;
    }
    return comparison;
};
