const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../models/Record')

//root post requests
//200 for successful req
//422 for invalid parameters
//200 /w error message for successful req but db error
router.post('/', async (req, res) => {
    var response = {
        code: 0,
        msg: "",
        records: [] 
    }

    if (!moment(req.body.endDate, 'YYYY-MM-DD', true).isValid() || 
        !moment(req.body.startDate, 'YYYY-MM-DD', true).isValid() || 
        !Number.isInteger(req.body.minCount) || 
        !Number.isInteger(req.body.maxCount)){
        response.code = 422
        response.msg = 'Invalid or missing Parameter'
        return res.status(422).json(response)
    }
    try {
        const records = await Record.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate)}
                }
            },
            {
                $project: {
                    key: 1,
                    totalCount: {$sum: "$counts"},
                    createdAt: 1
                }
            },
            {
                $match: {
                    totalCount: { $gte: req.body.minCount, $lte: req.body.maxCount}
                }
            }
        ])
        response.msg = 'Success'
        response.records = records
        res.status(200).json(response);
    }catch(err){
        response.code = 1,
        response.msg = err.message
        res.status(200).json(response);
    }
})


module.exports = router