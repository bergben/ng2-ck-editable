export default {
  entry: 'dist/ng2-ck-editable.js',
  dest: 'dist/bundles/ng2-ck-editable.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng2-ck-editable',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/platform-server': 'ng.platform.server',
    'rxjs': 'Rx'
  }
}