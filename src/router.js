const express = require('express');
const vioService = require('./service');
const jwt = require('jsonwebtoken');
const validator = require('validator')
const vioRouter = express.Router();
const bodyParser = express.json();
const multer = require('multer');
const {
    app
} = require('./app'); //this was path instead of app
const mime = require('mime-types')
const fs = require('fs');
const path = require('path');


vioRouter.route('/agform')
    .post(bodyParser, (req, res, next) => {
        // if (err) {
        //     next(err)
        // }
        const {
            name,
            company,
            phone,
            email,
            lat,
            lng,
            addressResult,
            iStakeholderText,
            iStakeholderOther,
            aStakeholderText,
            aStakeholderOther,
            iname,
            iphone,
            iemail,
            violation1,
            locCreate,
            noticeNo,
            damageAssoc,
            damageAmt,
            udText,
            pipeDamage,
            fireDept,
            vioDate,
            desc,
            nameList,
            creation,
            violationOther,
            exTypeOther,
            inOnSite,
            violation2,
            violation2Other,
            violation3,
            violation3Other
        } = req.body;
        vioService.agFormSubmit(
                req.app.get('db'),
                name,
                company,
                phone,
                email,
                lat,
                lng,
                addressResult,
                iStakeholderText,
                iStakeholderOther,
                aStakeholderText,
                aStakeholderOther,
                iname,
                iphone,
                iemail,
                violation1,
                locCreate,
                noticeNo,
                damageAssoc,
                damageAmt,
                udText,
                pipeDamage,
                fireDept,
                vioDate,
                desc,
                nameList,
                creation,
                violationOther,
                exTypeOther,
                inOnSite,
                violation2,
                violation2Other,
                violation3,
                violation3Other
            )
            .then(data => {
                console.log(data)
                res.sendStatus(201)
            }).catch(e => {
                console.log(e)
                // log_file.write(util.format(e) + '\n');
                // log_stdout.write(util.format(e) + '\n');
                return res.status(400).send('error in the system').end()
            })
    })