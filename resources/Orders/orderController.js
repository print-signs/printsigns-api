import { Order } from './orderModel.js'
import { generate } from "generate-password";

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

        req.body.user = req.user._id
        req.body.order_id = order_id
        const order = await Order.create(req.body);

        res.status(201).json({
            success: true,
            order,
            message: 'order Created',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }

}

export const getAllOrder = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)


        const order = await Order.find().populate({
            path: "user",
            select: "name -_id",
        }).sort({ createdAt: -1 });
        if (order) {
            res.status(201).json({
                success: true,
                order,
                message: 'All Order Fetched',
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }

}
export const getSingleOrder = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)
        if (!req.params.id) return res.status(400).json({ message: "please Provide Order Id" });



        const order = await Order.findById(req.params.id).populate({
            path: "user",
            select: "name -_id",


        }).populate({
            path: "shippingInfo",

            populate: {
                path: "Franchisee",
                select: "banner price_Lable ",
            },
        }).sort({ createdAt: -1 });
        if (order) {
            res.status(201).json({
                success: true,
                order,
                message: ' Order Fetched',
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });

    }

}

export const EditOrderBeforePayment = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)
        if (!req.params.id) return res.status(400).json({ message: "please Provide Order Id" });



        const order = await Order.findById(req.params.id)
        if (order) {
            if (order.isPaid === false) {



                if (order.user.toString() === req.user._id.toString()) {
                    req.body.user = req.user._id

                    const ModifyOrder = await Order.findByIdAndUpdate(req.params.id, req.body,

                        {
                            new: true,
                            runValidators: true,
                            useFindAndModify: false,
                        }

                    );
                    res.status(200).json({
                        success: true,
                        order: ModifyOrder,
                        message: ' Order Updated',
                    });
                }
                else {
                    return res.status(400).json({ message: 'You not created This So You Can not Edit this Order !! ' })

                }


            }
            else {
                return res.status(400).json({ message: 'order can not Edited Because Payment Done !! ' })

            }

        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }

}
export const deleteOneOrder = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        if (!req.params.id) return res.status(400).json({ message: "please Provide Order Id" });
        const getOrder = await Order.findById(req.params.id);
        if (!getOrder) {
            return res.status(404).json({
                success: false,
                message: "No Order  Found!"
            });

        }
        const order = await Order.findByIdAndDelete(req.params.id)

        await order.remove();
        res.status(200).json({
            success: true,
            message: "Order Deleted Successfully!!",

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }

}


