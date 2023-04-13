const { searchEdamam } = require('../utils/edamamUtils');

const search = async (req, res, next) => {
    const searchText = req.body.searchText;

    try {
        const recipe = await searchEdamam(searchText);
        res.json(recipe);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports = {
    search,
}