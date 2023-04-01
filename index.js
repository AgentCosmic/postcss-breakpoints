const defaults = {};

module.exports = (opts = {}) => {
	// set options with defaults
	for (const k in defaults) {
		if (!opts.hasOwnProperty(k)) {
			opts[k] = defaults[k];
		}
	}
	return {
		postcssPlugin: 'postcss-breakpoints',
		AtRule: {
			'generate-breakpoints': (atRule, api) => {
				breakpointPlugin(opts, atRule, api);
			},
		},
	};
};

module.exports.postcss = true;

function breakpointPlugin(opts, atRule) {
	// start generating code
	const params = parseParams(atRule.params);
	for (const [prefix, size] of params) {
		atRule
			.cloneBefore({
				name: 'media',
				params: `(min-width: ${size})`,
			})
			.walkRules((rule) => {
				const selectors = rule.selectors
					.filter((s) => s[0] === '.')
					.map((s) => {
						return `.${prefix}-${s.substr(1)}`;
					});
				rule.replaceWith(rule.clone({ selectors }));
			});
	}
	// extract the original declarations
	atRule.after(atRule.nodes);

	// cleanup
	atRule.remove();
}

function parseParams(params) {
	return params
		.slice(1, -1)
		.split(/;\s*/)
		.map((arg) => arg.split(/:\s*/));
}

