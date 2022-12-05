<template>
  <v-row class="mx-auto" style="width:100%;">
      <v-col cols="12"> 
  
          <div class="mars"></div>
          <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404" />
          <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor" />
          <p class="title"> oops !!</p>
          <p class="subtitle">
            warnning  <br /> or this page not exist
          </p>
          <div align="center">
              <v-btn class="btn-back" to="/"> Go to home page  </v-btn>
          </div>
          <img src="https://assets.codepen.io/1538474/astronaut.svg" class="astronaut" />
          <img src="https://assets.codepen.io/1538474/spaceship.svg" class="spaceship" />
          
      </v-col>
  </v-row>
  </template>
  
  <script>
  
  export default {
  
      name: 'ErrorPage'
  
      }
  </script>
  <style>
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,600,700');
  $nunito-font: 'Nunito', sans-serif;
  
  // mixins
  @mixin breakpoint($point) {
      @if $point==mobile {
          @media (max-width: 480px) and (min-width: 320px) {
              @content ;
          }
      }
  }
  
  /* // keyrames
  @keyframes floating {
      from { transform: translateY(0px); }
      65%  { transform: translateY(15px); }
      to   { transform: translateY(-0px); }
  } */
  
  /* html {
    height: 100%;
  }
  
  body{
    background-image: url('https://assets.codepen.io/1538474/star.svg'),linear-gradient(to bottom, #05007A, #4D007D);
    height: 100%;
    margin: 0;
    background-attachment: fixed;
    overflow: hidden;
  } */
  
  .mars{
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    height: 27vmin;
    background: url('https://assets.codepen.io/1538474/mars.svg') no-repeat bottom center;
    background-size: cover;
  }
  
  .logo-404{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 16vmin;
    width: 30vmin;
  
    @include breakpoint(mobile){
      top: 45vmin;
    }
  }
  
  .meteor{
    position: absolute;
    right: 2vmin;
    top: 16vmin;
  }
  
  .title{
    color: #4D007D;
    font-family: $nunito-font;
    font-weight: 600;
    text-align: center;
    font-size: 5vmin;
    margin-top: 31vmin;
    text-shadow: 2px 2px #fff;
  
    @include breakpoint(mobile){
      margin-top: 65vmin;
    }
  }
  
  .subtitle{
    color: #fff;
    font-family: $nunito-font;
    font-weight: 400;
    text-align: center;
    font-size: 3.5vmin;
    margin-top: -1vmin;
    margin-bottom: 9vmin;
    /* text-shadow: 0 1px 3px 0 rgb(94 86 105 / 20%), 0 3px 1px -2px rgb(94 86 105 / 12%), 0 2px 2px 0 rgb(94 86 105 / 14%); */
    text-shadow: 2px 2px #4D007D;
  }
  
  .btn-back{
    border: 1px solid white;
    color: white;
    height: 5vmin;
    padding: 12px;
    font-family: $nunito-font;
    text-decoration: none;
    border-radius: 5px;
  
    &:hover{
      background: white;
      color: #4D007D;
    }
  
    @include breakpoint(mobile){
      font-size: 3.5vmin;
    }
  }
  
  .astronaut{
    position: absolute;
    top: 18vmin;
    left: 10vmin;
    height: 30vmin;
    animation: floating 3s infinite ease-in-out;
  
    @include breakpoint(mobile){
      top: 2vmin;
    }
  }
  
  .spaceship{
    position: absolute;
    bottom: 15vmin;
    right: 24vmin;
  
    @include breakpoint(mobile){
      width: 45vmin;
      bottom: 18vmin;
    }
  }
  </style>