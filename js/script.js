var app = new Vue ({

  el: '#root',

  // data
  data:{
    movies: [],
    series:[],
    bestMovies:[],
    movieInput: "",
    indexOf: null,
    apiKey: '5c71d6d9a1c9e5778b11fdc5540b3ed2',
    urlAxios: 'https://api.themoviedb.org/3/search/',
    lang: 'it-IT',
    startValue: true,
    userValue: false
  },
  // data end

  // methods
  methods: {
    // welcome page
    startPage: function(){
      return this.startValue = false;
    },
    userEffect: function(){
      return this.userValue = true;
    },
    resetUserEffect: function(){
      return this.userValue = false;
    },
    // welcome page end

    // overlay movie card
    overlay: function(i) {

      return this.indexOf = this.movies[i].id;

    },
    resetOverlay:function(){
      return this.indexOf = null;
    },

    overlayMost: function(j) {

      return this.indexOf = this.bestMovies[j].id;

    },

    resetOverlayMost:function(){
      return this.indexOf = null;
    },

    // overlay movie card end

    // api movie search
    searchMovie: function(){

      let myThis = this;
      myThis.bestMovies = null;
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
    // api movie search end

  },
  // methods end
  mounted: function () {
    let selfThis = this;

    axios.get(selfThis.urlAxios + 'multi', {

      params: {

        api_key: selfThis.apiKey,
        query: 'titanic',
        language: selfThis.lang

      }

    })
    .then(function(response){

      selfThis.bestMovies = response.data.results;


    });

  }
});
