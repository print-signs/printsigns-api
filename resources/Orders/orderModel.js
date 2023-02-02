import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        order_id: { type: String },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },

        shippingInfo: [{
            name: { type: String, required: true, },
            address: {
                type: String,
                default: '',
            },
            contact_Person_Name: { type: String, default: "" },
            city: {
                type: String,

                default: ''
            },

            state: {
                type: String,
                default: ''
            },

            // country: {
            //     type: String,
            //     required: true,
            // },
            pinCode: {
                type: Number,
                default: '',
            },
            contact_Number: {
                type: Number,
                default: ''
            },
            Franchisee: {
                type: mongoose.Schema.ObjectId,
                ref: "Temple",
            },
        }],
        orderItems: [
            {
                name: {
                    type: String,
                    default: ''
                },
                price: {
                    type: Number,
                    default: ''
                },
                quantity: {
                    type: Number,
                    default: '',
                    default: 1
                },
                image: {
                    type: String,
                    default: '',
                },
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Product",

                },
            },
        ],

        shipping_charge: { type: Number, default: 0 },
        tax_amount: { type: Number, default: 0 },
        total_amount: { type: Number, default: 0 },
        weight: { type: Number, default: 0 },

        paymentMode: {
            type: String,
            default: ''
        },
        paymentInfo: {
            id: {
                type: String,
                // required: true,
                default: ""
            },
            status: {
                type: String,
                enum: ["pending", "success", "failed"],
            },
            paymentTime: {
                type: Date,
            },
        },


        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date,

        },







        orderStatus: {
            type: String,
            enum: [
                "new",
                "processing",
                "dispatched",
                "delivered",
                "cancelled",
                "returned",
            ],
            default: "new",
        },

        // razorpay_order_id: { type: String },
        // razorpay_payment_id: { type: String },
        // razorpay_signature: { type: String },
        // order_used: { type: Boolean, default: false },
        // isDelivered: { type: Boolean,required:true,default:false },
        // deliveredAt: { type: Date },
        status_timeline: {
            new: { type: Date },
            processing: { type: Date },
            dispatched: { type: Date },
            delivered: { type: Date },
            cancelled: { type: Date },
            returned: { type: Date },
        },
        // courier_name: { type: String },
        // tracking_id: { type: String },
    },
    { timestamps: true, versionKey: false }
);

export const Order = mongoose.model("Order", orderSchema);
