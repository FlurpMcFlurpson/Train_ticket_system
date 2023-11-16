App = {
    url: 'http://127.0.0.1:7545',

    init: function () {
        return application.initWeb3();
    },

    initWeb3: function () {
        App.web3Provider = web3.currentProvider;

        return App.initContract();
    },

    initContract: function () {

        App.contract.vote.setProvider(App.web3Provider);
        getJSON('Train_tickets.json', function (data) {

            return App.bindEvents();

        }),

},

}