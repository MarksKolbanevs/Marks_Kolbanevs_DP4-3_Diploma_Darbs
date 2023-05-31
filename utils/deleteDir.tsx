const fs = require('fs');

function deleteDir(folderPath : string){
    fs.rmdir(folderPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error deleting folder:', err);
        } else {
          console.log('Folder deleted successfully');
        }
    });
}


module.exports = { deleteDir };