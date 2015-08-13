module.exports = function(grunt) {
  grunt.initConfig({
    uglify:{
      my_target:{
        files:{
          "js/aqua-script.min.js":"js/aqua-script.js"
        }
      }
    },
    watch: {
      files: ["sass/*.scss","js/aqua-script.js"],
      tasks: ['sass','uglify']
    },
    sass:{
      options:{
        style:"compressed"
      },
      dev:{
        files:{
          "css/aqua-style.css" : "sass/aqua-style.scss"
        }
      }
    },
    browserSync: {
      default_options: {
        bsFiles: {
          src:[
            "css/*.css",
            "js/*.js",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask("default",["browserSync","watch"]);

};