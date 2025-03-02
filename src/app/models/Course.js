const mongoose = require('mongoose')
const slugify = require('slugify');
const Schema = mongoose.Schema

const mongooseDelete = require('mongoose-delete');

const Course = new Schema({
    name: { type: String, maxLength: 255, require: true},
    description: { type: String, maxLength: 1000},
    image: { type: String, maxLength: 255, require: true},  
    slug: { type: String, unique: true },
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
})

Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

// Middleware để tự động tạo slug trước khi lưu
Course.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});


module.exports = mongoose.model('Course', Course);