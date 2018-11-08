const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];


router.get('/', (req, res) => {
    debug('Routing...')
    res.send(courses);
});


router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course with the given ID ( id=${req.params.id} ) was not found!!`)
    res.send(course);
});


router.post('/', (req, res) => {
    // Validate
    const { error } = validateCourse(req.body);

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message);

    // define new course
    var i = (courses.length) ? (courses[courses.length - 1].id + 1) : 1;
    const course = {
        id: i,
        name: req.body.name
    };
    courses.push(course);

    // Return the new course
    res.send(course);
});


router.put('/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // If not existing, return 404
    if (!course) return res.status(404).send(`The course with the given ID ( id=${req.params.id} ) was not found!!`);

    // Validate
    const { error } = validateCourse(req.body);

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message);

    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
})


router.delete('/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // Not existing, return 404
    if (!course) return res.status(404).send(`The course with the given ID ( id=${req.params.id} ) was not found!!`);

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return deleted course
    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};

module.exports = router;