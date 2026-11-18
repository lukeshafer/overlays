import { SNAIL_ASSETS } from "../snail-data";

export interface SnailPreviewProps {
	body: string;
	eyes: string;
	mouth: string;
	faceX: string;
	faceY: string;
	scale?: number;
	bodyColors: {
		hue: string;
		brightness: string;
		saturation: string;
	};
	shellColors: {
		hue: string;
		brightness: string;
		saturation: string;
	};
}

export default function SnailPreview(props: SnailPreviewProps) {
	return (
		<snail-preview>
			<div class="root">
				<figure
					style={{
						"--scale": props.scale ?? 1,
					}}
				>
					<div
						class="body-wrapper"
						style={{
							"--hue": props.bodyColors.hue,
							"--saturation": props.bodyColors.saturation,
							"--brightness": props.bodyColors.brightness,
						}}
					>
						<img src={`${SNAIL_ASSETS.BODY}/${props.body}`} alt="" class="body" />
						<div
							class="face-wrapper"
							style={{
								"--x": props.faceX,
								"--y": props.faceY,
							}}
						>
							<img src={`${SNAIL_ASSETS.EYES}/${props.eyes}`} alt="" class="eyes"/>
							<img src={`${SNAIL_ASSETS.MOUTH}/${props.mouth}`} alt="" class="mouth" />
						</div>
					</div>
					<img
						src={SNAIL_ASSETS.SHELL}
						alt=""
						class="shell"
						style={{
							"--hue": props.shellColors.hue,
							"--saturation": props.shellColors.saturation,
							"--brightness": props.shellColors.brightness,
						}}
					/>
				</figure>
			</div>
		</snail-preview>
	);
}
