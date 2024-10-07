import { Composition, Video, useCurrentFrame, interpolate, interpolateColors } from "remotion";
import transcript from "../assets/transcript.json";

const VideoPlayer: React.FC = () => {

    const frame = useCurrentFrame(); // render app on every frame

    // To group the captions that fall in a single second time frame in an array
    const groupCaptionsbySecond = (transcript: any) => {
        const groupedCaptions: any[][] = []; // created a array of arrays for every word that falls in single time frame
        transcript.forEach((caption: any) => {
            if (caption.type === "punctuation") return;  // To skip the punctuations 
            const startTime = Math.floor(caption.start_time);

            // if the captions is not present in array then push it in grouped captions (groupedCaptions)
            if (!groupedCaptions[startTime]) {
                groupedCaptions[startTime] = [];
            }
            groupedCaptions[startTime].push(caption);
        });
        return groupedCaptions;
    };

    const groupedCaptionsArray = groupCaptionsbySecond(transcript);
    // console.log(groupedCaptionsArray)
    const colorScheme = ["yellow", "green", "red"]; //array of color scheme to change color of subtitles

    return (
        <div className="w-full flex justify-center items-center">
            {/* video component to display input video*/}
            <Video src={require("../assets/input.mp4")} />  


            {/* Subtitle component */}
            {groupedCaptionsArray.map((captionsInSecond, second) => {

                const startFrame = second * 21;  {/* to calculate frame per second. we are using 21 frames per second */ }
                const endFrame = (second + 1) * 21;  {/* we are using one second time frame to display subtitles(i.e. second + 1 for one second time frame)*/ }

                {/* opacity of subtitles for fade in and fade out */}
                const opacity = interpolate(
                    frame,
                    [startFrame, startFrame + 10, endFrame - 10, endFrame],
                    [0.5, 1, 1, 0.5],
                    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                );  

                {/* color of subtitles  (changes every second based on each second) */}
                const color = colorScheme[second % colorScheme.length];


                {/*  if condition so that subtitles caption should be displayed during that particular section of the video. */ }
                if (frame >= startFrame && frame < endFrame) {
                    return (
                        <div
                            key={second}
                            className="absolute bottom-[158px] w-full text-center text-2xl font-bold  text-white"
                            style={{ opacity, color }} 
                        >
                            <div className="text-[28px] w-max mx-auto font-extrabold bg-[#0000005c]">
                                {captionsInSecond.map((caption: any) => (
                                    <span key={caption.id}>
                                        {/* check to conditionally display break and show subtitle in two lines  */}
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
                                {/*  if condition to display emoji */ }
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
