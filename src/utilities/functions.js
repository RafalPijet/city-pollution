export const createActionName = (reducerName, name) => `app/${reducerName}/${name}`;
export const links = [{path: "/", title: "Home"}, {path: "/countries", title: "Countries"}];
export const availableCountries = [
    {country: "PL", name: "Poland"},
    {country: "FR", name: "France"},
    {country: "DE", name: "Germany"},
    {country: "ES", name: "Spain"}
];
