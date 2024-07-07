import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },

        withdraw(state, action) {
            state.balance -= action.payload;
        },

        // dispatch(requestLoan(loanAmount, loanPurpose));
        //  ici dans requestLoan en deux paramters loanAmount et loanPurpose donc pour pauvoir les lire en doit ajouter 
        // la fonction prepare, exemple:
        // ou bien en peux aussi faire comme ca dispatch(requestLoan({ amount: loanAmount, purpose: loanPurpose }));
        // sans la fonction prepare
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                }
            },
            reducer(state, action) {
                if (state.loan)
                    return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            }
        },

        payLoan(state, action) {
            state.balance -= state.loan;
            state.loanPurpose = '';
            state.loan = 0;
        },

        convertingCurrency(state, action) {
            // state.isLoading = true;
            state.isLoading = true;
        },
    }
});


export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === 'USD')
        return { type: "account/deposit", payload: amount };

    return function (dispatch, getState) {
        dispatch({ type: 'account/convertingCurrency' });

        fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
            .then((res) => res.json())
            .then((data) => {
                return dispatch({ type: "account/deposit", payload: data.rates.USD });
            })
            .catch((err) => console.error(err));
    }
}

export default accountSlice.reducer;


// const initialStateAccount = {
//     balance: 0,
//     loan: 0,
//     loanPurpose: "",
//     isLoading: false,
// };

// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false,
//             };

//         case "account/withdraw":
//             return {
//                 ...state,
//                 balance: state.balance - action.payload,
//             };

//         case "account/requestLoan":
//             if (state.loan) return state;
//             //  LATER
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             };

//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan,
//             };

//         case "account/convertingCurrency":
//             return {
//                 ...state,
//                 isLoading: true,
//             };

//         default:
//             return state;
//     }
// }


// export function deposit(amount, currency) {
//     if (currency === 'USD')
//         return { type: "account/deposit", payload: amount };

//     return function (dispatch, getState) {
//         dispatch({ type: 'account/convertingCurrency' });

//         fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//             .then((res) => res.json())
//             .then((data) => {
//                 return dispatch({ type: "account/deposit", payload: data.rates.USD });
//             })
//             .catch((err) => console.error(err));

//     }
// }

// export function withdraw(amount) {
//     return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { amount, purpose },
//     };
// }

// export function payLoan() {
//     return { type: "account/payLoan" };
// }