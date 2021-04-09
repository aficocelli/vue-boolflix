var app = new Vue ({

  el: '#root',

  data:{
    movies: [],
    movieInput: "",
    indexOf: null
  },

  methods: {
    overlay: function(i) {

      return this.indexOf = this.movies[i].id;

    },
    searchMovie: function(){

      let myThis = this;

      axios.get('https://api.themoviedb.org/3/search/movie', {

        params: {

          api_key: '5c71d6d9a1c9e5778b11fdc5540b3ed2',
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
