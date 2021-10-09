exports.getTa4Index = (res, req, next) => {
    res.render('./team/ta04', {
        pageTitle: 'Team Activity 04',
        path: '/team/ta04', // For pug, EJS
    });
}