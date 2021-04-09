var app = new Vue ({

  el: '#root',

  data:{
    hover: false,

  },

  methods:{
    mouseOver: function() {
      return this.hover = true;
    },
    eventTest: function(){

      alert("ciao")
    }
  }



});
