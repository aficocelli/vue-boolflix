var app = new Vue ({

  el: '#root',

  data:{
    movies: [],
    series:[],
    movieInput: "",
    indexOf: null,
    apiKey: '5c71d6d9a1c9e5778b11fdc5540b3ed2',
    urlAxios: 'https://api.themoviedb.org/3/search/',
    lang: 'it-IT',
    startValue: true,
    userValue: false
  },

  methods: {
    startPage: function(){
      return this.startValue = false;
    },
    userEffect: function(){
      return this.userValue = true;
    },
    resetUserEffect: function(){
      return this.userValue = false;
    },
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
          language: myThis.lang

        }

      })
      .then(function(response){



        myThis.movies = response.data.results;



      });

      axios.get(myThis.urlAxios + 'tv', {

        params: {

          api_key: myThis.apiKey,
          query: myThis.movieInput,
          language: myThis.lang

        }

      })
      .then(function(response){



        myThis.series = response.data.results;

        myThis.series.forEach(element => {

          myThis.movies.push(element);

        });



      })

    }

  }

});
