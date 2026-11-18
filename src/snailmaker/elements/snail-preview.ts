import { bodies, eyes, mouths, SNAIL_ASSETS } from "../snail-data";

export default class SnailPreviewElement extends HTMLElement {
	static readonly observedAttributes = [
		"eyes",
		"body",
		"mouth",
		"body-hue",
		"body-brightness",
		"body-saturation",
		"shell-hue",
		"shell-brightness",
		"shell-saturation",
	] as const;

	form: HTMLFormElement | null = null;

	constructor() {
		super();
	}

	connectedCallback() {
		this.querySelector("img.shell")?.setAttribute("src", SNAIL_ASSETS.SHELL);

		const formId = this.getAttribute("for")!;
		this.form = document.querySelector<HTMLFormElement>(`#${formId}`)!;

		const preview: SnailPreviewElement = this;
		this.form.addEventListener("input", () => preview.refreshFromForm());
	}

	refreshFromForm() {
		if (!this.form) return;
		const formData = new FormData(this.form);

		for (let attr of SnailPreviewElement.observedAttributes) {
			const value = formData.get(attr);
			if (value && typeof value === "string" && this.getAttribute(attr) !== value) {
				console.log("setting", attr, value);
				this.setAttribute(attr, value);
			}
		}
	}

	attributeChangedCallback(name: string, oldValue: string | null, value: string | null) {
		switch (name) {
			case "for": {
				if (oldValue) {
					const oldForm = document.getElementById(oldValue);
					if (oldForm instanceof HTMLFormElement) {
					}
				}
				if (value) {
					const form = document.getElementById(value);
					if (form instanceof HTMLFormElement) {
						form.addEventListener("change", () => { });
					}
				}
			}

			case "body": {
				const body = bodies.find((b) => b.id === value);
				const img = this.querySelector<HTMLImageElement>(`img.body`);
				if (body && img) {
					img.src = `${SNAIL_ASSETS.BODY}/${body.src}`;
					img.alt = body.alt;
					this.style.setProperty("--face-x", body.faceX);
					this.style.setProperty("--face-y", body.faceY);
					this.style.setProperty("--scale", String(body.scale ?? 1));
				}
				break;
			}
			case "eyes": {
				const eye = eyes.find((e) => e.id === value);
				const img = this.querySelector<HTMLImageElement>(`img.eyes`);
				if (eye && img) {
					img.src = `${SNAIL_ASSETS.EYES}/${eye.src}`;
					img.alt = eye.alt;
				}
				break;
			}
			case "mouth": {
				const mouth = mouths.find((m) => m.id === value);
				const img = this.querySelector<HTMLImageElement>(`img.mouth`);
				if (mouth && img) {
					img.src = `${SNAIL_ASSETS.MOUTH}/${mouth.src}`;
					img.alt = mouth.alt;
				}
				break;
			}

			case "body-hue":
			case "shell-hue":
				this.style.setProperty(`--${name}`, `${value}deg`);
				break;
			case "body-brightness":
			case "body-saturation":
			case "shell-brightness":
			case "shell-saturation":
				this.style.setProperty(`--${name}`, value);
				break;
		}
	}
}
