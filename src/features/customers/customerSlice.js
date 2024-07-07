import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAt: new Date().toISOString(),
                    },
                };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        },
    },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;



// const initialStateCustomer = {
//     fullName: "Mohamed",
//     nationalID: "1212",
//     createdAt: "",
// };

// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                 fullName: action.payLoan.fullName,
//                 nationalID: action.payLoan.nationalID,
//                 createdAt: action.payLoan.createdAt,
//             };

//         case "customer/updateCustomer":
//             return {
//                 ...state,
//                 fullName: action.payLoan.fullName,
//             };

//         default:
//             return state;
//     }
// }


// export function createCustomer(fullName, nationalID) {
//     return {
//         type: "customer/createCustomer",
//         payLoan: {
//             fullName,
//             nationalID,
//             createdAt: new Date().toDateString(),
//         },
//     };
// }

// export function updateName(fullName) {
//     return {
//         type: "customer/updateName",
//         payLoan: fullName,
//     };
// }
