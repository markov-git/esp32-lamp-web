import { readdir, readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const distFrom = './dist'
const distTo = './dist-gzip'

const extensions = new Set([
	'.js',
	'.css',
	'.svg',
	'.json',
])

async function processDirectory(directory, targetDir) {
	const entries = await readdir(directory, {
		withFileTypes: true,
	})

	for (const entry of entries) {
		const path = join(directory, entry.name)
		const targetPath = join(targetDir, entry.name)

		if (entry.isDirectory()) {
			await mkdir(targetPath);
			await processDirectory(path, targetPath)
			continue
		}

		if (!extensions.has(extname(entry.name))) {
			await copyFile(path, targetPath)
			continue
		}

		const input = await readFile(path)

		const compressed = await new Response(
			new Blob([input]).stream().pipeThrough(
				new CompressionStream('gzip')
			)
		).arrayBuffer()

		await writeFile(
			`${targetPath}.gz`,
			Buffer.from(compressed)
		)

		console.log(
			`${targetPath}: ${input.length} → ${compressed.byteLength} bytes`
		)
	}
}

await processDirectory(distFrom, distTo)