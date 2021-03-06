/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Command } from 'commander'
import { execute } from './tasks'
import { DeployCommandOptions } from './types'
import { success, fail } from '@essex/tasklogger'

export default function deploy(program: Command): void {
	program
		.command('deploy')
		.description('deploys standard essex projects')
		.option('-v, --verbose', 'verbose output')
		.option('--storageAccount <storageAccount>', 'Azure Storage Account Id')
		.option(
			'--storageAccountKey <storageAccountKey>',
			'Azure Storage Account Key',
		)
		.option(
			'--type <type>',
			'deployment type: (e.g. azure-blob-storage)',
			'azure-blob-storage',
		)
		.action(
			(options: DeployCommandOptions): Promise<any> => {
				return Promise.resolve()
					.then(() => execute(options))
					.then(() => success('deploy'))
					.catch(err => {
						console.log('error in deploy', err)
						process.exitCode = 1
						fail('deploy')
					})
			},
		)
}
