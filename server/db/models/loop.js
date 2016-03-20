'use strict';

var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    length: {
        type: String,
        required: true,
        enum: ['1n', '2n', '4n', '8n', '16n']
    },
    value: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[a-g]#*b*[1-9][0]*/gi.test(value) || /\d/g.test(value);
            },
            message: '{VALUE} is not a valid note - correct format is <noteLetter>[#|b]<octaveNumber> OR frequency as a number'
        }
    }
})

var LoopSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],
    publish: Boolean,
    name: {
        type: String,
        unique: true
    },
    numUses: Number,
    source: String,
    category: {
        type: String,
        enum: ['rhythm', 'chord', 'melody']
    }
});

LoopSchema.statics.findByCreator = function(userId) {
    return this.find({creator: creator});
};

LoopSchema.statics.findByTag = function(tag) {
    return this.find({tags: tag});
};

LoopSchema.statics.findByTags = function(tags) {
    return this.find({tags: { $in: tags } });
};

module.exports = mongoose.model('Loop', LoopSchema);
