/**
 * Created with JetBrains WebStorm.
 * User: alex.toledo
 * Date: 11/16/12
 * Time: 8:44 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(grunt) {
    grunt.registerMultiTask("modified", "Update the modified date of the document", function(){
        var date = new Date(),
            dateCopy = (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear(),
            path = grunt.file.expandFiles(this.data)[0],
            source = grunt.file.read(path),
            output = source,
            reg = /Last Updated:\s(.*)</g,
            matches;

        while ((matches = reg.exec(source)) !== null) {
            output = output.replace(matches[1], dateCopy);
        }
        grunt.file.write(path, output);
    });
}
