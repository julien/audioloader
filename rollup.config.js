import buble from 'rollup-plugin-buble';

export default {
	entry: 'index.js',
	dest: 'audioloader.js',
	format: 'iife',
	sourceMap: 'inline',
	moduleName: 'AudioLoader',
	plugins: [ buble() ]
};
