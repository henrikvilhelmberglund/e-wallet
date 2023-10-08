import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRandomUser = createAsyncThunk(
    "cards/getRandomUser", async () => {
         let response = await axios.get("https://randomuser.me/api/");
         const { first, last } = response.data.results[0].name;
         const firstName = first.toUpperCase();
         const lastName = last.toUpperCase();
         return { firstName, lastName };
    }
);


const cardSlice = createSlice({
    name: "cards",
    initialState: {
        nextCardId: 1,
        cards: [
            {
                cardholder: {
                    firstName: "hej",
                    lastName: "då",
                },
                vendor: "VISA",
                cardNumber: "1234-1234-1234-1234",
                expireMonth: "9",
                expireYear: "25",
                ccv: "333",
                active: true,
                id: 0,
            },
        ],
    },
    reducers: {
        incrementCardId: (state) => {
            state.nextCardId += 1;
        },
        addCard: (state, action) => {
            state.cards = [...state.cards, action.payload]
        },
        deleteCard: (state, action) => {
            const cardIdToDelete = action.payload;
            state.cards = state.cards.filter((card) => card.id !== cardIdToDelete);
        },
        activeCard: (state, action) => {
            const idToActivate = action.payload;
            state.cards = state.cards.map((card) => ({
              ...card,
              active: card.id === idToActivate,
            }));
          },
    },
    extraReducers: (builder) => {
        builder.addCase(getRandomUser.fulfilled, (state, action) => {
            const { firstName, lastName } = action.payload;
             state.cards.forEach((card) => {
                card.cardholder = {
                    firstName,
                    lastName,
                };
            });
        });
    },
});


export default cardSlice.reducer;

export const incrementCardId = cardSlice.actions.incrementCardId;
export const addCard = cardSlice.actions.addCard;
export const deleteCard = cardSlice.actions.deleteCard;
export const activeCard = cardSlice.actions.activeCard;