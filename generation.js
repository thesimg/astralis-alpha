function generateBlocks(genScene) {
  switch (genScene) {
    case "home":
      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "home") {
          //print(blockData[i]);
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-25, 0, 50, 400));
      blocks.push(new platform(-300, 0, 200, 20));
      blocks.push(new portal(-300, -100, 100, 100, "foddianLite"));
      blocks.push(new platform(-300, 150, 200, 20));
      blocks.push(new portal(-50, -250, 100, 100, "foddian"));
      blocks.push(new platform(-300, 300, 200, 20));
      blocks.push(new portal(200, -100, 100, 100, "foddianExtreme"));
      blocks.push(new platform(100, 0, 200, 20));

      deathY = 4500;
      break;
    case "foddian":
      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "foddian") {
          //print(blockData[i]);
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
    case "foddianLite":
      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "foddianLite") {
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
    case "foddianExtreme":
      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "foddianExtreme") {
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
  }
}
