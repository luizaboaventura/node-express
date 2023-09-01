import mongoose from "mongoose";

mongoose.connect("mongodb+srv://luizaboaventuram:luiza123@cluster0.lvbaxyb.mongodb.net/alura-node?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;