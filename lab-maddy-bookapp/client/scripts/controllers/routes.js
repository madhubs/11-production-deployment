//route is responsible for bridging model and view

page('/*', (ctx, next) => { //anything that matches 
    $('.page').hide()
    next()
})


page('/', ()=> {
    $('.page').hide()
    // $('#book-list-page').show() //handing off some of this work to book-view.js
    // app.bookListPage.initIndexView([{foo:'bar'}]) junkkkk
    app.Book.fetchAll().then(books => {
        app.bookListPage.initIndexView(books)
    }) //give us all the books, when you're done fetching .THEN us the data I want to get it and pass it along to the initIndex   

//fetch data for all books
//convert raw data into Book instance
//populate list with books
// handlebars template per book 
})

//ctx = req, res smooshed together 
page('/books/:id', (ctx)=> {
    $('.page').hide()
    $('#book-detail-page').show()
})


page('/books/create', ()=> {
    $('.page').hide()
    $('#book-create-page').show()
})


page('/error', ()=> {
    $('.page').hide()
    $('#error-page').show()
})

page.start()