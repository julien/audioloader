
class AudioLoader {
	constructor(url, opts = {}) {
		this.url = url;

		this.context = new AudioContext();

		this.analyser = this.context.createAnalyser();
		this.analyser.fftSize = opts.fftSize ? opts.fftSize : 1024;
		this.analyser.smoothingTimeContext = opts.smoothingTimeContext ?
			opts.smoothingTimeContext : 0.8;
		this.analyser.connect(this.context.destination);

		this.source = this.context.createBufferSource();
		this.source.connect(this.analyser);

		this.data = new Uint8Array(this.analyser.frequencyBinCount);
	}

	load(url = '') {
		return new Promise((resolve, reject) => {
			if (url && this.url !== url) {
				this.url = url;
			}

			if (!this.url) {
				reject('not url specified');
			}

			const req = new XMLHttpRequest();
			req.onerror = e => reject(e);
			req.onload = () => {
				this.context.decodeAudioData(req.response, buffer => {
					this.source.buffer = buffer;

					resolve(this.source);
				});
			};
			req.responseType = 'arraybuffer';
			req.open('GET', this.url, true);
			req.send();
		});
	}
}

export function load(url, opts = {}) {
	const l = new AudioLoader(url, opts);
	return l.load();
}
