class HomeController {
    index(_req, res) {
        return res.render('index')
    }
}
export default new HomeController()