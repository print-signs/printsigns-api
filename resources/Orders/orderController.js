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
            msg: 'order Created',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something went Wrong' })
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
                msg: 'All Order Fetched',
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message ? error.message : 'Something went Wrong' })
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
                msg: "No Order  Found!"
            });

        }
        const order = await Order.findByIdAndDelete(req.params.id)

        await order.remove();
        res.status(200).json({
            success: true,
            msg: "Order Deleted Successfully!!",

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message ? error.message : 'Something went Wrong' })
    }

}


