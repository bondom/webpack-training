#Tree shaking 
<pre>dead-code elimination, relies on static structure of ES2015:</pre>

require and module.exports  - dynamic, what is imported and exported can change at runtime.
ES6 import and export - static, imports and exports are determined at compile time
Main benefit:  dead code elimination during bundling


Webpack doesn't perform tree-shaking by itself. It relies on third party tools like UglifyJS to perform actual dead code elimination.


http://exploringjs.com/es6/ch_modules.html#static-module-structure