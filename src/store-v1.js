import { combineReducers, createStore } from "redux";


const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
            };

        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload,
            };

        case "account/requestLoan":
            if (state.loan) return state;
            //  LATER
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };

        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            };

        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payLoan.fullName,
                nationalID: action.payLoan.nationalID,
                createdAt: action.payLoan.createdAt,
            };

        case "customer/updateCustomer":
            return {
                ...state,
                fullName: action.payLoan.fullName,
            };

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer);


function deposit(amount) {
    return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
    return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: { amount, purpose },
    };
}

function payLoan() {
    return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState().account);

store.dispatch(requestLoan(500, 'buy a car'));
console.log(store.getState().account);

store.dispatch(payLoan());
console.log(store.getState().account);


function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payLoan: {
            fullName,
            nationalID,
            createdAt: new Date().toDateString(),
        },
    };
}

function updateName(fullName) {
    return {
        type: "customer/updateName",
        payLoan: fullName,
    };
}


store.dispatch(createCustomer('Mohamed', 'Algérien'));
console.log(store.getState().customer);