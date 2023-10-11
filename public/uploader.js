 
const client = new Appwrite.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject("6524df45b1667210dcd2");

const storage = new Appwrite.Storage(client);

function handleFiles(files) {
    console.log("Handle files called", files);
    const file = files[0];
    if (file) {
        console.log("File selected:", file);
        const promise = storage.createFile(
            file,
            '6526322b9624019f9669',
            1234
        );
        
        promise.then(function (response) {
            console.log("File upload success:", response);
        }, function (error) {
            console.error("File upload error:", error);
        });
    } else {
        console.error('No file selected');
    }
}
