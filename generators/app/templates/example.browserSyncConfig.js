// make a copy of this file, removing the 'example.' from the beginning of the file name, and add in your local site's name below

module.exports = {
    browsersync: {
        proxy: "mylocal.site",
        port: 3000 // By default this isn't used, browsersync defaults to port 3000. Uncomment the option in the gulpfile to use this.
    }
};