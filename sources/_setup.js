var Path = require( 'path' );
var System = require( 'systemjs' );

System.traceurOptions = { asyncFunctions : true };

System.baseURL = '/';

System.paths[ 'willikins/*' ] = __dirname + '/*.js';
System.paths[ 'vendors/*' ] = Path.join( Path.resolve( '.' ), 'vendors', '*.js' );
System.paths[ 'app/*' ] = Path.join( Path.resolve( '.' ), 'sources', '*.js' );

GLOBAL.__appdir = Path.join( Path.resolve( '.' ), 'sources' );

GLOBAL.errlog = function ( error ) {

    if ( error instanceof Error ) {
        console.error( error.stack || error.toString( ) );
    } else {
        console.error( error );
    }

};

System.import( 'willikins/_run' ).then( function ( m ) {
    return m.default( );
} ).catch( errlog );
