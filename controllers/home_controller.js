const Project = require('../models/project');
const moment = require('moment');

module.exports.home = async function (req, res) {
    try {
        let projects = await Project.find({}).sort('-createdAt');
        return res.render('home', {
            title: 'Issue Tracker | Home',
            projects,
            moment,
        });
    } catch {
        console.log('Error', err);
        return;
    }
};
