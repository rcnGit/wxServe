let account = JSON.parse(sessionStorage.getItem("account")) || {
    meatTitle: ""
};



const state = {
    account: account
};
export default state;