import adapter from '@sveltejs/adapter-auto';

export default {
	kit: {
		adapter: adapter({
			edge: false,
			split: false
		})
	}
};