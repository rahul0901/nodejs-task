import mongoose, { Schema } from "mongoose";

const product = new Schema({
    pname: String,
    pprice: Number,
    pdescription: String,
    pimage: String,
    pcategory: String,
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

export default mongoose.model("Products", product)