import { Order } from "./orderModel.js";
import { generate } from "generate-password";
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";
import axios from "axios";

export const getClientId = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      clientId: PAYPAL_CLIENT_ID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    let isUnique = false;
    let order_id = generate({
      length: 9,
      numbers: true,
      lowercase: false,
      uppercase: false,
    });

    while (!isUnique) {
      const unqOrder = await Order.findOne({ order_id });
      if (!unqOrder) {
        isUnique = true;
      } else {
        order_id = generate({
          length: 9,
          numbers: true,
          lowercase: false,
          uppercase: false,
        });
      }
    }

    req.body.user = req.user._id;
    req.body.order_id = order_id;
    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      order,
      message: "order Created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    const order = await Order.find()
      .populate({
        path: "user",
        select: "name -_id",
      })
      .sort({ createdAt: -1 });
    if (order) {
      res.status(201).json({
        success: true,
        order,
        message: "All Order Fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
export const getSingleOrder = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide Order Id" });

    const order = await Order.findById(req.params.id)
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "shippingInfo",

        populate: {
          path: "Franchisee",
          select: "banner price_Lable ",
        },
      })
      .sort({ createdAt: -1 });
    if (order) {
      res.status(201).json({
        success: true,
        order,
        message: " Order Fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const EditOrderBeforePayment = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide Order Id" });

    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.isPaid === false) {
        if (order.user.toString() === req.user._id.toString()) {
          req.body.user = req.user._id;

          const ModifyOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,

            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          );
          res.status(200).json({
            success: true,
            order: ModifyOrder,
            message: " Order Updated",
          });
        } else {
          return res.status(400).json({
            message: "You not created This So You Can not Edit this Order !! ",
          });
        }
      } else {
        return res
          .status(400)
          .json({ message: "order can not Edited Because Payment Done !! " });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
export const deleteOneOrder = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide Order Id" });
    const getOrder = await Order.findById(req.params.id);
    if (!getOrder) {
      return res.status(404).json({
        success: false,
        message: "No Order  Found!",
      });
    }
    const order = await Order.findByIdAndDelete(req.params.id);

    await order.remove();
    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

// parse post params sent in body in json format

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
//  https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  const credentials = `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`;
  const base64Credentials = Buffer.from(credentials).toString("base64");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${base64Credentials}`,
  };

  const data = "grant_type=client_credentials";

  try {
    const response = await axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      data,
      {
        headers: headers,
      }
    );
    // console.log("response.data", response.data);
    const accessToken = response.data?.access_token;
    return accessToken;
    // console.log("Access Token:", accessToken);
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response ? error.response.data : error.message
    );
  }
};
//   } catch (error) {
//     console.error("Failed to generate Access Token:");
//   }
// };

const handleResponse = async (response) => {
  try {
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        responseData: response.data,
        httpStatusCode: response.status,
      };
    }
  } catch (err) {
    const errorMessage = await response.statusText;
    throw new Error(errorMessage);
  }
};

// https://developer.paypal.com/docs/api/orders/v2/#orders_create

export const createOrderCheckout = async (rea, res) => {
  try {
    // const { cart } = req.body;
    // use the cart information passed from the front-end to calculate the purchase unit details
    // console.log(
    //   "shopping cart information passed from the frontend createOrder() callback:",
    //   cart
    // );
    const accessToken = await generateAccessToken();
    const url = `https://api.sandbox.paypal.com/v2/checkout/orders`;
    const createOrderRequest = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "60.00", // Replace with the actual amount
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: "60.00", // Replace with the total value of all items
              },
            },
          },
          items: [
            {
              name: "Apple",
              unit_amount: {
                currency_code: "USD",
                value: "60.00", // Replace with the actual item price
              },
              quantity: 1,
            },
          ],
        },
      ],
    };
    const response = await axios.post(url, JSON.stringify(createOrderRequest), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return res.status(201).json({
        success: true,
        responseData: response.data,
        httpStatusCode: response.status,
      });
    } else {
      // Handle errors or unexpected status codes
      console.error("Error:", response.status, response.statusText);

      //  Optionally, you can parse the error response as JSON if available
      try {
        const errorData = response.data;
        console.error("Error Data:", errorData);
      } catch (error) {
        console.error("Error parsing error data:", error.message);
      }
    }
  } catch (error) {
    const errorMessage = await response.statusText;
    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * Capture payment for the created order to complete the transaction.
 * //see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  const response = await axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    }
  );
  return handleResponse(response);
};

export const captureOrderPayment = async (req, res) => {
  try {
    const { orderID } = req.params;
    const { responseData, httpStatusCode } = await captureOrder(orderID);
    return res.status(httpStatusCode).json(responseData);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};
