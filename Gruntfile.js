/**
 * Created by ilya on 03.09.15.
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['src/index.html']
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },

        csslint: {
            build: {
                src: ['src/css/**/*.css']
            }
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'dist/css/style.css': 'src/css/style.css'
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['dist/css/style.css']
                }
            }
        },

        responsive_images: {
            options: {
                engine: 'im'
            },
            logo: {
                options: {
                    sizes: [{
                        name: 'small',
                        width: 80,
                        quality: 70
                    },{
                        name: 'small',
                        width: 160,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'large',
                        width: 116,
                        quality: 70
                    },{
                        name: 'large',
                        width: 232,
                        suffix: "_2x",
                        quality: 30
                    }]
                },
                files: {
                    'dist/images/udacity-logo.jpg': 'src/images/udacity-logo.jpg'
                }
            },
            main: {
                options: {
                    sizes: [{
                        name: 'small',
                        width: 480,
                        quality: 70
                    },{
                        name: 'small',
                        width: 960,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'medium',
                        width: 750,
                        quality: 70
                    },{
                        name: 'medium',
                        width: 1500,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'large',
                        width: 970,
                        quality: 70
                    },{
                        name: 'large',
                        width: 1960,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'xlarge',
                        width: 1170,
                        quality: 70
                    },{
                        name: 'xlarge',
                        width: 2340,
                        suffix: "_2x",
                        quality: 30
                    }]
                },
                files: {
                    'dist/images/wild-nature.jpg': 'src/images/wild-nature.jpg'
                }
            },
            works: {
                options: {
                    sizes: [{
                        name: 'xsmall',
                        width: 294,
                        quality: 70
                    },{
                        name: 'xsmall',
                        width: 588,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'small',
                        width: 320,
                        quality: 70
                    },{
                        name: 'small',
                        width: 640,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'medium',
                        width: 360,
                        quality: 70
                    },{
                        name: 'medium',
                        width: 720,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'large',
                        width: 480,
                        quality: 70
                    },{
                        name: 'large',
                        width: 960,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'xlarge',
                        width: 720,
                        quality: 70
                    },{
                        name: 'xlarge',
                        width: 1440,
                        suffix: "_2x",
                        quality: 30
                    }]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'src/images/works/',
                    dest: 'dist/images/works/'
                }]
            }
        },

        copy: {
            bootstrap: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/',
                src: ['css/*.min.css', 'js/*.min.js', 'fonts/*.*'],
                dest: 'dist/'
            },
            jquery: {
                expand: true,
                cwd: 'node_modules/jquery/dist/',
                src: ['*.min.js'],
                dest: 'dist/js/'
            }
        },

        clean: {
            dist: ['dist'],
            css: ['dist/css/**/*.css', '!dist/css/**/*min.css']
        },

        watch: {
            html: {
                files: ['src/index.html'],
                tasks: ['html']
            },
            css: {
                files: ['src/css/**/*.css'],
                tasks: ['css']
            }
        }
    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask('html', ['htmlhint', 'htmlmin']);
    grunt.registerTask('css', ['csslint', 'cssc', 'cssmin', 'clean:css']);
    grunt.registerTask('images-logo', ['responsive_images:logo']);
    grunt.registerTask('images-main', ['responsive_images:main']);
    grunt.registerTask('images-works', ['responsive_images:works']);
    grunt.registerTask('images', ['responsive_images']);
    grunt.registerTask('default', ['clean:dist', 'html', 'css', 'images', 'copy']);
};