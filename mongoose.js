const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'premium', 'admin'],

        default: 'user'
    }
});