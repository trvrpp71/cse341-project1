//counter activity
exports.postCounter = (req, res, next) => {
    req.session.counter += Number(req.body.constant);
    res.redirect('/TA05');
}


exports.postReset = (req, res, next) => {
    if (req.body.reset === 'true') {
        req.session.destroy();
        res.redirect('/TA05');
    }
}

exports.postColor = (req, res, next) => {
    req.session.style = req.body.color;

    console.log(req.session.style);

    // if (req.body.color === 1 ){
    //     req.session.style = {color: req.body.color1};
    // } else {
    //     req.session.style = {color: req.body.color2};
    // }

    // console.log(req.session.style.color);

    res.redirect('/TA05')
}

exports.ta05Index = (req, res, next)  =>{

    if(req.session.counter === undefined) {
        req.session.counter = 0;
    }
    
    if (req.session.style === undefined) {
        req.session.style = "#0000000";
    }

    res.render('./team/ta05', {
        pageTitle: 'Week 5 Team Activity',
        path:'/TA05',
        style: req.session.style,
        counter: req.session.counter
    })
}