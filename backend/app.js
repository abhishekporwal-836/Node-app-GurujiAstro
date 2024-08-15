const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@simple-node-voting-app.5yoi7.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

const counterSchema = new mongoose.Schema({
    count: Number
});

const Counter = mongoose.model('Counter', counterSchema);

// Initialize the count in the database if it doesn't exist
Counter.findOne({}, (err, doc) => {
    if (err) {
        console.error('Error checking counter existence:', err.message);
    } else if (!doc) {
        const newCounter = new Counter({ count: 0 });
        newCounter.save().catch(saveErr => console.error('Error saving initial counter:', saveErr.message));
    }
});

// Serve the frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Endpoint to handle the increment action
app.post('/increment', (req, res) => {
    Counter.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true }, (err, doc) => {
        if (err) {
            return res.status(500).send({ message: 'Error incrementing counter' });
        }
        res.json({ count: doc.count });
    });
});

// Endpoint to get the current counter value
app.get('/getCount', (req, res) => {
    Counter.findOne({}, (err, doc) => {
        if (err) {
            return res.status(500).send({ message: 'Error retrieving counter' });
        }
        res.json({ count: doc ? doc.count : 0 });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
