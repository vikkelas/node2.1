module.exports = (req,res) => {
    res.status(404);
    res.json('Такой адрес не существует');
}