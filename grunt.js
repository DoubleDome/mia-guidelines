module.exports = function (grunt) {

    var data = require("./package.json");
    // Project configuration.
    grunt.initConfig({
        data:"<json:package.json>",
        /*
        File Operation Tasks
         */
        watch:{
            lint:{
                files:data.paths.source.js,
                tasks:"lint"
            },
            less:{
                files:data.paths.source.less,
                tasks:"less"
            }
        },
        copy:{
            release:{
                files:{
                    "<%= data.paths.dir.release %>":"<%= data.paths.dir.build %>/**"
                }
            },
            tag:{
                files:{
                    "<%= data.paths.dir.tag %>":"<%= data.paths.dir.release %>/**"
                }
            }
        },
        clean:{
            release:data.paths.excludes,
            prepareRelease:"<%= data.paths.dir.release %>",
            prepareTag:"<%= data.paths.dir.tag %>"
        },
        compress:{
            tag:{
                files:{
                    "<%= data.paths.output.tag %>":"<%= data.paths.dir.release %>/**"
                }
            }
        },
        /*
         CSS Tasks
         */
        less:{
            all:{
                src:data.paths.source.project,
                dest:data.paths.output.project,
                options:{
                    //compress:true,
                    //yuicompress:true
                }
            }
        },
        csslint:{
            src:data.paths.source.css,
            rules:{
                //"duplicate-properties":true,
                "ids":false
                //"qualified-headings":false,
                //"empty-rules":true
            },
            valid:"css/valid.css",
            empty:"css/empty.css",
            all:"css/*.css"
        },
        recess:{
            dist:{
                src:data.paths.source.project,
                dest:data.paths.output.project,
                options:{
                    compress:false, // Compress your compiled code using LESS
                    noIDs:false, // Doesn't complain about using IDs in your stylesheets
                    prefixWhitespace:true, // Adds whitespace prefix to line up vender prefixed properties
                    compile:true                    // Compiles CSS or LESS. Fixes white space and sort order.
                    /*
                     noJSPrefix:true,                // Doesn't complain about styling .js- prefixed classnames
                     noOverqualifying:true,          // Doesn't complain about overqualified selectors (ie:div#foo.bar)
                     noUnderscores:true,             // Doesn't complain about using underscores in your class names
                     noUniversalSelectors:true,      // Doesn't complain about using the universal * selector

                     strictPropertyOrder:true,       // Complains if not strict property order
                     stripColors:false,              // Strip colors from the Terminal output
                     zeroUnits:true,                 // Doesn't complain if you add units to values of 0
                     */
                }
            }
        },
        /*
        JS Tasks
         */
        // lint and jshint objects work in conjunction in the 'lint' task
        lint:{
            all:data.paths.source.js
        },
        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                undef:true,
                boss:true,
                eqnull:true,
                node:true,
                es5:true
            },
            globals:{
                "console":true,
                "_":true,
                "jQuery":true,
                "$":true
            }
        }
    });
    //grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-recess");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-less");
    //grunt.loadNpmTasks("grunt-css");
    // Default task.
    grunt.registerTask("default", "lint release");

    grunt.registerTask("build", "lint less");
    grunt.registerTask("release", "clean:prepareRelease copy:release clean:release");
    grunt.registerTask("tag", "clean:prepareTag compress:tag");
};

