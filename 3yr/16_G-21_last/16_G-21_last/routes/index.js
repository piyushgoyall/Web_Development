var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/homepage/:tag", (req, res, next) => {
  const tag = req.params.tag;
  res.render("homepage", { tag: tag });
});

module.exports = router;
