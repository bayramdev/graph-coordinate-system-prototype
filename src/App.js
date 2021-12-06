import { Stage, Layer, Rect, Circle } from "react-konva";
import useWheelZoom from "./useWheelZoom";

export default function App() {
  const [stage, handleWheel] = useWheelZoom();

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={true}
      onWheel={handleWheel}
      scale={stage.scale}
      x={stage.x}
      y={stage.y}
    >
      <Layer>
        <Rect width={50} height={50} fill="red" />
        <Circle x={200} y={200} stroke="black" radius={50} />
      </Layer>
    </Stage>
  );
}
