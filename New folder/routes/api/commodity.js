const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');
const Field = require('../../models/Field');
const Commodity = require('../../models/Commodity');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const main = require('../../config/main');

router.get('/get/field', passport.authenticate('jwt', {session:false}), (req, res) => {
    
    Field.find()
    .then(fields => {
        console.log(fields);
        res.json({ data: fields });
    })
})

router.post('/add/field', passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log(req.body);
    const newField = new Field({
        field: req.body.field
    });
    newField.save().then((field) => {
        Field.find().then(fields => {
            console.log(fields);
            res.json({ message: 'Add Field Success', data:fields })
        });
    });
})

router.post('/add/shop', passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log(req.body);
    Field.findOne({field: req.body.field})
    .then(field => {
        field.shopList.push({ shop: req.body.shop });
        field.save().then((save) => {
            console.log(save);
            Field.find()
            .then(fields => {
                res.json({ message: 'Add Shop Success', data: fields });
            })
        });
    })
})

router.post('/add/commodity', passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log(req.body);
    const newCommodity = new Commodity({...req.body, remain: req.body.stock});
    newCommodity.save().then(comm => {
        res.status(200).json({message:'New Commodity is added.', data:comm});
    })
})

router.post('/get/commodity', passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log(req.body);
    var filter = {};
    if(req.body.myField) {
        filter['field'] = req.body.myField;
    }

    if(req.body.myShop) {
        filter['shop'] = req.body.myShop;
    }
    Commodity.find(filter, null, null)
    .then(commodities => {
        console.log(commodities);
        res.json({ data: commodities });
    })   
})

// router.post('/add/figure', passport.authenticate('jwt', {session:false}), (req, res) => {

// })

module.exports = router;