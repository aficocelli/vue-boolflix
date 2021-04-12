var app = new Vue ({

  el: '#root',

  data:{
    movies: [],
    movieInput: "",
    indexOf: null,
    apiKey: '5c71d6d9a1c9e5778b11fdc5540b3ed2',
    urlAxios: 'https://api.themoviedb.org/3/search/',

  },

  methods: {
    overlay: function(i) {

      return this.indexOf = this.movies[i].id;

    },
    resetOverlay:function(){
      return this.indexOf = null;
    },
    searchMovie: function(){

      let myThis = this;

      axios.get(myThis.urlAxios + 'movie', {

        params: {

          api_key: myThis.apiKey,
          query: myThis.movieInput,
          language: 'it-IT'

        }

      })
      .then(function(response){



        myThis.movies = response.data.results;



      });

      axios.get(myThis.urlAxios + 'tv', {

        params: {

          api_key: myThis.apiKey,
          query: myThis.movieInput,
          language: 'it-IT'

        }

      })
      .then(function(response){



        myThis.movies = response.data.results;



      })

    }

  }

});
