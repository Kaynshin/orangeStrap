/*!
 * BMW Gruntfile
 * @author BMW
 */
'use strict';
/**
 * Grunt module
 */
module.exports = function(grunt){
	/**
	 * Dynamically load npm tasks
	 */
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	var orangeStrap = './';                 //Dossier concernant les assets sources
	var assets = 'assets';                  //Dossier concernant les assets sources
	var project = 'project';                //Dossier concernant les sources du projet
	var vendors = project+'/vendors';       //Dossier concernant les vendors sources

	var target = '../orange/assets';        //Destination des builds
	var cssTarget = target+'/css';          //Dossier des css destination
	var jsTarget = target+'/js';            //Dossier des js destination
	var vendorsTarget = target+'/vendors';  //Dossier des js destination
	var imgTarget = target;                 //Dossier des images destination
	var fontsTaget = target+'/fonts';       //Dossier des fonts destination

	var appConfig = {
		orangeStrap:orangeStrap
		,assets:assets
		,project:project
		,vendors:vendors
		,target:target
		,cssTarget:cssTarget
		,jsTarget:jsTarget
		,vendorsTarget:vendorsTarget
		,imgTarget:imgTarget
		,fontsTaget:fontsTaget
	};
	/**
	 * orangeStrap Grunt config
	 */
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		path:appConfig,
		/**
		 * Runs tasks against changed watched files
		 * https://github.com/gruntjs/grunt-contrib-watch
		 * Watching development files and run concat/compile tasks
		 */
		watch:{
			options:{
				atBegin:false,
				livereload:false
			},
			sass:{
				files:['<%= path.orangeStrap %>/**/*.scss'],
				tasks:['mincss']
			},
			js:{
				files:['<%= path.project %>/js/*.js','<%= path.project %>/vendors/**/*.js'],
				tasks:['minjs']
			},
			img:{
				files:['<%= path.assets %>/**/*.{png,gif,jpg,svg}'],
				tasks:['images']
			}
		},
		/* COMPASS */
		compass:{
			options:{
				sassDir:'<%= path.project %>/scss',
				cssDir:'<%= path.cssTarget %>',
				relativeAssets:false,
				debugInfo:false,
				force:true
			},
			compile:{
				options:{
					assetCacheBuster:false,
					outputStyle:'expanded'
				}
			},
			compress:{
				options:{
					assetCacheBuster:true,
					outputStyle:'compressed'
				}
			}
		},
		/* CSSMIN */
		cssmin: {
			options:{
				report:'max'
			},
			target: {
				files: [{
					expand: true,
					cwd: '<%= path.cssTarget %>',
					src: ['*.css'],
					dest: '<%= path.cssTarget %>',
					ext: '.css'
				}]
			}
		},
		/* UGLIFY */
		uglify:{
			options:{
				mangle:false
			},
			compile:{
				options:{
					beautify:true
				},
				files:[{
					expand:true,
					cwd:'<%= path.project %>/js',
					src:'**/*.js',
					dest:'<%= path.jsTarget %>'
				},
					{
						expand:true,
						cwd:'<%= path.vendors %>',
						src:'**/*.js',
						dest:'<%= path.vendorsTarget %>'
					}]
			},
			compress:{
				options:{
					beautify:false
				},
				files:[{
					expand:true,
					cwd:'<%= path.project %>/js',
					src:'**/*.js',
					dest:'<%= path.jsTarget %>'
				},
					{
						expand:true,
						cwd:'<%= path.vendors %>',
						src:'**/*.js',
						dest:'<%= path.vendorsTarget %>'
					}]
			}
		},
		/* IMAGEMIN */
		imagemin:{
			compile:{
				files:[{
					expand:true,
					cwd:'<%= path.assets %>',
					src:['**/*.{png,jpg,jpeg,gif}'],
					dest:'<%= path.imgTarget %>'
				}]
			}
		},
		/* SVGMIN */
		svgmin:{
			compile:{
				files:[{
					expand:true,
					cwd:'<%= path.assets %>',
					src:['**/*.{svg}'],
					dest:'<%= path.imgTarget %>'
				}]
			}
		},
		/* CLEAN */
		clean: {
			options:{
				force:true
			},
			allTarget: {
				src: [
					'<%= path.target %>'
				]
			},
			cssTarget: {
				src: [
					'<%= path.cssTarget %>'
					,'<%= path.vendorsTarget %>/css'
				]
			},
			jsTarget: {
				src: [
					'<%= path.jsTarget %>'
					,'<%= path.vendorsTarget %>/js'
				]
			}
		},
		concurrent:{
			imgCompile:[
				'imagemin',
				'svgmin'
			],
			compile:[
				'compass:compile',
				'uglify:compile'
			],
			compress:[
				'compass:compress',
				'uglify:compress'
			]
		}
	});

	//image optimizer
	grunt.registerTask('images',['concurrent:imgCompile']);

	//dev tasks (on watch)
	grunt.registerTask('mincss',['clean:cssTarget','compass:compile']);
	grunt.registerTask('minjs',['clean:jsTarget','uglify:compile']);

	//assets compilation (css+js+filerev)
	grunt.registerTask('compile',['clean:allTarget','concurrent:compile','concurrent:imgCompile']);
	grunt.registerTask('compress',['clean:allTarget','concurrent:compress','cssmin','concurrent:imgCompile']);
};
