import { Stage, Layer, Text, Circle } from "react-konva";
import useWheelZoom from "./useWheelZoom";
import useFilterGroup from "./useFIlterGroup";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const STEP = 30;
const START = 100;

export default function App() {
  const [stage, handleWheel] = useWheelZoom();
  const { setGroup, filtered, group, uniqueGroups } = useFilterGroup("G1");

  const handlePrompt = (e) => {
    const updatedGroup = prompt("Group name:");
    if (uniqueGroups.includes(updatedGroup)) {
      setGroup(updatedGroup);
    }
  };

  return (
    <Stage
      width={WIDTH}
      height={HEIGHT}
      draggable={true}
      onWheel={handleWheel}
      scale={stage.scale}
      x={stage.x}
      y={stage.y}
    >
      <Layer>
        <Text
          x={0}
          y={STEP * filtered.length + 60}
          text={group}
          fontSize={54}
          fontFamily={"monospace"}
          fill={"red"}
          key={`V-group`}
          onClick={handlePrompt}
        />

        {/* Horizontal Axis Values */}
        {filtered.map((rel, i) => (
          <Text
            x={0}
            y={STEP * (filtered.length - i - 1)}
            text={rel.label}
            fontSize={14}
            fontFamily={"sans"}
            fill={"red"}
            key={`V${rel.label}`}
          />
        ))}

        {/* Vertical Axis Values */}
        {filtered.map((rel, i) => (
          <Text
            x={START * 2 + STEP * i}
            y={START + (filtered.length - 1) * STEP}
            text={rel.label}
            fontSize={14}
            fontFamily={"sans"}
            fill={"blue"}
            key={`H${rel.label}`}
            rotationDeg={90}
          />
        ))}

        {/* Same Position Values */}
        {filtered.map((rel, i) => (
          <Circle
            x={START * 2 + STEP * (filtered.length - (i + 0.25) - 1)}
            y={STEP * (i + 0.25)}
            radius={STEP / 4}
            fill={"red"}
          />
        ))}

        {/* Child Position Values */}
        {filtered.flatMap((rel, i) =>
          rel.incomings.map((incoming) => (
            <Circle
              x={START * 2 + STEP * (i - 0.25)}
              y={
                STEP *
                (filtered.length -
                  filtered.findIndex((r) => r.label === incoming.label) -
                  0.75)
              }
              radius={STEP / 6}
              fill={"lightBlue"}
            />
          ))
        )}

        {/* Grandchild Position Values */}
        {filtered.flatMap((rel, i) =>
          rel.incomings.map((incoming) =>
            filtered[
              filtered.findIndex((r) => r.label === incoming.label)
            ].incomings.map((incomingIncoming) => {
              console.log(rel.label, incomingIncoming.label);
              return (
                <Circle
                  x={START * 2 + STEP * (i - .25)}
                  y={
                    STEP *
                    (filtered.length -
                      (filtered.findIndex(
                        (r) => r.label === incomingIncoming.label
                      ) +
                        0.75))
                  }
                  radius={STEP / 10}
                  fill={"green"}
                />
              );
            })
          )
        )}
      </Layer>
    </Stage>
  );
}
