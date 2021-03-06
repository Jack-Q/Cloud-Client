"use strict";
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        // this allows grunt to delete files outside the Gruntfile directory.
        // required to clean the ../public directory.
        force: true
      },
      dist: {
        src: ['dist/**/*', '!dist/.gitignore']
      }
    },

    copy: {
      distHtml: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.html'],
          dest: 'dist/'
        }]
      }
    },

    sass: {
      dist: {
        files: [{
          'dist/css/styles.css': 'src/scss/styles.scss'
        }, {
          expand: true,
          cwd: 'src/components',
          src: ['**/*.scss'],
          dest: 'dist/components',
          rename: function (dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);

            filename = filename.substring(0, filename.lastIndexOf('.'));

            return dest + '/' + folder + filename + '.css';
          }
        }],
        options: {
          sourcemap: 'none',
          style: 'expanded',
          require: 'susy',
        }
      }
    },

    shell: {
      // congratulate the developer on a job well done.
      affirmation: {
        command: 'say -v Alex "Nice work, developer.  You deserve a cold beer."'
      },
      // converts coverage for js lines under to test to ts lines in the source
      remapIstanbul: {
        command: 'node_modules/.bin/remap-istanbul -i coverage/report-json/coverage-final.json -o coverage/display-report -t html'
      },
      // start up a browser to view the coverage report
      coverage: {
        command: 'node_modules/.bin/http-server -c-1 -o -p 9875 ./coverage/display-report'
      }
    },

    // use this to compile typescript - it uses the version of typescript compiler defined within this project, rather than any global typescript compiler
    ts: {
      default: {
        tsconfig: './tsconfig.json',
        src: ["src/**/*.ts",
          "!node_modules/**"
        ],
        dest: ['dist']
      }
    },

    watch: {
      options: {
        // spawn must be false for bsReload tasks to work correctly
        spawn: false
      },
      css: {
        files: ['src/**/*.scss'],
        tasks: ['sass:dist', 'postcss:dist', 'bsReload:css']
      },
      typescript: {
        files: ['src/**/*.ts'],
        tasks: ['ts', 'bsReload:all']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:distHtml', 'bsReload:all']
      },
    },

    // make sure to call the 'browserSync:xxxx' task rather than just 'browserSync' so it doesn't try to serve multiple things
    browserSync: {
      dist: {
        options: {
          server: './',
          // background must be true in order for grunt watch task to run
          background: true
        }
      }
    },

    bsReload: {
      css: {
        reload: "dist/css/styles.css"
      },
      all: {
        reload: true
      }
    },

    postcss: {
      options: {
        // no sourcemaps
        map: false,
        processors: [
          // add vendor prefixes
          require('autoprefixer')({
            browsers: 'last 2 versions'
          })
        ]
      },
      dist: {
        src: 'dist/**/*.css'
      }
    },

    // karma test runner.  runs the tests according to the configFile settings.
    // functional tests require a running license server backend.
    karma: {
      unit: {
        configFile: 'dev-tools/test-config/karma.conf.js'
      }
    }
  });

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "browserSync" task.
  grunt.loadNpmTasks('grunt-browser-sync');
  // Load the plugin that provides the "postcss" task.
  grunt.loadNpmTasks('grunt-postcss')
    // Load the plugin that provides the "shell" task
  grunt.loadNpmTasks('grunt-shell');
  // Load the plugin that provides typescript compilation
  grunt.loadNpmTasks('grunt-ts');
  // Load the plugin to run karma (test runner)
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['build', 'bs-dist']);
  grunt.registerTask('build', ['clean:dist', 'copy:distHtml', 'ts', 'sass:dist', 'postcss:dist']);
  grunt.registerTask('bs-dist', ['browserSync:dist', 'watch']);

  grunt.registerTask('test', ['build', 'karma:unit']);
  grunt.registerTask('test-coverage', ['test', 'shell:remapIstanbul', 'shell:coverage']);

};