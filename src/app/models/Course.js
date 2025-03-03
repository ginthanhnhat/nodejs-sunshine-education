const mongoose = require('mongoose')
const slugify = require('slugify');
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose);

const mongooseDelete = require('mongoose-delete');

const CourseSchema = new Schema(
    {
        name: { type: String, maxLength: 255, require: true},
        description: { type: String, maxLength: 1000},
        image: { type: String, maxLength: 255, require: true},  
        slug: { type: String, unique: true },
        createAt: { type: Date, default: Date.now},
        updateAt: { type: Date, default: Date.now},
    }
)

// Auto increment id
CourseSchema.plugin(AutoIncrement, { inc_field: 'index' });

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)

        return this.sort({ 
            [req.query.column] : isValidType ? req.query.type : 'asc'
        });
    }

    return this
};

// Add plugin
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

// Middleware để tự động tạo slug trước khi lưu
CourseSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Course', CourseSchema);