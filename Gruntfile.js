'use strict';

module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['package.json', 'gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ['public/views/**'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: ['public/css/**'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: ['package.json', 'gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**'],
        options: {
          jshintrc: true
        }
      },
      client: {
        src: ['public/js/**'],
        options: {
          jshintrc: true
        }
      },
      server: {
        src: ['server.js', 'app/**/*.js'],
        options: {
          jshintrc: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['public/**'],
          ext: 'js',
          nodeArgs: ['--debug'],
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'server.js',
        timeout: 5000
      },
      src: ['app/spec/**/*.js']
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');

  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['jshint:all', 'concurrent']);
  grunt.registerTask('test', ['env:test', 'mochaTest']);
};
