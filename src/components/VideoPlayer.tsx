import { Composition, Video, useCurrentFrame, interpolate, interpolateColors } from "remotion";
import transcript from "../assets/transcript.json";

const VideoPlayer: React.FC = () => {
    
    const frame = useCurrentFrame();

    const groupCaptionsbySecond = (transcript: any) => {
        const groupedCaptions: any[][] = [];
        transcript.forEach((caption: any) => {
            if (caption.type === "punctuation") return;
            const startTime = Math.floor(caption.start_time);

            if (!groupedCaptions[startTime]) {
                groupedCaptions[startTime] = [];
            }
            groupedCaptions[startTime].push(caption);
        });
        return groupedCaptions;
    };

    const groupedCaptionsArray = groupCaptionsbySecond(transcript);
    // console.log(groupedCaptionsArray)
    const colors = ["yellow", "green", "red"];

    return (
        <div className="w-full flex justify-center items-center">
            <Video src={require("../assets/input.mp4")} />


            {groupedCaptionsArray.map((captionsInSecond, second) => {

                const startFrame = second * 21;
                const endFrame = (second + 1) * 21;
                const opacity = interpolate(
                    frame,
                    [startFrame, startFrame + 10, endFrame - 10, endFrame],
                    [0.5, 1, 1, 0.5],
                    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                );
                
                const color = colors[second % colors.length];

                if (frame >= startFrame && frame < endFrame) {
                    return (
                        <div
                            key={second}
                            className="absolute bottom-60 w-full text-center text-2xl font-bold  text-white"
                            style={{opacity, color}}
                        >

                            <div >
                                {captionsInSecond.map((caption: any) => (
                                    <span key={caption.id}>
                                        {caption.break ? (
                                            <>
                                                {caption.text} <br />
                                            </>
                                        ) : (
                                            caption.text
                                        )}{" "}
                                    </span>
                                ))}
                            </div>


                            <div className="mt-2">
                                {captionsInSecond.map((caption: any) => (
                                    caption.emoji ? (
                                        <span key={caption.id} className="text-xl">
                                            {caption.emoji}
                                        </span>
                                    ) : null
                                ))}
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </div>

    );
};

export const MyComposition: React.FC = () => {
    return (
        <Composition
            id="MyVideo"
            component={VideoPlayer}
            durationInFrames={900}
            fps={21}
            width={430}
            height={932}
        />
    );
};

export default VideoPlayer;
