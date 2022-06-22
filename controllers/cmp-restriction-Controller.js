import cmpRestrictionModel from "../models/cmp-restriction-model.js"

export const createRestriction = async (req, res) => {

    try {
        // console.log(req.body)

        const data = await cmpRestrictionModel.create(req.body);
        res.status(201).json({
            success: true,
            msg: " create Restriction Successfully!!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to create Restriction !!"
        });
    }

};
//get All
export const getAllRestriction = async (req, res) => {

    try {
        const Restriction = await cmpRestrictionModel.find();
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            Restriction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

//get One 
export const getOneRestriction = async (req, res) => {

    try {
        const CmpRes = await cmpRestrictionModel.findById(req.params.id);

        res.status(200).json({
            success: true,
            msg: " fetch Restriction  Successfully!!",
            CmpRes,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update 
export const updateRestriction = async (req, res) => {
    try {
        // console.log(req.body)
        const newResData = {
            Abaut_Us: req.body.Abaut_Us,
            Terms_and_Conditions: req.body.Terms_and_Conditions,
            Privacy_Policy: req.body.Privacy_Policy,
        };



        //req.user.id, 
        const ModifyCmpRes = await cmpRestrictionModel.findByIdAndUpdate(req.params.id, newResData,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyCmpRes
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate Restriction!!"

        });
    }

};

