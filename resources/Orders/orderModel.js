import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
      first_Name: {
        type: String,
        required: true,
      },
      last_Name: {
        type: String,
        required: true,
      },
      phone_Number: {
        type: Number,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
        trim: true,
        // Add a regular expression to enforce a specific postal code format
        // For example, assuming a 5-digit format for the United States
        match: /^\d{5}$/,
      },
      country: {
        type: String,
        required: true,
      },
      addressId: {
        type: mongoose.Schema.ObjectId,
        ref: "ShippingAddress",
        required: true,
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          default: "",
        },
        quantity: {
          type: Number,
          default: "",
          default: 1,
        },
        image: [{}],

        price_With_Tax: {
          type: Number,
          default: "",
        },

        taxId: {
          type: String,
          default: "",
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
      enum: ["online", "cod"],
      default: "online",
    },

    payment_status: {
      type: String,
      enum: ["pending", "success", "failed"],
    },
    isPaid: {
      type: Boolean,
      default: false,
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
      //   default: "new",
    },

    paypal_payer_id: { type: String },
    paypal_payment_id: { type: String },
    // paypal_signature: { type: String },
    // order_used: { type: Boolean, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    // deliveredAt: { type: Date },
    status_timeline: {
      new: { type: Date },
      processing: { type: Date },
      dispatched: { type: Date },
      delivered: { type: Date },
      cancelled: { type: Date },
      returned: { type: Date },
    },
    courier_name: { type: String },
    tracking_id: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
