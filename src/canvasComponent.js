import React, { useRef, useState, useEffect } from "react";

function CanvasComponent() {
  const canvasRef = useRef(null);
  const [text, setText] = useState("Hello World");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [textSize, setTextSize] = useState(20);
  const [showText, setShowText] = useState(true);
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    handleCanvas();
  }, [text, image, textPosition, textSize, imageSize, showText]);

  const handleCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, 50, 50, imageSize.width, imageSize.height);

        if (showText) {
          ctx.font = `${textSize}px Arial`;
          ctx.fillStyle = "black";
          ctx.fillText(text, textPosition.x, textPosition.y);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
        }
      };
    } else {
      if (showText) {
        ctx.font = `${textSize}px Arial`;
        ctx.fillStyle = "black";
        ctx.fillText(text, textPosition.x, textPosition.y);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTextToggle = () => {
    setShowText(!showText);
  };

  const moveText = (direction) => {
    setTextPosition((prev) => {
      switch (direction) {
        case "up":
          return { ...prev, y: prev.y - 10 };
        case "down":
          return { ...prev, y: prev.y + 10 };
        case "left":
          return { ...prev, x: prev.x - 10 };
        case "right":
          return { ...prev, x: prev.x + 10 };
        default:
          return prev;
      }
    });
  };

  const handleResize = (direction) => {
    setImageSize((prev) => {
      switch (direction) {
        case "increase":
          return { width: prev.width + 10, height: prev.height + 10 };
        case "decrease":
          return { width: prev.width - 10, height: prev.height - 10 };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="container">
      <div
        className="canvas-wrapper"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "800px",
          height: "600px",
        }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{
            border: "1px solid black",
            position: "relative",
            display: "flex",
            zIndex: 10,
            //   marginTop: "200px",
            justifyContent: "center",
            alignItems: "end",
          }}
        ></canvas>
        <div className="controls" style={{ margin: "20px 0" }}>
          <input type="file" onChange={handleImageUpload} />
          <button onClick={() => handleTextToggle()}>Add/Remove Text</button>
          <br />
          <button onClick={() => moveText("up")}>Move Text Up</button>
          <button onClick={() => moveText("down")}>Move Text Down</button>
          <button onClick={() => moveText("left")}>Move Text Left</button>
          <button onClick={() => moveText("right")}>Move Text Right</button>
          <br />
          <button onClick={() => handleResize("increase")}>
            Increase Image Size
          </button>
          <button onClick={() => handleResize("decrease")}>
            Decrease Image Size
          </button>
          <br />
          <input
            type="range"
            min="10"
            max="100"
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
          />
          <label>Text Size: {textSize}px</label>
        </div>
      </div>
    </div>
  );
}

export default CanvasComponent;
