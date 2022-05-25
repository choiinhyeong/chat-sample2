module.exports = {
	apps: [{
		name: 'multi-process-chat',
		script: './app.js',
		instances: 0,
		exec_mode: 'cluster'
	}]
}
