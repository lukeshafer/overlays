import "./style.css";
import SnailPreviewElement from "./elements/snail-preview";
import { bodies, eyes, mouths } from "./snail-data.js";

customElements.define("snail-preview", SnailPreviewElement);
const template = document.querySelector<HTMLTemplateElement>("#radio-template")!;

function main() {
	const form = document.querySelector<HTMLFormElement>("#snail-preview-form")!;
	const bodyFieldset = form.querySelector<HTMLFieldSetElement>("fieldset.bodies")!;
	bodies.forEach((b, i) => {
		const clone = createRadioClone({ name: "body", value: b.id, label: b.name });
		if (i === 0) clone.querySelector('input')!.checked = true
		bodyFieldset.appendChild(clone);
	});

	const eyesFieldset = form.querySelector<HTMLFieldSetElement>("fieldset.eyes")!;
	eyes.forEach((e, i) => {
		const clone = createRadioClone({ name: "eyes", value: e.id, label: e.name });
		if (i === 0) clone.querySelector('input')!.checked = true
		eyesFieldset.appendChild(clone);
	});

	const mouthFieldset = form.querySelector<HTMLFieldSetElement>("fieldset.mouths")!;
	mouths.forEach((m, i) => {
		const clone = createRadioClone({ name: "mouth", value: m.id, label: m.name });
		if (i === 0) clone.querySelector('input')!.checked = true
		mouthFieldset.appendChild(clone);
	});

	const snailPreview = document.querySelector<SnailPreviewElement>("snail-preview")!;
	snailPreview.refreshFromForm()
}

main();

function createRadioClone(opts: { name: string; value: string; label: string }) {
	const clone = document.importNode(template.content, true);

	const input = clone.querySelector("input")!;
	input.name = opts.name;
	input.value = opts.value;
	input.id = `${opts.name}-${opts.value}`;

	const label = clone.querySelector("label")!;
	label.textContent = opts.label;
	label.setAttribute("for", input.id);

	return clone;
}
