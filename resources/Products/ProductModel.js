import mongoose from "mongoose";

const productSchema = mongoose.Schema({
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
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    price_leval_2: {
        type: Number,
        maxLength: [8, "price leval2 cannot exceed 8 characters"],
    },
    price_leval_3: {
        type: Number,
        maxLength: [8, "price leval3 cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
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
    ],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [100, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
