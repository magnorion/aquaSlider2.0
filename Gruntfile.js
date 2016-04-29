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
      options:{
        livereload:460
      },
      js_css:{
        files: ["sass/*.scss","js/aqua-script.js"],
        tasks: ['sass','uglify'],
        reload:true
      }
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
    connect:{
      server:{
        options:{
          port:3000,
          hostname:"*"
        }
      }
    },
    copy:{
      project:{
        expand: true,
        cwd:'.',
        src:['css/**','imgs/**','js/**','index.html'],
        dest:'dist'
      }
    },
    clean:{
      dist:{
        src:'dist'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask("default",['connect','watch']);
  grunt.registerTask("gerarApp",["clean","copy"]);

};
