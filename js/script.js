var app = new Vue ({

  el: '#root',

  // data
  data:{
    movies: [],
    series:[],
    bestMovies:[],
    randomMovie:[],
    movieInput: "",
    indexOf: null,
    apiKey: '5c71d6d9a1c9e5778b11fdc5540b3ed2',
    urlAxios: 'https://api.themoviedb.org/3/search/',
    lang: 'it-IT',
    startValue: true,
    userValue: false,
    rightMovie: 5,
    movieKeyword:['titanic', 'fight', 'dragon', 'sleepers', 'forrest', 'ritorno', 'blow'],
    indexKeyword: 7,
    randomIndex: 2,

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

    // movies scroll
    rightScroll: function(){

      this.bestMovies = [];

      for(this.rightMovie; this.bestMovies.length < 5; this.rightMovie++){

        this.bestMovies.splice(this.rightMovie, 1 , this.randomMovie[this.rightMovie]);

      }
      if (this.rightMovie == this.randomMovie.length){

        this.rightMovie = 0;
      }

      return this.bestMovies;

    },
    leftScroll: function(){

      this.bestMovies = [];

      for(this.rightMovie; this.bestMovies.length < 5; this.rightMovie++){

        this.bestMovies.splice(this.rightMovie, 1 , this.randomMovie[this.rightMovie]);

      }
      if (this.rightMovie == this.randomMovie.length){

        this.rightMovie = 0;
      }

      return this.bestMovies;

    },
    // movie scroll end

    // api movie search
    searchMovie: function(){

      let myThis = this;

      myThis.movieKeyword.push(myThis.movieInput);

      myThis.indexKeyword = myThis.movieKeyword.length;

      myThis.bestMovies = [];

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



      });


      myThis.movieInput = "";


    },
    // api movie search end

    // logo click
    reloadMovies: function(){

      this.movies = [];
      this.bestMovies = [];
      let newThis = this;
      newThis.randomIndex = Math.floor(Math.random() * (newThis.indexKeyword));
      axios.get(newThis.urlAxios + 'movie', {

        params: {

          api_key: newThis.apiKey,
          query: newThis.movieKeyword[newThis.randomIndex],
          language: newThis.lang

        }

      })
      .then(function(response){

        newThis.randomMovie = response.data.results;

        for(var i = 0; i < 5; i++){

          newThis.bestMovies.push(newThis.randomMovie[i]);

        }



      });

    },
    // logo click end
  },
  // methods end

  // mounted
  mounted: function () {

    let selfThis = this;

    selfThis.randomIndex = Math.floor(Math.random() * (selfThis.indexKeyword));

    axios.get(selfThis.urlAxios + 'movie', {

      params: {

        api_key: selfThis.apiKey,
        query: selfThis.movieKeyword[selfThis.randomIndex],
        language: selfThis.lang

      }

    })
    .then(function(response){

      selfThis.randomMovie = response.data.results;

      for(var i = 0; i < 5; i++){

        selfThis.bestMovies.push(selfThis.randomMovie[i]);

      }



    });




  }
  // mounted end
});
