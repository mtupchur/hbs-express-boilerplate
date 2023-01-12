require('dotenv').config()
const fs = require('fs');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {
    NODE_ENV,
    AWSUSER,
    AWSPW
} = require('./config')
const path = require('path')
const hbs = require('hbs')
// router name here //
const vioRouter = require('./router')
//////////////////////

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const morganOption = (NODE_ENV === 'production') ?
    'tiny' :
    'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(vioRouter)

// handlebars set up and config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Violation Complaint Form'
    })
})

// app.get('/', (req, res) => {
//     res.send('Hello, world!')
// })

app.get('*', (req, res) => {
    // errorTransporter.sendMail({
    //     from: 'ag_complaint_error@sc811.com',
    //     to: 'matthew.upchurch@sc811.com', // list of receivers
    //     subject: "New AG Complaint Form Error", // Subject line
    //     html: `
    //   <p>An error happened</p>
    //   ` // html body
    // })
    res.render('errorpage', {
        title: 'Violation Complaint Form'
    })
})

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = {
            error: {
                message: 'server error'
            }
        }
    } else {
        console.error(error);
        response = {
            message: error.message,
            error
        }
    }
    res.status(500).json(response);
})

module.exports = app