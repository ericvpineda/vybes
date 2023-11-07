import {Schema, model} from "mongoose"

const postSchema = new Schema({
    userId: {type: String, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String},
    body: {type: String, max: 140},
    location: {type: String, max: 50},
    imageUrl: String,
    userImageUrl: String,
    likes: {
        type: Map,
        of: Boolean,
        default: {}
    },
    comments: {type: Array, default: []}
}, { timestamps: true })

const Post = model("Post", postSchema);
export default Post