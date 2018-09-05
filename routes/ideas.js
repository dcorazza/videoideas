const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Load Idea Module
require('../modules/Idea');
const Idea = mongoose.model('ideas');

router.get('/', (req, res) => {
    Idea.find({})
        .sort({ date: "desc" })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

router.get('/add', (req, res) => {
    res.render('ideas/add');
});

router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            res.render('ideas/edit', {
                idea: idea
            });
        })
});

//Process Form

router.post('/', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!req.body.detail) {
        errors.push({ text: 'Please add some detail' });
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            detail: req.body.detail
        });
    } else {
        const newUser = {
            title: req.body.title,
            detail: req.body.detail
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg','Video idea added');
                res.redirect('ideas');
            });
    }
});

router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            idea.title = req.body.title;
            idea.detail = req.body.detail;

            idea.save()
                .then(idea => {
                    req.flash('success_msg','Video idea updated');
                    res.redirect('/ideas');
                })
        });
});

router.delete('/:id', (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg','Video idea removed');
            res.redirect('/ideas');
        });
});

module.exports = router;