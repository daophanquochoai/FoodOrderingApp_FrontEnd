export const getCommonActionsTypeByName = (name: String) => ({
    loginState: `${name}/LOGIN`,
    firstFetch: `${name}/FIRST_FETCH`,
});
