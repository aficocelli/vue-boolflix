var app = new Vue ({

  el: '#root',

  // data
  data:{
    movies: [],
    series:[],
    randomMovie:[],
    movieInput: "",
    indexOf: null,
    flags:['it', 'en', 'jp'],
    apiKey: '5c71d6d9a1c9e5778b11fdc5540b3ed2',
    urlAxios: 'https://api.themoviedb.org/3/search/',
    lang: 'it-IT',
    startValue: true,
    userValue: false,
    sliceIndex: 5,
    sliceIndexMin: 0,
    movieKeyword:['titanic', 'fight', 'dragon', 'sleepers', 'trainspotting', 'ritorno', 'blow'],
    indexKeyword: 7,
    randomIndex: 2,

  },
  // data end

  // methods
  methods: {
    // welcome page
    startPage: function(sound){

      let audio = new Audio(sound);

      audio.play();

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

      console.log(i);
      this.indexOf = i;

    },
    resetOverlay:function(){

      this.indexOf = null;
    },

    overlayMost: function(j) {

      this.indexOf = j;

    },

    resetOverlayMost:function(){
      this.indexOf = null;
    },

    // overlay movie card end

    // movies scroll
    rightScroll: function(){

      this.sliceIndex += 1;

      this.sliceIndexMin += 1;

      if(this.sliceIndex == this.randomMovie.length){

        this.sliceIndex = 5;
        this.sliceIndexMin = 0;
      }

    },
    leftScroll: function(){
      this.sliceIndex -= 1;
      this.sliceIndexMin -= 1;

      if(this.sliceIndex == 4){

        this.sliceIndex = this.randomMovie.length;
        this.sliceIndexMin = this.randomMovie.length - 5;

      }

    },
    // movie scroll end

    // api movie search
    searchMovie: function(){

      let myThis = this;

      this.randomMovie = [];

      if(myThis.movieInput != ""){

        myThis.movieKeyword.push(myThis.movieInput);

      };

      myThis.indexKeyword = myThis.movieKeyword.length;



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
      this.sliceIndex = 5;
      this.sliceIndexMin = 0;
      let newThis = this;
      newThis.randomIndex = Math.floor(Math.random() * (newThis.indexKeyword));
      axios.get(newThis.urlAxios + 'multi', {

        params: {

          api_key: newThis.apiKey,
          query: newThis.movieKeyword[newThis.randomIndex],
          language: newThis.lang

        }

      })
      .then(function(response){

        newThis.randomMovie = response.data.results;



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

      // for(var i = 0; i < 5; i++){
      //
      //   selfThis.bestMovies.push(selfThis.randomMovie[i]);
      //
      // }



    });




  }
  // mounted end
});
