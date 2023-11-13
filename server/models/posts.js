import {Schema, model} from "mongoose"

const postSchema = new Schema({
    userId: {type: String, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, default: ""},
    body: {type: String, max: 140, default: ""},
    location: {type: String, max: 50, default: ""},
    imageUrl: {type: String, default: ""},
    userImageUrl: {type: String, default: ""},
    likes: {
        type: Map,
        of: Boolean,
        default: {}
    },
    comments: {type: Array, default: []}
}, { timestamps: true })

const Post = model("Post", postSchema);
export default Post