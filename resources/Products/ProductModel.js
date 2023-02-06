import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        maxLength: [25, "name cannot exceed 25 characters"],
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    description: {
        type: String,
        maxLength: [100, "description cannot exceed 100 characters"],
        required: [true, "Please Enter product Description"],
    },
    base_Price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    base_Price_With_Tax: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },

    price_Level_2: {
        type: Number,
        required: true,

        maxLength: [8, "price leval2 cannot exceed 8 characters"],
    },
    price_Level_2_With_Tax: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },

    price_Level_3: {
        type: Number,
        required: true,

        maxLength: [8, "price leval3 cannot exceed 8 characters"],
    },
    price_Level_3_With_Tax: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    taxId: {
        type: Schema.Types.ObjectId,

        ref: "Tax"
    },

    image:
    {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },





}, { timestamps: true });

export const Product = model("Product", productSchema);
