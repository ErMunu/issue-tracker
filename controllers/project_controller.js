const Project = require('../models/project');
const Issue = require('../models/issue');
const moment = require('moment');

module.exports.projectForm = (req, res) => {
    return res.render(
        'project_form',
        {
            title: 'Issue Tracker | Project Form',
        }
    );
}

module.exports.createProject = (req, res) => {
    try {
        Project.create({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
        });
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.project = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id).populate({
            path: 'issues',
        });

        if (project) {
            return res.render('project_page', {
                title: 'Issue Tracker | Project Page',
                project,
                moment
            });
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.issueForm = async (req, res) => {
    let project = await Project.findById(req.params.id);
    return res.render(
        'issue_form',
        {
            title: 'Issue Tracker | Project Form',
            project
        }
    );
}

// create issue
module.exports.createIssue = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (project) {
            let issue = await Issue.create({
                title: req.body.title,
                description: req.body.description,
                labels: req.body.labels,
                author: req.body.author,
            });
            project.issues.push(issue);

            if (!(typeof req.body.labels === 'string')) {
                for (let label of req.body.labels) {
                    let isPresent = project.labels.find((obj) => obj == label);
                    if (!isPresent) {
                        project.labels.push(label);
                    }
                }
            } else {
                let isPresent = project.labels.find((obj) => obj == req.body.labels);
                if (!isPresent) {
                    project.labels.push(req.body.labels);
                }
            }
            await project.save();
            return res.redirect(`/project/${req.params.id}`);
        } else {
            console.log('project not found')
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};
