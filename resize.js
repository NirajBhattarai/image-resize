const sharp = require("sharp");
const fs = require("fs");

for (let x = 1; x <= 1000; x++) {
  // input stream
  let inStream = fs.createReadStream(`./gallery/${x}.png`);

  // output stream
  let outStream = fs.createWriteStream(`./output/${x}.jpg`, { flags: "w" });

  // on error of output file being saved
  outStream.on("error", function () {
    console.log("Error");
  });

  // on success of output file being saved
  outStream.on("close", function () {
    console.log("Successfully saved file");
  });

  // input stream transformer
  // "info" event will be emitted on resize
  let transform = sharp()
    .resize({ width: 100, height: 100 })
    .on("info", function (fileInfo) {
      console.log("Resizing done, file not saved");
    });

  inStream.pipe(transform).pipe(outStream);
}
