const { connectDB } = require('../../config/db');
const PostModel = require('../../models/PostModel');

exports.GET = async function (req, res) {
  try {
    await connectDB();
    const postId = req.query.id;
    if (postId) {
      const post = await PostModel.findById(postId);
      return res.status(200).json(post);
    } else {
      const posts = await PostModel.find({});
      return res.status(200).json({ posts });
    }
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return res.status(500).json({ error: 'Erro ao buscar posts' });
  }
};

exports.POST = async function (req, res) {
  try {
    await connectDB();
    const formData = req.body;

    const postData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      alt: formData.alt,
      author: formData.author,
      authorImg: formData.authorImg,
      readingTime: formData.readingTime,
      content: formData.content
    };

    await PostModel.create(postData);

    return res.status(201).json({ success: true, message: "Post Adicionado" });
  } catch (error) {
    console.error('Erro ao adicionar post:', error);
    return res.status(500).json({ error: 'Erro ao adicionar post' });
  }
};