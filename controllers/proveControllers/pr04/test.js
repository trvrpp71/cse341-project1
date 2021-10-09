exports.getI = (req, res, next) => {
    res.render('./prove/PR04/testIndex', {
          pageTitle: 'Test Home',
          path: '/test'
        });

    };

